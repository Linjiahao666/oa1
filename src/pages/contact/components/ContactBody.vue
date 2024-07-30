<template>
  <div class="flex flex-col w-full h-full">
    <ContactBodyHeader />
    <ContactBodyContent />
  </div>
</template>

<script setup>
import ContactBodyHeader from './ContactBodyHeader.vue';
import ContactBodyContent from './ContactBodyContent.vue';
import { onMounted, reactive } from 'vue';
</script>

<style scoped lang='scss'></style>