<template>
  <div class="w-full flex flex-col items-center bg-black overflow-hidden">
    <!-- Top Image Container -->
    <div class="w-full h-[40vh] relative" ref="heroImage">
      <img
        :src="HeroImage"
        alt="Hero Image"
        class="w-full h-full object-cover object-top" 
      />
      <div class="absolute inset-0 flex justify-center items-center mt-20">
        <h1 class="text-white text-6xl font-bold drop-shadow-lg">
          Welcome To The E-school App
        </h1>
      </div>
    </div>

    <!-- Bottom Image from Left -->
    <div class="w-[80%] -mb-[1px]" ref="leftImage">
      <img
        :src="UniversityImage"
        alt="University Image"
        class="w-full h-full object-cover"
      />
    </div>
  </div>

  <!-- Second Image from Right -->
  <div class="w-full flex flex-col items-center bg-black overflow-hidden">
    <div class="w-[80%] " ref="rightImage">
      <img
        :src="UniversityImage2"
        alt="University Image"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
  
  

</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import gsap from 'gsap'

import HeroImage from '@/assets/images/glowing.png'
import UniversityImage from '@/assets/images/university.png'
import UniversityImage2 from '@/assets/images/university2.png'

// Refs
const heroImage = ref(null)
const leftImage = ref(null)
const rightImage = ref(null)




// Animate on scroll
onMounted(async () => {
  // Set initial styles for animation
  if (heroImage.value) gsap.set(heroImage.value, { opacity: 0, y: -50 })
  if (leftImage.value) gsap.set(leftImage.value, { opacity: 0, x: -200 })
  if (rightImage.value) gsap.set(rightImage.value, { opacity: 0, x: 200 })

  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === heroImage.value) {
            gsap.to(entry.target, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' })
          } else if (entry.target === leftImage.value) {
            gsap.to(entry.target, { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' })
          } else if (entry.target === rightImage.value) {
            gsap.to(entry.target, { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' })
           
        }
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  if (heroImage.value) observer.observe(heroImage.value)
  if (leftImage.value) observer.observe(leftImage.value)
  if (rightImage.value) observer.observe(rightImage.value)

})

</script>


<style scoped>
.invisible-on-start {
  opacity: 0;
  transform: translateY(20px);
}

</style>