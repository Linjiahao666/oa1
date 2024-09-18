<template>
  <div class="w-full h-full p-4" :class="{ dark: isDark }">
    <div class="w-full h-full border-1 text-white dark" id="editor"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import Quill from "quill";
import { QuillBinding } from "y-quill";
import { useDark } from "@vueuse/core";
import "quill/dist/quill.snow.css";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);

const isDark = useDark();
const members = ref([]);

let provider, awareness, quill;

onMounted(() => {
  quill = new Quill("#editor", {
    theme: "snow",
    modules: {
      cursors: true,
    },
  });
  const doc = new Y.Doc();
  const text = doc.getText("quill");
  new QuillBinding(text, quill);
  provider = new WebsocketProvider("ws://localhost:1234", "quill", doc);
  awareness = provider.awareness;
  const userName = "user" + Math.random().toString(36).slice(2);
  awareness.setLocalStateField("user", {
    name: userName,
  });

  awareness.on("change", () => {
    const states = Array.from(awareness.getStates().values());
    console.log(states);
    members.value = states.map((state) => ({
      clientId: state.clientId,
      name: state.user.name,
    }));
  });

  // 显示用户名称和光标
  const cursorsModule = quill.getModule("cursors");
  awareness.on("change", () => {
    const states = Array.from(awareness.getStates().values());
    states.forEach((state) => {
      if (state.user && state.cursor) {
        cursorsModule.createCursor(state.clientId, state.user.name, "blue");
        cursorsModule.moveCursor(state.clientId, state.cursor);
      }
    });
  });

  quill.on("selection-change", (range) => {
    if (range) {
      awareness.setLocalStateField("cursor", {
        index: range.index,
        length: range.length,
      });
    }
  });

  window.addEventListener("beforeunload", () => {
    destroyConnection();
  });
});

function destroyConnection() {
  if (awareness) {
    awareness.off("change");
  }
  if (provider) {
    provider.disconnect();
  }
  const states = Array.from(awareness.getStates().values());
  console.log(states);
}

onUnmounted(() => {
  destroyConnection();
});
</script>

<style scoped>
.dark :deep(.ql-snow .ql-picker-label::before) {
  color: white;
}

/* 更改 Quill 编辑器中 SVG 图标的颜色 */
.dark :deep(.ql-snow .ql-stroke) {
  stroke: white;
}
</style>
