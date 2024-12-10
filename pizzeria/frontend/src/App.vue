<template>
  <div id="app">
    <PizzaList />
  </div>
</template>

<script>
import PizzaList from './components/PizzaList.vue';

export default {
  components: {
    PizzaList
  }
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
</style>
