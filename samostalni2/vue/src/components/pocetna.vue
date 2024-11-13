<template>
    <div>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Početna stranica</h1>
        <div class="text-xl font-medium">
          Broj proizvoda u košarici: {{ broj_proizvoda }}  
        </div>
      </div>
      <button @click="naruci" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" :disabled="broj_proizvoda === 0">
        Naruči proizvode
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const broj_proizvoda = ref(0);

  const naruci = async () => {
    const kosarica = JSON.parse(localStorage.getItem('kosarica')) || [];
  
    if (kosarica.length > 0) {
      const podaci = { naruceni_proizvodi: kosarica };
  
      try {
        const response = await axios.post('http://localhost:3000/narudzbe', podaci);
        console.log('Narudžba:', podaci);
        localStorage.removeItem('kosarica');
        broj_proizvoda.value = 0; 
      } catch (error) {
        console.error('Greška:', error);
      }
    }
  };

  onMounted(() => {
    const kosarica = JSON.parse(localStorage.getItem('kosarica')) || [];
    broj_proizvoda.value = kosarica.length;
  });
  </script>
  