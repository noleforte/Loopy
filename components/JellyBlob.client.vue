<template>
  <div ref="container" class="jelly-wrapper" :style="wrapperStyle">
    <canvas ref="canvas" class="jelly-canvas"></canvas>
    <div ref="centroid" class="centroid-container">
      <div class="centroid-text">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  pathSrc: {
    type: String,
    default: '/media/v4.svg'
  },
  image: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 400
  },
  height: {
    type: Number,
    default: 400
  },
  color: {
    type: String,
    default: '#5C1523'
  },
  borderColor: {
    type: String,
    default: ''
  },
  borderWidth: {
    type: Number,
    default: 4
  },
  pointsNumber: {
    type: Number,
    default: 18
  },
  maxDistance: {
    type: Number,
    default: 90
  },
  mouseIncidence: {
    type: Number,
    default: 40
  },
  maxIncidence: {
    type: Number,
    default: 50
  },
  shakeLimit: {
    type: Number,
    default: 6
  }
})

const canvas = ref(null)
const container = ref(null)
const centroid = ref(null)

const aspectRatio = props.width > 0 ? props.height / props.width : 1
const effectiveWidth = ref(props.width)
const effectiveHeight = ref(props.height)

const wrapperStyle = computed(() => ({
  width: `${Math.round(effectiveWidth.value)}px`,
  height: `${Math.round(effectiveHeight.value)}px`
}))

let jellyInstance = null
let hiddenSvg = null
let pointerId = null
let startX = 0
let startY = 0
let endX = 0
let endY = 0
let lastX = 0
let lastY = 0
let isPointerDown = false
let cachedPathData = ''
let cachedViewBox = ''

function updateDimensions() {
  if (typeof window === 'undefined') return
  const viewportWidth = window.innerWidth
  const responsiveWidth = Math.min(props.width, Math.max(220, viewportWidth * 0.7))
  effectiveWidth.value = responsiveWidth
  effectiveHeight.value = Math.max(200, responsiveWidth * aspectRatio)
}

function cleanupSvg() {
  if (hiddenSvg && hiddenSvg.parentNode) {
    hiddenSvg.parentNode.removeChild(hiddenSvg)
  }
  hiddenSvg = null
}

onBeforeUnmount(() => {
  cleanupSvg()
  jellyInstance = null
  removeListeners()
})

function removeListeners() {
  if (!container.value) return
  container.value.removeEventListener('pointerdown', handlePointerDown)
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', handlePointerUp)
  window.removeEventListener('pointercancel', handlePointerUp)
  window.removeEventListener('resize', handleResize)
}

function addListeners() {
  if (!container.value) return
  container.value.addEventListener('pointerdown', handlePointerDown)
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp)
  window.addEventListener('pointercancel', handlePointerUp)
  window.addEventListener('resize', handleResize)
}

async function initialize() {
  if (!canvas.value || !container.value) return
  cleanupSvg()
  removeListeners()

  container.value.style.transform = 'translate(0px, 0px)'
  startX = startY = endX = endY = lastX = lastY = 0

  updateDimensions()

  const module = await import('~/assets/js/jelly.js')
  const Jelly = module.default || module

  if (!cachedPathData) {
    try {
      const response = await fetch(props.pathSrc)
      if (!response.ok) {
        console.error(`[JellyBlob] Unable to fetch SVG from ${props.pathSrc}`)
        return
      }

      const svgText = await response.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(svgText, 'image/svg+xml')
      const sourcePath = doc.querySelector('path')
      if (!sourcePath) {
        console.error('[JellyBlob] No <path> element found in SVG source.')
        return
      }

      cachedPathData = sourcePath.getAttribute('d') || ''
      cachedViewBox = doc.documentElement.getAttribute('viewBox') || ''
    } catch (error) {
      console.error('[JellyBlob] Failed to process SVG path.', error)
      return
    }
  }

  const svgNS = 'http://www.w3.org/2000/svg'
  hiddenSvg = document.createElementNS(svgNS, 'svg')
  hiddenSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  hiddenSvg.setAttribute('width', effectiveWidth.value)
  hiddenSvg.setAttribute('height', effectiveHeight.value)
  hiddenSvg.setAttribute('viewBox', cachedViewBox || `0 0 ${props.width} ${props.height}`)
  hiddenSvg.setAttribute('aria-hidden', 'true')
  hiddenSvg.setAttribute('focusable', 'false')
  hiddenSvg.style.position = 'absolute'
  hiddenSvg.style.width = `${effectiveWidth.value}px`
  hiddenSvg.style.height = `${effectiveHeight.value}px`
  hiddenSvg.style.opacity = '0'
  hiddenSvg.style.pointerEvents = 'none'

  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', cachedPathData)
  hiddenSvg.appendChild(path)
  container.value.appendChild(hiddenSvg)

  // Scale and center the path within the canvas
  const bbox = path.getBBox()
  const scale = Math.min(effectiveWidth.value / bbox.width, effectiveHeight.value / bbox.height)
  const translateX = (effectiveWidth.value - bbox.width * scale) / 2
  const translateY = (effectiveHeight.value - bbox.height * scale) / 2
  const transform = `translate(${translateX}, ${translateY}) scale(${scale}) translate(${-bbox.x}, ${-bbox.y})`
  path.setAttribute('transform', transform)

  jellyInstance = new Jelly(canvas.value, {
    paths: [path],
    pathsContainer: hiddenSvg,
    pointsNumber: props.pointsNumber,
    maxDistance: props.maxDistance,
    mouseIncidence: props.mouseIncidence,
    maxIncidence: props.maxIncidence,
    color: props.color,
    centroid: centroid.value,
    border: props.borderColor || undefined,
    borderWidth: props.borderWidth,
    image: props.image || undefined,
    imageCentroid: true
  })

  addListeners()
}

function handlePointerDown(event) {
  if (!jellyInstance || !container.value) return
  const hoverIndex = jellyInstance.getHoverIndex ? jellyInstance.getHoverIndex() : 0
  if (hoverIndex < 0) return

  isPointerDown = true
  pointerId = event.pointerId
  startX = event.clientX
  startY = event.clientY
  lastX = 0
  lastY = 0
  container.value.setPointerCapture(pointerId)
}

function handlePointerMove(event) {
  if (!isPointerDown || !container.value || event.pointerId !== pointerId) return
  const currentX = event.clientX - startX
  const currentY = event.clientY - startY
  container.value.style.transform = `translate(${endX + currentX}px, ${endY + currentY}px)`

  let dx = currentX - lastX
  let dy = currentY - lastY

  if (dx > props.shakeLimit) dx = props.shakeLimit
  if (dx < -props.shakeLimit) dx = -props.shakeLimit
  if (dy > props.shakeLimit) dy = props.shakeLimit
  if (dy < -props.shakeLimit) dy = -props.shakeLimit

  if (jellyInstance && typeof jellyInstance.shake === 'function') {
    jellyInstance.shake({ x: -dx, y: -dy })
  }

  lastX = currentX
  lastY = currentY
}

function handlePointerUp(event) {
  if (!isPointerDown || event.pointerId !== pointerId) return
  if (!container.value) return
  const finalX = event.clientX - startX
  const finalY = event.clientY - startY
  endX += finalX
  endY += finalY
  isPointerDown = false
  container.value.releasePointerCapture(pointerId)
  pointerId = null
}

function handleResize() {
  if (!canvas.value) return
  initialize()
}

onMounted(() => {
  if (typeof window === 'undefined') return
  initialize()
})
</script>

<style scoped>
.jelly-wrapper {
  position: relative;
  display: inline-block;
  touch-action: none;
}

.jelly-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.centroid-container {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centroid-text {
  font-size: clamp(2rem, 8vw, 5rem);
  color: white;
  font-weight: 700;
  text-align: center;
}
</style>
