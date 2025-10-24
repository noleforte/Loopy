import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    currentSection: 0,
    isAnimating: false,
    sections: ['banner', 'section1', 'section2', 'contact']
  }),

  getters: {
    currentSectionName: (state) => state.sections[state.currentSection],
    isLastSection: (state) => state.currentSection === state.sections.length - 1,
    isFirstSection: (state) => state.currentSection === 0
  },

  actions: {
    setCurrentSection(section) {
      this.currentSection = section
    },

    nextSection() {
      if (this.isAnimating) return
      this.currentSection = (this.currentSection + 1) % this.sections.length
    },

    previousSection() {
      if (this.isAnimating) return
      this.currentSection = this.currentSection === 0 
        ? this.sections.length - 1 
        : this.currentSection - 1
    },

    setAnimating(animating) {
      this.isAnimating = animating
    }
  }
})
