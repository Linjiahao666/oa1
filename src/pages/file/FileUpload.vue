<template>
  <input type="file" ref="upload" />
</template>

<script setup>
import { onMounted } from "vue";
import SparkMD5 from "spark-md5";
const upload = ref();
onMounted(() => {
  upload.value.onchange = async (e) => {
    const file = e.target.files[0];
    const chunks = createChunk(file, 1024 * 1024);
    const worker = new Worker(
      new URL("./worker/hashWorker.js", import.meta.url),
      { type: "module" }
    );
    worker.postMessage({ chunks });
    worker.onmessage = (e) => {
      const _hash = e.data;
      
    };
  };
});
const createChunk = (file, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < file.size; i += chunkSize) {
    chunks.push(file.slice(i, i + chunkSize));
  }
  return chunks;
};
</script>
