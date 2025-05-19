import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AddStudent from '../views/addStudentView.vue';
import ContactView from '@/views/contactView.vue';
import sectorsView from '@/views/sectorsView.vue';
import SectorsView from '@/views/sectorsView.vue';

const router=createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes :[
        {path:'/', name:'home', component:HomeView},
        {path:'/add-student', name:'add-student', component:AddStudent},
        {path:'/edit-student/:id_student', name:'edit-student', component:AddStudent},
        {path:'/contactus', name:'contactus', component:ContactView},
        {path:'/sectors', name:'sectors', component:SectorsView},

    ]
});

export default router;