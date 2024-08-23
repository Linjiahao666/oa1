<template>
  <form ref="form">
    <slot name="header">
      <form-header :title="title" />
    </slot>
    <slot name="default" />
  </form>
</template>

<script setup>
import FormHeader from './FormHeader.vue'
defineProps(['title'])
const form = ref()
</script>