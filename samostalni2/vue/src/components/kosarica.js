import { ref } from 'vue';

const kosarica = ref([]);

export function dodaj(proizvod) {
  kosarica.value.push(proizvod);
  console.log("Proizvod:", proizvod);
}
