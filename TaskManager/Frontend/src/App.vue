<template>
  <div class="max-w-4xl mx-auto p-4">
    <div v-if="!user">
      <form @submit.prevent="registerUser" class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Registracija</h2>
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Korisničko ime</label>
          <input v-model="username" id="username" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Lozinka</label>
          <input v-model="password" id="password" type="password" required class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Registriraj se
          </button>
        </div>
      </form>

      <form @submit.prevent="loginUser" class="space-y-4 mt-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Prijava</h2>
        <div>
          <label for="loginUsername" class="block text-sm font-medium text-gray-700">Korisničko ime</label>
          <input v-model="loginUsername" id="loginUsername" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label for="loginPassword" class="block text-sm font-medium text-gray-700">Lozinka</label>
          <input v-model="loginPassword" id="loginPassword" type="password" required class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Prijavi se
          </button>
        </div>
      </form>
    </div>

    <div v-else>
      <header class="flex justify-between items-center bg-white p-4 shadow rounded-md mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Task Manager</h1>
        <button @click="toggleAddTaskForm" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Dodaj zadatak
        </button>
        <button @click="logoutUser" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Odjava
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

      <div class="bg-white p-4 shadow rounded-md mt-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Vaši zadaci</h2>
        <ul class="space-y-4">
          <Task v-for="task in tasks" :key="task._id" :id="task._id" :naslov="task.naslov" :opis="task.opis" :zavrsen="task.zavrsen" :tags="task.tags" @task-updated="refreshTasks" @task-deleted="removeTask" />
        </ul>
      </div>
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

let username = ref("");
let password = ref("");
let user = ref(null);

let loginUsername = ref("");
let loginPassword = ref("");

const getToken = () => {
  return localStorage.getItem("token");
};

const checkSession = async () => {
  const token = getToken();
  if (token) {
    try {
      await refreshTasks();
      console.log("Session restored.");
    } catch {
      console.error("Invalid token or session expired.");
      logoutUser();
    }
  }
};

const registerUser = async () => {
  try {
    const response = await axios.post("http://localhost:8000/register", {
      username: username.value,
      password: password.value,
    });
    console.log("Registration successful:", response.data);
    alert("Registration successful. Please log in.");
    username.value = "";
    password.value = "";
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Error during registration. Please try again.");
  }
};

const loginUser = async () => {
  try {
    const response = await axios.post("http://localhost:8000/login", {
      username: loginUsername.value,
      password: loginPassword.value,
    });
    console.log("Login successful:", response.data);
    user.value = response.data.user;
    localStorage.setItem("token", response.data.jwt_token);
    loginUsername.value = "";
    loginPassword.value = "";
    await refreshTasks();
  } catch (error) {
    console.error("Error during login:", error);
    alert("Invalid credentials. Please try again.");
  }
};

const addTask = async () => {
  try {
    const token = getToken();
    if (!token) {
      alert("You must be logged in to add tasks.");
      return;
    }
    const taskData = {
      naslov: naslov.value,
      opis: opis.value,
      tags: tags.value.split(",").map((tag) => tag.trim()),
    };
    const response = await axios.post("http://localhost:8000/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Task added:", response.data);
    naslov.value = "";
    opis.value = "";
    tags.value = "";
    await refreshTasks();
  } catch (error) {
    console.error("Error adding task:", error);
    alert("Error adding task. Please try again.");
  }
};

const refreshTasks = async () => {
  try {
    const token = getToken();
    if (!token) {
      alert("You must be logged in to view tasks.");
      return;
    }
    const response = await axios.get("http://localhost:8000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    tasks.value = response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    alert("Error fetching tasks. Please try again.");
  }
};

const removeTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task._id !== taskId);
};

const logoutUser = () => {
  localStorage.removeItem("token");
  user.value = null;
  tasks.value = [];
  console.log("User logged out.");
  alert("You have been logged out.");
};

onMounted(checkSession);

const toggleAddTaskForm = () => {
  isAddTaskFormVisible.value = !isAddTaskFormVisible.value;
};
</script>

<style scoped>
</style>
