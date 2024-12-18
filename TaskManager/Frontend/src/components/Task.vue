<template>
  <div>
    <li :class="{'bg-green-100': zavrsen, 'flex justify-between items-center p-4 bg-gray-50 rounded-md shadow': !zavrsen}">
      <div>
        <p class="text-lg font-medium text-gray-800">{{ naslov }}</p>
        <p class="text-sm text-gray-600">{{ opis }}</p>
        <div>
          <TaskTag v-for="tag in tags" :tag="tag" :key="tag"></TaskTag>
        </div>
      </div>
      <!-- Task Actions -->
      <div class="flex space-x-2">
        <button v-if="!zavrsen" @click="markAsCompleted" class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
          Dovršeno
        </button>
        <button @click="deleteTask" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
          Obriši
        </button>
      </div>
      <!--/Task Actions-->
    </li>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";  
import axios from "axios";
import TaskTag from "./TaskTag.vue";

const props = defineProps({
  id: String,
  naslov: String,
  opis: String,
  zavrsen: Boolean,
  tags: Array
});

const emit = defineEmits();

const markAsCompleted = async () => {
  try {
    console.log("ID:", props.id); 
    await axios.patch(`http://localhost:8000/tasks/${props.id}`);
    emit("task-updated");  
  } catch (error) {
    console.error("Error:", error); 
  }
};

const deleteTask = async () => {
  const confirmed = window.confirm("Jeste li sigurni da želite obrisati ovaj task?");
  if (confirmed) {
    try {
      console.log("ID:", props.id);
      await axios.delete(`http://localhost:8000/tasks/${props.id}`);
      emit("task-deleted", props.id);  
    } catch (error) {
      console.error("FRONTEND Error:", error);
    }
  } else {
    console.log("Brisanje zadatka otkazano.");
  }
};
</script>
