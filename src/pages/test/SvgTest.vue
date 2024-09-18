<template>
  <div id="wrapper" class="w-full h-full bg-cyan-200"></div>
</template>

<script setup>
import {
  SVG,
  extend as SVGextend,
  Element as SVGElement,
} from "@svgdotjs/svg.js";
import { onMounted } from "vue";
import "@svgdotjs/svg.draggable.js";
onMounted(() => {
  const draw = SVG().addTo("#wrapper").size("100%", "100%");
  const group = draw.group();
  const text = group.text("Hello, SVG.js!").move(100, 100).font({
    family: "Helvetica",
    size: 36,
    leading: 1.5,
  });
  const rect = group
    .rect({
      width: 200,
      height: 200,
    })
    .fill("#f06")
    .front();

  text.insertAfter(rect);
  group.draggable();
});
</script>

<style scoped lang="scss"></style>
