<template>
    <section class="container mx-auto px-4 py-8">
        <div class="flex flex-wrap">
            <!-- Left Section (40%) -->
            <div class="w-full md:w-2/5">
                <img src="@/assets/images/student.png" alt="" class="w-full h-full object-cover" loading="lazy">
            </div>

            <!-- Right Section (60%) -->
            <div class="w-full md:w-3/6 px-6 mt-6">
                <form @submit.prevent="saveStudent">
                    <div class="border-b border-black-900/10 pb-10">
                        <h2 class="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                        <div class="col-span-full">
                            <label for="image" class="block text-sm font-medium text-gray-900 mb-2">Profile image</label>
                            <div class="mt-2 flex flex-col items-center gap-y-4">
                                <!-- Display the selected image or default profile image -->
                                <div class="w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow-md">
                                    <img :src="profileImage || defaultProfileImage" alt="Profile" class="w-full h-full object-cover">
                                </div>
                                <!-- File input -->
                                <label
                                    for="image"
                                    class="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                                >
                                    Choose Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    @change="onFileChange"
                                    class="hidden"
                                />
                            </div>
                        </div>

                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <label for="first-name" class="block text-sm font-medium text-gray-900">First name</label>
                                <div class="mt-2">
                                    <input type="text" v-model="student.first_name" name="first_name" id="first_name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm" />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="last_name" class="block text-sm font-medium text-gray-900">Last name</label>
                                <div class="mt-2">
                                    <input id="last_name" v-model="student.last_name" name="last_name" autocomplete="last_name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm" />
                                </div>
                            </div>

                            <div class="sm:col-span-full">
                                <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
                                <div class="mt-2">
                                    <input id="email" v-model="student.email" name="email" type="email" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm" />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="country" class="block text-sm font-medium text-gray-900">Country</label>
                                <div class="mt-2 grid grid-cols-1">
                                    <select id="country" v-model="student.country" name="country" autocomplete="country-name" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
                                        <option value="" selected disabled>Your Country...</option>
                                        <option v-for="country in countries" :key="country.cca3" :value="country.name">
                                            {{ country.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="city" class="block text-sm font-medium text-gray-900">City</label>
                                <div class="mt-2">
                                    <input id="city" v-model="student.city" name="city" autocomplete="city" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm" />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="sector" class="block text-sm font-medium text-gray-900">Sector</label>
                                <div class="mt-2">
                                    <select id="sector" v-model="student.sector" name="sector" autocomplete="sector-name" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
                                        <option value="" disabled selected>Your Sector...</option>
                                        <option v-for="sector in sectors" :key="sector.id" :value="sector.name">
                                            {{ sector.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="mt-9 flex items-center justify-end gap-x-6">
                                <button type="submit" class="rounded-md bg-indigo-800 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
                                    {{ route.params.id_student ? 'Edit' : 'Save' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Toast Notification -->
        <transition name="fade">
            <div v-if="toast.visible" class="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-4">
                <span>{{ toast.message }}</span>
                <button @click="closeToast" class="text-white-600 hover:text-white-600">&times;</button>
            </div>
        </transition>              
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import defaultProfileImage from '@/assets/images/profile.png';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const countries = ref([]);
const sectors = ref([
    { id: 1, name: 'IT' },
    { id: 2, name: 'Civil Engineering' },
    { id: 3, name: 'Data Scientist' }
]);

const student = ref({
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    city: '',
    sector: '',
    image: null
});

const profileImage = ref('');
const toast = ref({ visible: false, message: '' });

onMounted(async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        countries.value = data
            .map(country => ({
                name: country.name.common,
                cca3: country.cca3
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error(error);
    }

    const studentId = route.params.id_student; // Get the student ID from the route
    if (studentId) {
        try {
            const response = await axios.get(`http://localhost:5000/api/students/editStudent/${studentId}`);
            const data = response.data;
            student.value = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                country: data.country,
                city: data.city,
                sector: data.sector,
                image: data.image
            };
            profileImage.value = `http://localhost:5000/${data.image.replace(/\\\\/g, '/')}`;
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    }
});

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        student.value.image = file;
        profileImage.value = URL.createObjectURL(file);
    }
};
const saveStudent = async () => {
    const formData = new FormData();
    formData.append('first_name', student.value.first_name);
    formData.append('last_name', student.value.last_name);
    formData.append('email', student.value.email);
    formData.append('country', student.value.country);
    formData.append('city', student.value.city);
    formData.append('sector', student.value.sector);

    // Only append the image if a new one is uploaded
    if (student.value.image instanceof File) {
        formData.append('image', student.value.image);
    } else if (route.params.id_student) {
        // Retain the existing image path for updates
        formData.append('image', student.value.image);
    }

    try {
        if (route.params.id_student) {
            // Update existing student
            await axios.put(`http://localhost:5000/api/students/updateStudent/${route.params.id_student}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showToast('Student updated successfully');
        } else {
            // Add new student
            await axios.post('http://localhost:5000/api/students/addStudent', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showToast('Student added successfully');
        }
        router.push('/');
    } catch (error) {
  showToast('Error: ' + (error.response?.data?.sqlMessage ?? error.message));
        console.error(error);
    }
};  

const showToast = (message) => {
    toast.value = { visible: true, message };
    setTimeout(() => {
        toast.value.visible = false;
    }, 3000); 
};

const closeToast = () => {
    toast.value.visible = false;
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>