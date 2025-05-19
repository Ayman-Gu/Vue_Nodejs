<template>
    <section class="container mx-auto pb-6">
        

        <div class="bg-orange-600 relative  shadow-lg rounded-full overflow-hidden border border-gray-300 pb-6">
            <div class="flex flex-col lg:flex-row gap-8 mt-6 px-5 justify-center items-center">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search by Name"
                    class="block w-64 lg:w-80 rounded-full bg-white px-5 py-1.5 text-base text-gray-900 border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    v-model="term"
                    />
            
                <input
                    type="text"
                    name="country"
                    id="country"
                    readonly
                    :value="selectedString"
                    placeholder="Location"
                    @focus="showCard = true"
                    class="block w-64 lg:w-80 rounded-full bg-white px-5 py-1.5 text-base text-gray-900 border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
            
                <button
                    type="button"
                    class="w-32 bg-black text-white px-4 py-2 rounded-full transition-colors duration-300"
                    @click="searchStudentByname"
                    >
                    Search
                </button>
            </div>
        </div>

        <div v-if="showCard" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white shadow-lg rounded-lg border border-gray-300 p-6 w-96">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold">filter By Country</h3>
                    <button
                        class="text-gray-500 hover:text-gray-700"
                        @click="showCard = false"
                    >
                        &times;
                    </button>
                </div>
                <div>
                    <input type="text" name="" id="" placeholder="Search by country" @input="filterCountries($event.target.value)" 
                           class="block w-64 lg:w-80 rounded-full bg-white mt-6 px-5 py-1.5 text-base text-gray-900 border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    >
                </div>

               <div class="h-64 overflow-y-auto border rounded p-5 mt-4">
                    <div
                    v-for="country in filteredCountries"
                    :key="country.cca3"
                    class="flex items-center space-x-2 py-1"
                    >
                    <input
                      type="checkbox"
                      :value="country.name"
                      v-model="selectedCountries"
                      class="form-checkbox text-blue-600"
                    />
                    <label class="text-sm text-gray-700">{{ country.name }}</label>
                    </div>
                </div>

                <div class="px-6 pb-4 flex justify-end gap-4 mt-4">
                    <button
                        class="bg-orange-500 text-white px-4 py-3 rounded-full hover:bg-orange-600 transition" @click="saveSelected"
                        >
                        Save
                    </button>
                    <button
                        class="bg-orange-500 text-white px-4 py-3 rounded-full hover:bg-orange-600 transition" @click="clearSelected"
                    >
                        Clear
                    </button>
                </div>
                
            </div>
        </div>




        <div class="inline-block w-full mb-6 mt-6">
            <span class="text-lg font-semibold leading-tight">List of Students</span>
            <div class="h-[2px] bg-black mt-1"></div>
        </div>

        

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
            <!-- Loop through students and display cards -->
            <div
                v-for="student in students"
                :key="student.id"
                class="relative bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 "
            >
                <!-- Top Section (Black) -->
                <div class="bg-black h-28 text-center justify-center flex items-center">
                    <h3 class="text-2xl font-bold text-white ml-14">{{ student.first_name }} {{ student.last_name }}</h3>
                </div>

                <!-- Profile Image -->
                <div class="absolute -top-0 left-4 py-8">
                    <img
                        :src="`http://localhost:5000/${student.image.replace(/\\\\/g, '/')}` || '/images/profile.png'"
                        alt="Profile"
                        class="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-300"
                    />
                </div>

                <!-- Bottom Section (White) -->
                <div class="pt-7 px-6 pb-6">
                    <p class="text-sm text-gray-600"><strong>Email : </strong>{{ student.email }}</p>
                    <p class="text-sm text-gray-600"><strong>Sector : </strong>{{ student.sector }}</p>
                </div>

                <div class="pt-0 px-4 pb-6  gap-2 flex flex-wrap">
                    <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-700/10 ring-inset">{{ student.country }}</span>
                    <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">{{ student.city }}</span>
                </div>

                <div class="px-6 pb-4 flex justify-end gap-4">
                    <button
                        class="bg-orange-500 text-white px-4 py-3 rounded-full hover:bg-orange-600 transition"
                        @click="deleteStudent(student.id_student)"
                        >
                    <i class="pi pi-trash"></i>
                    </button>
                    <button
                        class="bg-orange-500 text-white px-4 py-3 rounded-full hover:bg-orange-600 transition"
                    >

                        <router-link
                            :to="{ name: 'edit-student', params: { id_student: student.id_student } }"
                            class="text-white"
                        >
                            <i class="pi pi-pencil"></i>
                        </router-link>

                    </button>
                </div>
            </div>
        </div>
    </section>
</template>         

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'primeicons/primeicons.css'

const students = ref([]);
const term = ref('');
const showCard = ref(false);

const countries=ref([]);
const selectedCountries=ref([]);
const selectedString=ref('');

const filteredCountries=ref([]);


const getCountries = async () => {
     try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        countries.value = data
            .map(country => ({
                name: country.name.common,
                cca3: country.cca3
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
            filteredCountries.value= countries.value;
    } catch (error) {
        console.error(error);
    }
};
const filterCountries = (searchTerm) => {
    filteredCountries.value = countries.value.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

const saveSelected = () => {
    selectedString.value = selectedCountries.value.join(' , ');
    showCard.value = false;
};
const clearSelected=()=>{
    selectedCountries.value = [];
    selectedString.value = '';
    showCard.value = false;
}
onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/students/getStudents');
        students.value = response.data;
        // Fetch countries data
        await getCountries();
    } catch (error) {
        console.error(error);
    }
});

const deleteStudent = async (id_student) => {
    try {
        await axios.delete(`http://localhost:5000/api/students/deleteStudent/${id_student}`);
        students.value = students.value.filter(student => student.id_student !== id_student);
    } catch (error) {
        console.error(error);
    }
};

const searchStudentByname = async () => {
    try {
        const searchTerm = term.value.trim();
        const selectedCountriesList = selectedCountries.value;

        // If no search term or countries are selected, fetch all students
        if (searchTerm === '' && selectedCountriesList.length === 0) {
            const response = await axios.get('http://localhost:5000/api/students/getStudents');
            students.value = response.data;
        } else {
            // Build query parameters for the search
            const params = {
                name: searchTerm,
                country: selectedCountriesList.join(',') // Join selected countries into a comma-separated string
            };

            // Send a GET request with query parameters
            const response = await axios.get('http://localhost:5000/api/students/searchStudents', { params });
            students.value = response.data;
        }
    } catch (error) {
        console.error(error);
    }
};
</script>