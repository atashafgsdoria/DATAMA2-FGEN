import { createRouter, createWebHistory } from 'vue-router';
import Client from '@/views/Client.vue';
import PropertyInformation from '@/views/PropertyInformation.vue';
import PropertyDescription from '@/views/PropertyDescription.vue';
import PropertiesToBeCovered from '@/views/PropertiesToBeCovered.vue';
import OfferedPackages from '@/views/OfferedPackages.vue';

const routes = [
  { path: '/', component: Client },
  { path: '/property-information', component: PropertyInformation },
  { path: '/property-description', component: PropertyDescription },
  { path: '/property-to-be-covered', component: PropertiesToBeCovered },
  { path: '/offered-packages', component: OfferedPackages }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
