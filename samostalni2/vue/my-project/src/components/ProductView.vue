<template>
  <div v-if="proizvod">
    <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{ proizvod.naziv }}</a>
    <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ proizvod.naziv }}</h1>
    <div class="mt-4 lg:row-span-3 lg:mt-0">
      <p class="text-3xl tracking-tight text-gray-900">{{ proizvod.cijena }}€</p>
    </div>
      <button v-for="velicina in proizvod.velicine" :key="velicina" @click="odabrana_velicina = velicina" :class="['px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200', { 'bg-indigo-600 text-white': odabrana_velicina === velicina, 'bg-white text-gray-900 border border-gray-300': odabrana_velicina !== velicina }]">
        {{ velicina }}
      </button>
    <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        <img :src="proizvod.slike[0]" alt="" class="h-full w-full object-cover object-center" />
      </div>
      <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img :src="proizvod.slike[0]" alt="" class="h-full w-full object-cover object-center"/>
        </div>
        <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img :src="proizvod.slike[1]" alt="" class="h-full w-full object-cover object-center"/>
        </div>
      </div>
      <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
        <img :src="proizvod.slike[1]" alt="" class="h-full w-full object-cover object-center" />
      </div>
    </div>
    <div class="space-y-6">
      <p class="text-base text-gray-900">Opis: {{ proizvod.opis }}</p>
    </div>
    Dostupne boje:
    <button v-for="boja in proizvod.dostupne_boje" :key="boja" @click="odabrana_boja = boja" :class="['px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200', { 'bg-indigo-600 text-white': odabrana_boja === boja, 'bg-white text-gray-900 border border-gray-300': odabrana_boja !== boja }]">
      {{ boja }}
    </button>
    <div class="space-y-6">
      <p class="text-base text-gray-900">Karakteristike: {{ proizvod.karakteristike }}</p>
    </div>
    <button type="submit" @click="dodaj_kosarica" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Dodaj u košaricu
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const proizvod = ref(null);
const route = useRoute();
const router = useRouter();
const odabrana_velicina = ref(null);
const odabrana_boja = ref(null);

const dodaj_kosarica = async () => {
  const podaci = {
        id: proizvod.value.id,
        velicina: odabrana_velicina.value,
        boja: odabrana_boja.value,
        narucena_kolicina: 1  
      }

  let kosarica = JSON.parse(localStorage.getItem('kosarica')) || [];

  kosarica.push(podaci);

  localStorage.setItem('kosarica', JSON.stringify(kosarica));

  router.push('/');
};

onMounted(async () => {
  const id = route.params.id; 
  try {
    const response = await axios.get(`http://localhost:3000/proizvodi/${id}`);
    proizvod.value = response.data; 
  } catch (error) {
    console.error('Greška u dohvatu podataka: ', error);
  }
});
</script>
