<template>
  <div class="ml-2 flex flex-row justify-start items-center text-xl h-8">
    <el-icon>
      <Folder />
    </el-icon>
    <el-icon>
      <Microphone />
    </el-icon>
    <el-icon>
      <CameraFilled />
    </el-icon>
    <el-icon>
      <PictureFilled />
    </el-icon>
    <el-icon>
      <Tools />
    </el-icon>
    <el-icon>
      <ChatDotRound />
    </el-icon>
  </div>
</template>

<script setup>

</script>

<style scoped lang='scss'>
:deep(.el-icon) {
  margin-right: 1rem;
  cursor: pointer;
}
</style>