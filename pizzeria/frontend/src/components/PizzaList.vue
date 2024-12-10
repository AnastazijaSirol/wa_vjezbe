<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Pizze</h1>
    <ul class="list-group">
      <li v-for="pizza in pizze" :key="pizza._id" class="list-group-item mb-3">
        <div class="row">
          <div class="col-md-4">
            <img :src="pizza.slika" alt="Slika pizze" class="img-fluid rounded">
          </div>
          <div class="col-md-8">
            <h2 class="h4">{{ pizza.naziv }}</h2>
            <p>Cijena: <strong>{{ pizza.cijena }} EUR</strong></p>
            <p>Sastojci: {{ pizza.sastojci.join(', ') }}</p>
          </div>
        </div>
      </li>
    </ul>

    <h2 class="text-center mt-5">Naručivanje Pizza</h2>
    <form @submit.prevent="submitOrder">
      <div class="mb-3">
        <label for="ime" class="form-label">Ime</label>
        <input type="text" class="form-control" id="ime" v-model="order.ime" required>
      </div>
      <div class="mb-3">
        <label for="adresa" class="form-label">Adresa</label>
        <input type="text" class="form-control" id="adresa" v-model="order.adresa" required>
      </div>
      <div class="mb-3">
        <label for="telefon" class="form-label">Telefon</label>
        <input type="text" class="form-control" id="telefon" v-model="order.telefon" required>
      </div>
      <div v-for="(item, index) in order.pizza_stavke" :key="index" class="mb-3">
        <h5>Stavka {{ index + 1 }}</h5>
        <div class="mb-3">
          <label for="naziv" class="form-label">Naziv Pizze</label>
          <input type="text" class="form-control" id="naziv" v-model="item.naziv" required>
        </div>
        <div class="mb-3">
          <label for="kolicina" class="form-label">Količina</label>
          <input type="number" class="form-control" id="kolicina" v-model="item.kolicina" required>
        </div>
        <div class="mb-3">
          <label for="velicina" class="form-label">Veličina</label>
          <select class="form-control" id="velicina" v-model="item.velicina" required>
            <option value="mala">Mala</option>
            <option value="srednja">Srednja</option>
            <option value="velika">Velika</option>
          </select>
        </div>
        <div>
        <button type="button" class="btn btn-danger" @click="removeItem(index)">Ukloni Stavku</button>
        </div>
        <div>
        <button type="button" class="btn btn-secondary mb-3" @click="addItem">Dodaj Stavku</button>
        </div>
        <div>
        <button type="submit" class="btn btn-primary">Naruči</button>
        </div>
      </div>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pizze: [],
      order: {
        ime: '',
        adresa: '',
        telefon: '',
        pizza_stavke: [
          { naziv: '', kolicina: 1, velicina: 'mala' }
        ]
      },
      errorMessage: ''
    };
  },
  created() {
    axios.get('http://localhost:3000/pizze')
      .then(response => {
        this.pizze = response.data;
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja pizze:', error);
      });
  },
  methods: {
    addItem() {
      this.order.pizza_stavke.push({ naziv: '', kolicina: 1, velicina: 'mala' });
    },
    removeItem(index) {
      this.order.pizza_stavke.splice(index, 1);
    },
    submitOrder() {
      this.errorMessage = '';
      axios.post('http://localhost:3000/narudzba', this.order)
        .then(response => {
          console.log('Narudžba uspješno poslana:', response.data);
          this.order = {
            ime: '',
            adresa: '',
            telefon: '',
            pizza_stavke: [
              { naziv: '', kolicina: 1, velicina: 'mala' }
            ]
          };
        })
        .catch(error => {
          console.error('Greška prilikom slanja narudžbe:', error);
          if (error.response && error.response.data) {
            this.errorMessage = error.response.data;
          } else {
            this.errorMessage = 'Dogodila se greška prilikom slanja narudžbe';
          }
        });
    }
  }
};
</script>
