<template>
<!-- Services Section -->
   <!-- Services -->
    <div class="w-full flex flex-col items-center bg-black  overflow-hidden " ref="cardsSection">
      <h1 class="text-white text-4xl font-bold drop-shadow-lg text-center mb-10 ">
        Our Services
      </h1>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl h-96 mb-10">
      <div
        v-for="(service, index) in services"
        :key="index"
        :ref="setCards"
        class="card relative p-6 rounded-lg shadow-lg overflow-hidden invisible-on-start"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <div class="gradient absolute inset-0 pointer-events-none"></div>
        <h2 class="text-white text-xl font-bold relative z-10">{{ service.title }}</h2>
        <p class="text-white relative z-10">{{ service.description }}</p>
      <iframe
        class="relative"
        :src="`https://www.youtube.com/embed/${getYouTubeVideoId(service.video)}`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    </div>
    </div>
</template>

<script setup>

import { ref, onMounted, nextTick, watch } from 'vue'
import gsap from 'gsap'
const cards = ref([])
const cardsSection = ref(null)

// Services data
const services = [
  { title: 'Service 1', description: 'Description of Service 1', video: 'https://www.youtube.com/watch?v=GE5iWC-lGeU' },
  { title: 'Service 2', description: 'Description of Service 2', video: 'https://www.youtube.com/watch?v=GE5iWC-lGeU' },
  { title: 'Service 3', description: 'Description of Service 3', video: 'https://www.youtube.com/watch?v=GE5iWC-lGeU' },
]

// Helper to extract YouTube ID
const getYouTubeVideoId = (url) => {
  const urlParams = new URL(url).searchParams
  return urlParams.get('v')
}

// Mouse effect handlers
const handleMouseMove = (event) => {
  const card = event.currentTarget
  const gradient = card.querySelector('.gradient')
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  gradient.style.background = `radial-gradient(circle at ${x}px ${y}px, hsla(31, 100%, 50%, 0.988), transparent 50%)`
}
const handleMouseLeave = (event) => {
  const gradient = event.currentTarget.querySelector('.gradient')
  gradient.style.background = 'none'
}

// Ref collection for v-for
const setCards = (el) => {
  // Avoid duplicates
  if (el && !cards.value.includes(el)) cards.value.push(el)
}// Animate on scroll
onMounted(async () => {
  await nextTick()
  cards.value.forEach(card => {
    gsap.set(card, { opacity: 0, y: 50 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out'
          })
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.8 }
    )

    observer.observe(card)
  })
})

</script>


<style scoped>
.card {
  background: linear-gradient(
    to bottom right,
    rgba(105, 104, 104, 0.223),
    rgba(255, 255, 255, 0.138)
  ); /* White gradient background */
  backdrop-filter: blur(10px); /* Apply blur effect */
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.349); /* Optional: Add a subtle border for better visibility */
}

iframe{
  margin-top: 55px;
}



</style>