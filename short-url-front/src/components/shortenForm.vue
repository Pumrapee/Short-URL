<script setup>
import { ref } from "vue";

const originalUrl = ref("");
const shortUrl = ref(null);

const shortenUrl = async () => {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/url/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: originalUrl.value }),
    });

    if (response.ok) {
      const data = await response.json();
      shortUrl.value = data.shortUrl;
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
    <h2>Create a Short URL</h2>
    <form @submit.prevent="shortenUrl">
      <input
        v-model="originalUrl"
        type="text"
        placeholder="Enter original URL"
        required
      />
      <button type="submit">Shorten</button>
    </form>
    <div v-if="shortUrl">
      <p>
        Short URL: <a :href="shortUrl" target="_blank">{{ shortUrl }}</a>
      </p>
    </div>
  </div>
</template>
