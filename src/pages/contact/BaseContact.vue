<template>
  <VerticalLayout>
    <template #left>
      <ContactAside />
    </template>
    <template #center>
      <ContactBody />
    </template>
  </VerticalLayout>
</template>

<script setup>
import VerticalLayout from '../../components/layout/VerticalLayout.vue';
import ContactBody from './components/ContactBody.vue';
import ContactAside from './components/ContactAside.vue';
</script>

<style scoped lang='scss'></style>