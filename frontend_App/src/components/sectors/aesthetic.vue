<template>
  <div class="w-full flex flex-col items-center bg-black overflow-hidden">
    <div
      class=" w-full h-screen gap-6 flex relative bg-cover "
      :style="`background-image: url('${bgUrl}')`"
    >
      <!-- First Container (Chart) -->
      <div
        ref="chartContainer"
        class="w-[50%] flex justify-center items-center rounded-lg shadow-lg"
      >
        <!-- Chart content goes here if needed -->
      </div>

      <!-- Second Container -->
      <div
          ref="numberContainer"
          class="w-[50%] flex flex-col rounded-lg shadow-lg relative"
        >
          <div class="flex flex-col  justify-center w-full h-full gap-8 relative">
            <h1 class="text-3xl sm:text-6xl font-bold text-white  z-10">
              Hey Everyone Check <br /> <br /> This Link
            </h1><br /> 
            <button
              class=" w-[20%] z-10 px-8 py-3 mt-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300"
            >
              Check it out
            </button>
          </div>
        </div>
    </div>

    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import bg from '@/assets/images/aesthetic.png';
const bgUrl = bg;
</script>