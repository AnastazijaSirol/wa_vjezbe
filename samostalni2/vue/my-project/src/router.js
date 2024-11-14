import { createRouter, createWebHistory } from 'vue-router';
import ProductView from './components/ProductView.vue';
import Products from './components/Products.vue'
import Pocetna from './components/pocetna.vue'

const routes = [
  { path: '/proizvodi/:id', component: ProductView, name: 'ProductView'},
  { path: '/proizvodi', component: Products, name: 'Products'},
  { path: '/', component: Pocetna}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
