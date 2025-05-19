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
  <!-- Services Section -->
   <!-- Services -->
    <div class="w-full flex flex-col items-center  overflow-hidden mt-10 mb-10" ref="cardsSection">
      <h1 class="text-gray-900 text-4xl font-bold drop-shadow-lg text-center mb-10">
        Our Services
      </h1>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl h-96 mb-10">
      <div
        v-for="(service, index) in services"
        :key="index"
        ref="cards"
        class="card relative p-6 rounded-lg shadow-lg overflow-hidden"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <div class="gradient absolute inset-0 pointer-events-none"></div>
        <h2 class="text-gray text-xl font-bold relative z-10">{{ service.title }}</h2>
        <p class="text-gray relative z-10">{{ service.description }}</p>
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
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

import HeroImage from '@/assets/images/glowing.png'
import UniversityImage from '@/assets/images/university.png'
import UniversityImage2 from '@/assets/images/university2.png'

const heroImage = ref(null)
const leftImage = ref(null)
const rightImage = ref(null)
const cards = ref([])
const cardsSection = ref(null)

const services = [
  { title: 'Service 1', description: 'Description of Service 1',video:'https://www.youtube.com/watch?v=GE5iWC-lGeU'},
  { title: 'Service 2', description: 'Description of Service 2',video:'https://www.youtube.com/watch?v=GE5iWC-lGeU' },
  { title: 'Service 3', description: 'Description of Service 3',video:'https://www.youtube.com/watch?v=GE5iWC-lGeU' },
  
];
const getYouTubeVideoId = (url) => {
  const urlParams = new URL(url).searchParams;
  return urlParams.get('v');
};
const handleMouseMove = (event) => {
  const card = event.currentTarget;
  const gradient = card.querySelector('.gradient');
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  gradient.style.background = `radial-gradient(circle at ${x}px ${y}px, hsla(31, 100%, 50%, 0.988), transparent 50%)`;
};

const handleMouseLeave = (event) => {
  const gradient = event.currentTarget.querySelector('.gradient');
  gradient.style.background = 'none';
};

onMounted(() => {
  // Set initial state for cards (hidden)
  cards.value.forEach(card => {
    gsap.set(card, { opacity: 0, y: -50 });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate section images
          if (entry.target === leftImage.value) {
            gsap.fromTo(leftImage.value, { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 2, ease: 'power2.out' });
          }
          if (entry.target === rightImage.value) {
            gsap.fromTo(rightImage.value, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 2, delay: 0.3, ease: 'power2.out' });
          }
          if (entry.target === heroImage.value) {
            gsap.fromTo(heroImage.value, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 2, ease: 'power3.out' });
          }
          // Animate cards
          cards.value.forEach((card, i) => {
            if (entry.target === card) {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 2,
                delay: 0.2 * i,
                ease: 'power3.out',
              });
              observer.unobserve(card);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  // Observe images
  if (leftImage.value) observer.observe(leftImage.value);
  if (rightImage.value) observer.observe(rightImage.value);
  if (heroImage.value) observer.observe(heroImage.value);
  // Observe each card
  cards.value.forEach(card => observer.observe(card));
});

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