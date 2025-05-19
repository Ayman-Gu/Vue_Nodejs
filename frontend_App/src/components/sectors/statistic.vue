<template>
  <div class="w-full flex flex-col items-center bg-black overflow-hidden">
    <div>
      <h1 class="text-white text-4xl font-bold drop-shadow-lg text-center mb-10 mt-10">
        Statistics
      </h1>
      <p class="text-white text-sm text-center mb-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione corrupti aut
        <br />
        distinctio beatae hic velit, doloremque maiores soluta. Itaque inventore enim nemo molestiae totam facere eos iste dicta maiores nesciunt.
      </p>
    </div>

    <div class="container mx-auto w-full h-[65vh] mb-10 gap-6">
      <!-- First Container (Chart) -->
      <div
        ref="chartContainer"
        class="w-[55%] flex justify-center items-center rounded-lg shadow-lg "
      >
        <Line
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
        />
      </div>

      <!-- Second Container -->
      <div
          ref="numberContainer"
          class="w-[65%] flex flex-col items-center justify-center rounded-lg shadow-lg bg-gradient-to-r from-orange-500 to-grey-900 p-10"
        >
          <div class="flex flex-row items-center justify-center w-full ">
            <!-- Students -->
            <div class="flex flex-col items-center m-10">
              <h2 class="text-white text-6xl font-bold">
                <span ref="studentsNumber">0</span>+
              </h2>
              <p class="text-white text-2xl mt-2">students</p>
            </div>
        
            <!-- Teachers -->
            <div class="flex flex-col items-center m-10">
              <h2 class="text-white text-6xl font-bold">
                <span ref="teachersNumber">0</span>+
              </h2>
              <p class="text-white text-2xl mt-2">teachers</p>
            </div>

            <!-- Teachers -->
            <div class="flex flex-col items-center">
              <h2 class="text-white text-6xl font-bold">
                <span ref="Sectors">0</span>+
              </h2>
              <p class="text-white text-2xl mt-2">Sectors</p>
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// Chart data
const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Statistics',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(255, 165, 0, 0.2)', // Light orange fill
      borderColor: 'orange', 
      borderWidth: 2,
      tension: 0.4, // Smooth curve for the line
    },
  ],
});

// Chart options
const chartOptions = ref({
  responsive: true,
  animation: {
    duration: 2000,
    easing: 'easeInOutQuad',
  },
  plugins: {
    legend: {
      display: false,
      position: 'top',
      labels: {
        color: '#fff', // White legend text
      },
    },
    title: {
      display: true,
      text: 'Monthly Data (Line Chart)',
      color: '#fff', // White title text
      font: {
        size: 12,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)', // Light white grid lines
        lineWidth: 1, // 1px grid width
      },
      ticks: {
        color: '#fff', // White x-axis labels
      },
    },
    y: {
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)', // Light white grid lines
        lineWidth: 1, // 1px grid width
      },
      ticks: {
        color: '#fff', // White y-axis labels
      },
    },
  },
});

// GSAP animations
const chartContainer = ref(null);
const numberContainer = ref(null);
const teachersNumber = ref(null);
const studentsNumber = ref(null);
const Sectors = ref(null);


onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          
          if (entry.target === chartContainer.value) {
            // Animate the chart container
            gsap.from(chartContainer.value, {
              duration: 2.5,
              ease: 'power2.out',
              y: 50,
              opacity: 0,
            });
          }

          if (entry.target === numberContainer.value) {
             gsap.fromTo(
  numberContainer.value,
  { x: 80, autoAlpha: 0 },
  {
    x: 0,
    autoAlpha: 1,
    duration: 1.2,
    ease: 'expo.out',
  }
);
            // Animate the number in the second container
            gsap.to(studentsNumber.value, {
              innerText: 125, // Target value
              duration: 2, // Duration of the animation
              ease: 'power2.out',
              snap: { innerText: 1 }, // Snap to whole numbers
              onUpdate: function () {
                studentsNumber.value.innerText = Math.round(this.targets()[0].innerText); // Ensure the number is rounded
              },
            });
            gsap.to(teachersNumber.value, {
              innerText: 50, // Target value
              duration: 3, // Duration of the animation
              ease: 'power2.out',
              snap: { innerText: 1 }, // Snap to whole numbers
              onUpdate: function () {
                teachersNumber.value.innerText = Math.round(this.targets()[0].innerText); // Ensure the number is rounded
              },
            });

            gsap.to(Sectors.value, {
              innerText: 7, // Target value
              duration: 3, // Duration of the animation
              ease: 'power2.out',
              snap: { innerText: 1 }, // Snap to whole numbers
              onUpdate: function () {
                Sectors.value.innerText = Math.round(this.targets()[0].innerText); // Ensure the number is rounded
              },
            });
          }

          // Disconnect observer for the current target after animation starts
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 } // Trigger when 50% of the section is visible
  );

  // Observe both containers
  if (chartContainer.value) observer.observe(chartContainer.value);
  if (numberContainer.value) observer.observe(numberContainer.value);
});
</script>

<style scoped>
.container {
  display: flex;
  gap: 1rem; 
}


</style>