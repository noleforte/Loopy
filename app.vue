<template>
  <div>
    <!-- SVG Filters (можешь оставить для других эффектов; jelly их не использует) -->
    <svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
      <defs>
        <filter id="jellyDistortion" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence baseFrequency="0.03" numOctaves="4" result="noise" type="fractalNoise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" result="displacement"/>
          <feGaussianBlur in="displacement" stdDeviation="2" result="blur"/>
          <feColorMatrix type="saturate" values="1.2" in="blur" result="saturated"/>
          <feComposite in="saturated" in2="SourceGraphic" operator="over"/>
        </filter>
        
        <filter id="jellyHover" x="-100%" y="-100%" width="300%" height="300%">
          <feTurbulence baseFrequency="0.05" numOctaves="3" result="noise" type="fractalNoise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" result="displacement"/>
          <feGaussianBlur in="displacement" stdDeviation="3" result="blur"/>
          <feColorMatrix type="saturate" values="1.5" in="blur" result="saturated"/>
          <feComposite in="saturated" in2="SourceGraphic" operator="over"/>
        </filter>
      </defs>
    </svg>

    <!-- Progress Indicator -->
    <div id="progress-indicator">
      <div class="progress-dot active" data-section="0"></div>
      <div class="progress-dot" data-section="1"></div>
      <div class="progress-dot" data-section="2"></div>
      <div class="progress-dot" data-section="3"></div>
    </div>

    <!-- Main Container for GSAP Animations -->
    <div id="main-container">
      <!-- Banner Section -->
      <section id="banner" class="banner">
        <div class="banner-content">
          <!-- скрытый SVG-хост для jelly path -->
          <svg id="jelly-svg-host" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
            <path id="banner-shape-path" />
          </svg>

          <!-- контейнер баннера -->
          <div class="banner-bg-outer" style="background-image: url('/media/v4.svg');">
            <!-- холст под желейную фигуру -->
            <canvas class="banner-jelly" aria-hidden="true"></canvas>

            <!-- внутренняя картинка поверх -->
            <img src="/media/pic_1_bg_inner.png" alt="Background" class="banner-bg-inner" />
          </div>
        </div>
      </section>

      <!-- Section 1 - About Us -->
      <section id="section1" class="horizontal-section section-1">
        <div class="section-content">
          <h2 class="section-heading animate-title">About Us</h2>
          <p class="section-description animate-text">We create innovative digital experiences that push the boundaries of what's possible in web design and user interaction.</p>
          <div class="features">
            <div class="feature animate-card" data-delay="0.1">
              <h3 class="feature-title">Innovation</h3>
              <p class="feature-text">Cutting-edge solutions for modern problems</p>
            </div>
            <div class="feature animate-card" data-delay="0.2">
              <h3 class="feature-title">Design</h3>
              <p class="feature-text">Beautiful, functional, and user-centered design</p>
            </div>
            <div class="feature animate-card" data-delay="0.3">
              <h3 class="feature-title">Technology</h3>
              <p class="feature-text">Latest technologies and best practices</p>
            </div>
          </div>
          <button class="nav-button animate-button" @click="nextSection">Continue</button>
        </div>
      </section>

      <!-- Section 2 - Services -->
      <section id="section2" class="horizontal-section section-2">
        <div class="section-content">
          <h2 class="section-heading animate-title">Our Services</h2>
          <p class="section-description animate-text">Comprehensive digital solutions tailored to your needs</p>
          <div class="services">
            <div class="service animate-card" data-delay="0.1">
              <h3 class="service-title">Web Development</h3>
              <p class="service-text">Custom websites and web applications built with modern technologies</p>
            </div>
            <div class="service animate-card" data-delay="0.2">
              <h3 class="service-title">UI/UX Design</h3>
              <p class="service-text">User-centered design that creates exceptional experiences</p>
            </div>
            <div class="service animate-card" data-delay="0.3">
              <h3 class="service-title">Consulting</h3>
              <p class="service-text">Strategic guidance for your digital transformation journey</p>
            </div>
          </div>
          <button class="nav-button animate-button" @click="nextSection">Continue</button>
        </div>
      </section>

      <!-- Final Section - Contact -->
      <section id="contact" class="final-section">
        <div class="section-content">
          <h2 class="section-heading animate-title">Contact Us</h2>
          <p class="section-description animate-text">Ready to start your next project? Let's talk about how we can help you achieve your goals.</p>
          <div class="contact-info">
            <div class="contact-item animate-card" data-delay="0.1">
              <h3 class="contact-title">Email</h3>
              <p class="contact-text">hello@loopy.com</p>
            </div>
            <div class="contact-item animate-card" data-delay="0.2">
              <h3 class="contact-title">Phone</h3>
              <p class="contact-text">+1 (555) 123-4567</p>
            </div>
            <div class="contact-item animate-card" data-delay="0.3">
              <h3 class="contact-title">Address</h3>
              <p class="contact-text">123 Innovation Street, Tech City, TC 12345</p>
            </div>
          </div>
          <button class="nav-button animate-button" @click="nextSection">Back to Start</button>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 Loopy. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useHead } from 'nuxt/app'

// Image paths - use absolute paths for better compatibility
const pic1 = '/media/pic_1.png'
const pic2 = '/media/pic_2.png'
const pic3 = '/media/pic_3.png'
const pic4 = '/media/pic_4.png'

// Global head configuration
useHead({
  title: 'Loopy - Experience the future of web design',
  meta: [
    { name: 'description', content: 'Experience the future of web design with Loopy' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ],
  link: [{ rel: 'icon', type: 'image/png', href: '/media/favicon.png' }]
})

// =================== GSAP SQUARE NAV (твои функции без изменений) ===================
let currentSection = 0
const sections = ['banner', 'section1', 'section2', 'contact'] as const
const directions = [
  { x: 100, y: 0 }, { x: 0, y: 100 }, { x: -100, y: 0 }, { x: 0, y: -100 }
]
let isAnimating = false

const unitValue = (value: number, unit: 'vw' | 'vh') => (value === 0 ? 0 : `${value}${unit}`)

function positionSections(centerIndex: number) {
  if (typeof gsap === 'undefined') return
  let offsetX = 0, offsetY = 0
  const currentId = sections[centerIndex]
  const currentElement = document.getElementById(currentId)
  if (currentElement) gsap.set(`#${currentId}`, { x: 0, y: 0 })
  for (let step = 1; step < sections.length; step++) {
    const directionIndex = (centerIndex + step - 1 + directions.length) % directions.length
    offsetX += directions[directionIndex].x
    offsetY += directions[directionIndex].y
    const targetId = sections[(centerIndex + step) % sections.length]
    const targetElement = document.getElementById(targetId)
    if (targetElement) gsap.set(`#${targetId}`, { x: unitValue(offsetX, 'vw'), y: unitValue(offsetY, 'vh') })
  }
}

function nextSection() {
  if (isAnimating) return; isAnimating = true
  const nextIndex = (currentSection + 1) % sections.length
  const direction = directions[currentSection]
  const currentSelector = `#${sections[currentSection]}`
  const nextSelector = `#${sections[nextIndex]}`
  const animation = gsap.timeline({
    onComplete: () => { currentSection = nextIndex; positionSections(currentSection); isAnimating = false; updateProgressIndicator(); setTimeout(() => animateCurrentSection(), 100) }
  })
  if (direction.x !== 0) {
    animation.to(currentSelector, { x: unitValue(-Math.sign(direction.x) * 100, 'vw'), duration: 1, ease: 'power2.inOut' })
             .to(nextSelector,    { x: 0, duration: 1, ease: 'power2.inOut' }, 0)
  } else {
    animation.to(currentSelector, { y: unitValue(-Math.sign(direction.y) * 100, 'vh'), duration: 1, ease: 'power2.inOut' })
             .to(nextSelector,    { y: 0, duration: 1, ease: 'power2.inOut' }, 0)
  }
}

function previousSection() {
  if (isAnimating) return; isAnimating = true
  const previousIndex = (currentSection - 1 + sections.length) % sections.length
  const direction = directions[previousIndex]
  const deltaX = -direction.x, deltaY = -direction.y
  const currentSelector = `#${sections[currentSection]}`
  const previousSelector = `#${sections[previousIndex]}`
  const animation = gsap.timeline({
    onComplete: () => { currentSection = previousIndex; positionSections(currentSection); isAnimating = false; updateProgressIndicator(); setTimeout(() => animateCurrentSection(), 100) }
  })
  if (deltaX !== 0) {
    animation.to(currentSelector, { x: unitValue(-Math.sign(deltaX) * 100, 'vw'), duration: 1, ease: 'power2.inOut' })
             .to(previousSelector, { x: 0, duration: 1, ease: 'power2.inOut' }, 0)
  } else {
    animation.to(currentSelector, { y: unitValue(-Math.sign(deltaY) * 100, 'vh'), duration: 1, ease: 'power2.inOut' })
             .to(previousSelector, { y: 0, duration: 1, ease: 'power2.inOut' }, 0)
  }
}

function updateProgressIndicator() {
  document.querySelectorAll('.progress-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSection)
  })
}

function initializeAnimations() { animateBanner(); setupSectionAnimations() }

function animateBanner() {
  if (typeof gsap === 'undefined') return
  const tl = gsap.timeline()
  tl.to('.letter-3d', { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.1 })
    .to('.banner-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
    .to('.cta-button', { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.6')
}

function setupSectionAnimations() { animateCurrentSection() }

function animateCurrentSection() {
  const currentSectionId = sections[currentSection]
  const section = document.getElementById(currentSectionId)
  if (!section) return
  const tl = gsap.timeline()
  tl.to(section.querySelector('.animate-title'), { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
  const textElements = section.querySelectorAll('.animate-text')
  if (textElements.length) tl.to(textElements, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
  const cards = section.querySelectorAll('.animate-card')
  if (cards.length) tl.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)', stagger: 0.2 }, '-=0.4')
  const button = section.querySelector('.animate-button')
  if (button) tl.to(button, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.2')
}

function resetSectionAnimations() {
  gsap.set('.animate-title, .animate-text, .animate-button, .animate-card, .section-description', { opacity: 0, y: 50, scale: 0.95 })
  gsap.set('.letter-3d', { opacity: 0, y: 50, rotateX: 90, scale: 0.5 })
}

function setupLetterAnimation() {
  const title = document.getElementById('banner-title'); if (!title) return
  const text = title.textContent ?? ''; title.innerHTML = ''
  text.split('').forEach((char, index) => {
    const span = document.createElement('span')
    const displayChar = char === ' ' ? '\u00A0' : char
    span.textContent = displayChar
    span.className = 'letter-3d'
    span.setAttribute('data-letter', displayChar)
    span.style.animationDelay = `${index * 0.1}s`
    span.addEventListener('mouseenter', function(){ (this as HTMLElement).style.zIndex = '10' })
    span.addEventListener('mouseleave', function(){ (this as HTMLElement).style.zIndex = '1' })
    title.appendChild(span)
  })
}

// Events
let scrollTimeout: ReturnType<typeof setTimeout>
let isScrolling = false

function handleWheel(e: WheelEvent) {
  e.preventDefault()
  if (isScrolling || isAnimating) return
  isScrolling = true
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => { isScrolling = false }, 800)
  if (e.deltaY > 0) nextSection(); else if (e.deltaY < 0) previousSection()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); if (!isAnimating) nextSection() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); if (!isAnimating) previousSection() }
}

function handleProgressDotClick(index: number) {
  if (index === currentSection || isAnimating) return
  const steps = Math.abs(index - currentSection)
  for (let i = 0; i < steps; i++) setTimeout(() => { if (!isAnimating) (index > currentSection ? nextSection() : previousSection()) }, i * 200)
}

// Mount (GSAP init)
onMounted(() => {
  const root = document.documentElement
  root.style.setProperty('--pic-1', `url(${pic1})`)
  root.style.setProperty('--pic-2', `url(${pic2})`)
  root.style.setProperty('--pic-3', `url(${pic3})`)
  root.style.setProperty('--pic-4', `url(${pic4})`)

  const initApp = () => {
    if (typeof gsap === 'undefined') { setTimeout(initApp, 100); return }
    positionSections(currentSection)
    updateProgressIndicator()
    initializeAnimations()
    setupLetterAnimation()
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('keydown', handleKeydown)
    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
      dot.addEventListener('click', () => handleProgressDotClick(index))
    })
  }
  const showContent = () => { const mc = document.getElementById('main-container'); if (mc) mc.style.opacity = '1' }
  initApp()
  setTimeout(showContent, 2000)
})

onUnmounted(() => {
  document.removeEventListener('wheel', handleWheel)
  document.removeEventListener('keydown', handleKeydown)
})

// ==================== Jelly.js FOLLOW + SHAKE (типобезопасно) ====================
type JellyInstance = { shake: (opts: { x: number; y: number }) => void }
type PointerEvt = MouseEvent | TouchEvent

onMounted(async () => {
  if (typeof window === 'undefined') return

  const outer = document.querySelector<HTMLDivElement>('.banner-bg-outer')
  const canvas = document.querySelector<HTMLCanvasElement>('.banner-jelly')
  const hostPath = document.querySelector<SVGPathElement>('#banner-shape-path')
  const hostSvg  = document.querySelector<SVGSVGElement>('#jelly-svg-host')
  if (!outer || !canvas || !hostPath || !hostSvg) return

  // 1) подгоняем canvas под контейнер + DPR
  const resize = () => {
    const r = outer.getBoundingClientRect()
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
    canvas.width  = Math.max(1, Math.floor(r.width  * dpr))
    canvas.height = Math.max(1, Math.floor(r.height * dpr))
    canvas.style.width  = `${r.width}px`
    canvas.style.height = `${r.height}px`
    // одновременно обновим viewBox скрытого SVG под канвас
    hostSvg.setAttribute('viewBox', `0 0 ${canvas.width} ${canvas.height}`)
    hostSvg.setAttribute('width',  String(canvas.width))
    hostSvg.setAttribute('height', String(canvas.height))
  }
  resize()
  window.addEventListener('resize', resize)

  // 2) грузим SVG и вставляем d первого path
  try {
    const res = await fetch('/media/v4.svg')
    const svgText = await res.text()
    const m = svgText.match(/<path[^>]*d="([^"]+)"/i)
    if (!m) return
    hostPath.setAttribute('d', m[1])
  } catch (e) {
    console.warn('Не удалось загрузить /media/v4.svg', e)
    return
  }

  // 4) инициализируем jelly
// === 3) НОРМАЛИЗАЦИЯ пути + инициализация jelly ===

// Получаем bbox после вставки d
// Получаем bbox после вставки d
const bbox = hostPath.getBBox()

// Подгоняем под canvas с отступом
const pad = 0.06
const cw = canvas.width
const ch = canvas.height
const sx = (1 - pad*2) * cw / (bbox.width  || 1)
const sy = (1 - pad*2) * ch / (bbox.height || 1)
const s  = Math.min(sx, sy)
const tx = ((cw - bbox.width  * s) / 2) - bbox.x * s
const ty = ((ch - bbox.height * s) / 2) - bbox.y * s
hostPath.setAttribute('transform', `translate(${tx} ${ty}) scale(${s})`)

// — инициализируем Jelly —
const JellyCtor = (window as unknown as { Jelly?: new (c: HTMLCanvasElement, o: any) => any }).Jelly
if (!JellyCtor) {
  console.warn('Jelly.js не найден.')
  return
}

const options = {
  paths: '#banner-shape-path',
  pointsNumber: 18,
  maxDistance: 90,
  color: '#5C1523',
  debug: true  // 👈 ДОЛЖНЫ быть синие точки
}

const jelly = new JellyCtor(canvas, options)


  // 5) follow + shake, БЕЗ перетирания базового transform (исп. translate)
  let targetX = 0, targetY = 0, curX = 0, curY = 0
  let lastMx = 0, lastMy = 0, hadPointer = false
  const magnet = 12, ease = 0.12, shakeLimit = 6
  const reduce = matchMedia('(prefers-reduced-motion: reduce)')
  const isCoarse = matchMedia('(pointer: coarse)')

  const onMove = (e: PointerEvt) => {
    const r = outer.getBoundingClientRect()
    let clientX = 0, clientY = 0
    if (e instanceof MouseEvent) { clientX = e.clientX; clientY = e.clientY }
    else { const t = e.touches[0] || e.changedTouches[0]; if (!t) return; clientX = t.clientX; clientY = t.clientY }

    const mx = clientX - r.left, my = clientY - r.top
    const nx = mx / r.width - 0.5, ny = my / r.height - 0.5
    targetX = nx * magnet; targetY = ny * magnet

    if (hadPointer) {
      let dx = mx - lastMx, dy = my - lastMy
      dx = Math.max(Math.min(dx, shakeLimit), -shakeLimit)
      dy = Math.max(Math.min(dy, shakeLimit), -shakeLimit)
      if (!reduce.matches && !isCoarse.matches) jelly.shake({ x: -dx, y: -dy })
    } else { hadPointer = true }

    lastMx = mx; lastMy = my
  }

  const onLeave = () => { targetX = 0; targetY = 0; hadPointer = false }

  outer.addEventListener('mousemove', onMove)
  outer.addEventListener('mouseleave', onLeave)
  outer.addEventListener('touchmove', onMove, { passive: true })
  outer.addEventListener('touchend', onLeave)
  outer.addEventListener('touchcancel', onLeave)

  let raf = 0
  const tick = () => {
    curX += (targetX - curX) * ease
    curY += (targetY - curY) * ease
    // НЕ перетираем centering transform: используем compose-свойство translate
    ;(outer.style as any).translate = reduce.matches ? '' : `${curX}px ${curY}px`
    raf = requestAnimationFrame(tick)
  }
  tick()

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    outer.removeEventListener('mousemove', onMove)
    outer.removeEventListener('mouseleave', onLeave)
    outer.removeEventListener('touchmove', onMove)
    outer.removeEventListener('touchend', onLeave)
    outer.removeEventListener('touchcancel', onLeave)
    window.removeEventListener('resize', resize)
    ;(outer.style as any).translate = ''
  })
})
// ==================== /Jelly.js ====================
</script>

<style>
/* Ensure content is visible */
#main-container { opacity: 1 !important; }

/* Banner base */
.banner {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: relative;
  overflow: hidden;
}
.banner-content {
  text-align: center !important;
  position: relative;
  z-index: 10;
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
}
.banner-bg-outer {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 100%; height: 100%;
  background-size: contain; background-repeat: no-repeat; background-position: center;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; transition: all .3s cubic-bezier(.4,0,.2,1);
  cursor: pointer;
}
.banner-bg-outer { position: relative; overflow: hidden; }
.banner-jelly { position: absolute; inset: 0; width: 100%; height: 100%; display:block; z-index:0; }
.banner-bg-inner { position: relative; z-index:1; pointer-events:none; max-width:60%; max-height:60%; object-fit:contain; }

/* Letters */
.letter-3d { opacity: 0; transform: translateY(50px) rotateX(-90deg) scale(.5); transition: all .3s cubic-bezier(.4,0,.2,1); cursor: pointer; display:inline-block; margin:0 2px; }
.letter-3d:hover { transform: scale(1.8) rotate(5deg) skew(10deg,-5deg) perspective(300px) rotateY(15deg) !important; z-index:15; text-shadow: 0 0 30px rgba(255,107,107,.8), 0 0 60px rgba(255,107,107,.6), 0 0 90px rgba(255,107,107,.4); filter: drop-shadow(0 0 20px rgba(255,107,107,.8)); -webkit-text-stroke: 4px #ff6b6b; text-stroke: 4px #ff6b6b; }

/* (остальные твои стили, без изменений) */
.interactive-elements { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1; }
.bouncing-circle { position:absolute; border-radius:50%; background: linear-gradient(45deg,#ff6b6b,#ff8e8e); animation: bounce 3s ease-in-out infinite; cursor:pointer; pointer-events:all; transition: all .4s cubic-bezier(.4,0,.2,1); overflow:hidden; z-index:5; }
.bouncing-circle:hover { transform: scale(2.5) skew(15deg,-10deg) rotate(25deg); z-index:20; box-shadow:0 20px 60px rgba(255,107,107,.6); animation-play-state: paused; filter:hue-rotate(30deg) brightness(1.2); }
.bouncing-circle::before { content:''; position:absolute; top:50%; left:50%; width:0; height:0; background: radial-gradient(circle, rgba(255,255,255,.3) 0%, transparent 70%); border-radius:50%; transform: translate(-50%,-50%); transition: all .4s ease; }
.bouncing-circle:hover::before { width:200%; height:200%; }
.circle-1 { width:80px; height:80px; top:20%; left:10%; animation-delay:0s; }
.circle-2 { width:60px; height:60px; top:60%; right:15%; background: linear-gradient(45deg,#4ecdc4,#44a08d); animation-delay:1s; }
.circle-3 { width:100px; height:100px; top:30%; right:20%; background: linear-gradient(45deg,#feca57,#ff9ff3); animation-delay:2s; }

.floating-square { position:absolute; background: linear-gradient(45deg,#a8e6cf,#88d8c0); animation: float 4s ease-in-out infinite; cursor:pointer; pointer-events:all; transition: all .4s cubic-bezier(.4,0,.2,1); overflow:hidden; z-index:5; }
.floating-square:hover { transform: scale(2.2) rotate(45deg) skew(-20deg,15deg) perspective(500px) rotateX(15deg); z-index:20; box-shadow:0 15px 50px rgba(168,230,207,.6); animation-play-state: paused; filter: saturate(1.5) contrast(1.2); clip-path: polygon(20% 0%,80% 0%,100% 20%,100% 80%,80% 100%,20% 100%,0% 80%,0% 20%); }
.floating-square::before { content:''; position:absolute; top:50%; left:50%; width:0; height:0; background: radial-gradient(circle, rgba(255,255,255,.4) 0%, transparent 70%); border-radius:50%; transform: translate(-50%,-50%); transition: all .4s ease; }
.floating-square:hover::before { width:300%; height:300%; }
.square-1 { width:50px; height:50px; top:15%; right:30%; animation-delay:.5s; }
.square-2 { width:70px; height:70px; bottom:25%; left:20%; background: linear-gradient(45deg,#ffd93d,#ff6b6b); animation-delay:1.5s; }

.ponpon-buttons { display:flex; gap:20px; justify-content:center; margin-top:2rem; flex-wrap:wrap; }
.ponpon-btn { position:relative; padding:15px 30px; border:none; border-radius:50px; font-size:1.1rem; font-weight:600; cursor:pointer; overflow:hidden; transition: all .3s cubic-bezier(.4,0,.2,1); transform-style: preserve-3d; }
.ponpon-btn:hover { transform: translateY(-5px) scale(1.3) skew(-5deg,2deg) perspective(400px) rotateX(10deg); z-index:15; filter: brightness(1.1) saturate(1.3); }
.ponpon-btn:active { transform: translateY(-2px) scale(1.1); }
.ponpon-btn::after { content:''; position:absolute; top:50%; left:50%; width:0; height:0; background: radial-gradient(circle, rgba(255,255,255,.2) 0%, transparent 70%); border-radius:50%; transform: translate(-50%,-50%); transition: all .4s ease; z-index:0; }
.ponpon-btn:hover::after { width:200%; height:200%; }
.btn-text { position:relative; z-index:2; color:#fff; transition: all .3s ease; }
.btn-bg { position:absolute; inset:0; border-radius:50px; transition: all .3s ease; z-index:1; }
.btn-primary .btn-bg { background: linear-gradient(45deg,#667eea,#764ba2); }
.btn-primary:hover .btn-bg { background: linear-gradient(45deg,#764ba2,#667eea); transform: scale(1.1); }
.btn-secondary .btn-bg { background: linear-gradient(45deg,#f093fb,#f5576c); }
.btn-secondary:hover .btn-bg { background: linear-gradient(45deg,#f5576c,#f093fb); transform: scale(1.1); }

/* Animations */
@keyframes bounce { 0%,100%{transform:translateY(0) rotate(0)} 25%{transform:translateY(-20px) rotate(90deg)} 50%{transform:translateY(0) rotate(180deg)} 75%{transform:translateY(-10px) rotate(270deg)} }
@keyframes float { 0%,100%{transform:translateY(0) rotate(0)} 33%{transform:translateY(-15px) rotate(120deg)} 66%{transform:translateY(5px) rotate(240deg)} }

/* Extra shapes (как у тебя) */
.deformed-triangle{position:absolute;width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-bottom:50px solid #ff9ff3;cursor:pointer;pointer-events:all;transition:all .4s cubic-bezier(.4,0,.2,1);z-index:5;animation:triangleFloat 3s ease-in-out infinite;}
.deformed-triangle:hover{transform:scale(2.5) skew(30deg,-20deg) rotate(45deg) perspective(600px) rotateX(30deg) rotateY(20deg);z-index:20;filter:hue-rotate(180deg) brightness(1.3) saturate(2);clip-path:polygon(50% 0%,0% 100%,100% 100%);border-bottom-color:#ff6b6b;}
.triangle-1{top:40%;left:5%;animation-delay:.5s;}

.deformed-hexagon{position:absolute;width:60px;height:60px;background:linear-gradient(45deg,#4ecdc4,#44a08d);clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);cursor:pointer;pointer-events:all;transition:all .4s cubic-bezier(.4,0,.2,1);z-index:5;animation:hexagonSpin 4s linear infinite;}
.deformed-hexagon:hover{transform:scale(2.8) skew(-25deg,15deg) rotate(180deg) perspective(500px) rotateX(45deg) rotateZ(90deg);z-index:20;filter:invert(1) hue-rotate(90deg) contrast(1.5);clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%);}
.hexagon-1{top:70%;right:10%;animation-delay:1s;}

.deformed-wave{position:absolute;width:80px;height:40px;background:linear-gradient(45deg,#feca57,#ff9ff3);border-radius:50px;cursor:pointer;pointer-events:all;transition:all .4s cubic-bezier(.4,0,.2,1);z-index:5;animation:waveBounce 2.5s ease-in-out infinite;}
.deformed-wave:hover{transform:scale(2.2) skew(45deg,-30deg) rotate(90deg) perspective(400px) rotateX(60deg);z-index:20;filter:sepia(1) hue-rotate(200deg) saturate(2);clip-path:ellipse(50% 30% at 50% 50%);border-radius:20px;}
.wave-1{top:10%;right:40%;animation-delay:1.5s;}

.deformed-blob{position:absolute;width:70px;height:70px;background:linear-gradient(45deg,#ff6b6b,#4ecdc4,#45b7d1);border-radius:50% 30% 50% 30%;cursor:pointer;pointer-events:all;transition:all .4s cubic-bezier(.4,0,.2,1);z-index:5;animation:blobMorph 3s ease-in-out infinite;}
.deformed-blob:hover{transform:scale(2.6) skew(20deg,-15deg) rotate(120deg) perspective(700px) rotateX(25deg) rotateY(35deg);z-index:20;filter:hue-rotate(120deg) brightness(1.4) contrast(1.3);border-radius:30% 70% 70% 30% / 30% 30% 70% 70%;clip-path:polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%);}
.blob-1{bottom:20%;left:30%;animation-delay:2s;}

@keyframes triangleFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-15px) rotate(180deg)}}
@keyframes hexagonSpin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes waveBounce{0%,100%{transform:translateY(0) scaleX(1)}50%{transform:translateY(-20px) scaleX(1.2)}}
@keyframes blobMorph{0%,100%{border-radius:50% 30% 50% 30%}25%{border-radius:30% 50% 30% 50%}50%{border-radius:50% 50% 30% 30%}75%{border-radius:30% 30% 50% 50%}}

@media (max-width: 768px) {
  .bouncing-circle, .floating-square { display: none; }
  .ponpon-buttons { flex-direction: column; align-items: center; }
  .ponpon-btn { width: 200px; }
}
</style>
