<script setup>
import { ref } from "vue";

const shortUrl = ref("");
const qrCode = ref(null);

const getQrCode = async () => {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_API_URL}/qr/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shortUrl: shortUrl.value }),
    });

    if (response.ok) {
      const blob = await response.blob();
      qrCode.value = URL.createObjectURL(blob);
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
    <h2>Generate QR Code</h2>
    <form @submit.prevent="getQrCode">
      <input
        v-model="shortUrl"
        type="text"
        placeholder="Enter Short URL"
        required
      />
      <button type="submit">Generate QR Code</button>
    </form>
    <div v-if="qrCode">
      <img :src="qrCode" alt="QR Code" />
    </div>
  </div>
</template>
