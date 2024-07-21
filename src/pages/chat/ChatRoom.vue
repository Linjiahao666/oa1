<template>
  <BasePageLayout>
    <VerticalLayout>
      <template #left>
        <ChatRoomList class="h-full" style="width: 240px;" />
      </template>
      <template #center>
        <ChatRoomContent />
      </template>
      <template #right>
        <ChatRoomToolList class="h-full bg-slate-500 bg-opacity-10" style="width: 48px;" />
      </template>
    </VerticalLayout>
  </BasePageLayout>
</template>

<script setup lang="ts">
import BasePageLayout from "@/components/layout/BasePageLayout.vue";
import VerticalLayout from "@/components/layout/VerticalLayout.vue";
import ChatRoomContent from "@/components/chat/ChatRoomContent.vue";
import ChatRoomToolList from "@/components/chat/ChatRoomToolList.vue";
import ChatRoomList from "@/components/chat/ChatRoomList.vue";
</script>

<style scoped lang="scss"></style>
