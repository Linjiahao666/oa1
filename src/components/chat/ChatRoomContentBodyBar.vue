<template>
  <div class="flex flex-row" :class="{ 'justify-end': role === 'sender', 'justify-start': role === 'receiver' }"></div>
</template>

<script setup>
defineProps({
  role: {
    type: String,
    default: 'sender',
    validator(value) {
      return ['sender', 'receiver'].includes(value)
    }
  }
})
</script>

<style scoped lang='scss'></style>