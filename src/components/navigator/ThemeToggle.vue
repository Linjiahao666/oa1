<template>
  <el-switch
    v-model="is"
    @click="toggleTheme($event)"
    style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #ccc"
    :active-action-icon="Moon"
    :inactive-action-icon="Sunny"
  >
  </el-switch>
</template>

<script setup>
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";
import { onMounted, ref } from "vue";
const is = ref(null);
const isDark = useDark();
onMounted(() => {
  is.value = useDark().value;
});
const toggleDark = useToggle(isDark);
const toggleTheme = (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );
  // 兼容性处理
  if (!document.startViewTransition) {
    toggleDark();
    return;
  }
  const transition = document.startViewTransition(() => {
    toggleDark();
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 600,
        easing: "ease-in",
        pseudoElement: isDark.value
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  });
};
</script>

<style scoped lang="scss">
.dark::view-transition-old(root) {
  z-index: 1;
}

.dark::view-transition-new(root) {
  z-index: 1999;
}

::view-transition-old(root) {
  z-index: 1999;
}

::view-transition-new(root) {
  z-index: 1;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 改变light下switch圆球的图标颜色 */
:deep.el-switch__action {
  color: black !important;
}
</style>
