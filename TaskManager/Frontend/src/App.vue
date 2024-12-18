<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- Header -->
    <header class="flex justify-between items-center bg-white p-4 shadow rounded-md mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Task Manager</h1>
      <button @click="toggleAddTaskForm" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Dodaj zadatak
      </button>
    </header>

    <div v-if="isAddTaskFormVisible">
      <form @submit.prevent="addTask" class="space-y-4">
        <div>
          <label for="naslov" class="block text-sm font-medium text-gray-700">Naslov</label>
          <input v-model="naslov" id="naslov" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label for="opis" class="block text-sm font-medium text-gray-700">Opis</label>
          <textarea v-model="opis" id="opis" required class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
        </div>
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700">Tagovi (odvojeni zarezima)</label>
          <input v-model="tags" id="tags" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Dodaj zadatak
          </button>
        </div>
      </form>
    </div>

    <!-- Task List -->
    <div class="bg-white p-4 shadow rounded-md mt-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Vaši zadaci</h2>
      <ul class="space-y-4">
        <Task v-for="task in tasks" :key="task._id" :id="task._id" :naslov="task.naslov" :opis="task.opis" :zavrsen="task.zavrsen" :tags="task.tags" @task-updated="refreshTasks" @task-deleted="removeTask" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import Task from "./components/Task.vue"; 

let tasks = ref([]);
let isAddTaskFormVisible = ref(false);
let naslov = ref("");
let opis = ref("");
let tags = ref("");

const toggleAddTaskForm = () => {
  isAddTaskFormVisible.value = !isAddTaskFormVisible.value;
};

const addTask = async () => {
  try {
    const taskData = {
      naslov: naslov.value,
      opis: opis.value,
      tags: tags.value.split(",").map(tag => tag.trim())
    };

    const response = await axios.post("http://localhost:8000/tasks", taskData);
    console.log("Dodat zadatak:", response.data);

    tasks.value.push({
      _id: response.data.insertedId, 
      naslov: naslov.value,
      opis: opis.value,
      zavrsen: false,
      tags: tags.value.split(",").map(tag => tag.trim())
    });

    naslov.value = "";
    opis.value = "";
    tags.value = "";
    isAddTaskFormVisible.value = false; 
  } catch (error) {
    console.error("Greška prilikom dodavanja zadatka:", error);
  }
};

const refreshTasks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/tasks");
    tasks.value = response.data;
  } catch (error) {
    console.error("Greška prilikom učitavanja zadataka:", error);
  }
};

const removeTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task._id !== taskId);
};

onMounted(refreshTasks);
</script>

<style scoped>
</style>
