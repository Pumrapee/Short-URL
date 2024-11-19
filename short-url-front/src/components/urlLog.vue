<script setup>
import { onMounted, ref } from "vue";

const shortUrl = ref("");
const logs = ref([]);
const totalClicked = ref(0);
const totalUrl = ref(0);

onMounted(async () => {
    getTotalClicked();
    getTotalUrl();
});

const getLogs = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_API_URL}/log/${shortUrl.value}`
    );
    if (response.ok) {
      logs.value = await response.json();
    } else {
      console.error("Error:", await response.text());
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const getTotalClicked = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_API_URL}/log/totalClicked`
    );
    if (response.ok) {
      const data = await response.json();
      totalClicked.value = data.totalClicked;
    } else {
      console.error("Error:", await response.text());
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const getTotalUrl = async () => {
  try {
    const response = await fetch(
      `http://${import.meta.env.VITE_API_URL}/log/totalUrl`
    );
    if (response.ok) {
      const data = await response.json();
      totalUrl.value = data.totalUrl;
    
    } else {
      console.error("Error:", await response.text());
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
</script>

<template>
  <div>
    <h2>View Logs</h2>
    <form @submit.prevent="getLogs">
      <input
        v-model="shortUrl"
        type="text"
        placeholder="Enter Short URL ID"
        required
      />
      <button type="submit">Get Logs</button>
    </form>
    <div v-if="logs.length">
      <h3>Logs</h3>
      <h5>count: {{ logs.length }}</h5>
      <ul>
        <li v-for="log in logs" :key="log.id">{{ log }}</li>
      </ul>
    </div>
    <h2>
        totalClicked: {{ totalClicked }} totalUrl: {{ totalUrl }}
    </h2>
  </div>
</template>
