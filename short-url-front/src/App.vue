<script setup>
import shortenForm from "./components/shortenForm.vue";
import qrCodeViewer from "./components/qrCodeViewer.vue";
import urlLog from "./components/urlLog.vue";
</script>

<template>
  <div id="app">
    <h1>Short URL Service</h1>
    <shortenForm />
    <qrCodeViewer />
    <urlLog />
  </div>
</template>