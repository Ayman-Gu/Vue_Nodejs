<template>
  <header class="bg-white shadow-lg py-4 sticky top-0 z-50">
    <div class="container mx-auto flex items-center justify-between px-4">
      <!-- Logo -->
      <a href="/" class="flex items-center text-primary hover:text-secondary">
        <svg class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707.707m12.728 0l.707.707M6.343 17.657l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span class="text-2xl font-bold">E-SCHOOL</span>
      </a>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button @click="toggleMenu"
          class="text-gray-800 hover:text-primary focus:outline-none transition-colors duration-300">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:block">
        <ul class="flex space-x-8">
          <li><a href="/" class="hover:text-primary transition-colors duration-300">Home</a></li>
          <li><a href="/sectors" class="hover:text-primary transition-colors duration-300">Sectors</a></li>
          
          <li><a href="/contactus" class="hover:text-primary transition-colors duration-300">Contact Us</a></li>
          <li>
            <a href="/add-student"
              class="bg-black text-white px-4 py-2 rounded-md transition-colors duration-300">
                Add student
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <nav v-if="isMenuOpen" class="md:hidden bg-gray-50 border-t border-gray-200">
      <ul class="px-4 py-2">
        <li><a href="/" class="block py-2 hover:text-primary">Home</a></li>
        <li><a href="/sectors" class="block py-2 hover:text-primary">Sectors</a></li>
        <li><a href="/contactus" class="block py-2 hover:text-primary">Contact Us</a></li>
        <li>
          <a href="#"
            class="block py-2 bg-black hover:bg-secondary text-white rounded-md text-center transition-colors duration-300">
            Add student
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    isDropdownOpen.value = false
  }
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>
