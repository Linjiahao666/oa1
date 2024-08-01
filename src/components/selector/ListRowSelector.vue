<template>
  <div class="flex flex-row h-12 text-base select-none ml-2" ref="container" :style="{ backgroundColor: totalColor }">
    <div class="item px-2 flex flex-row items-center cursor-pointer pt-1 h-full" v-for="( item, index ) in  list "
      :key="index" @click="changeTab(index)" :class="{ active: currentTab === index }">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
type Item = {
  id: number,
  name: string
}
const container = ref()
const { list } = defineProps(
  {
    list: {
      type: Array as PropType<Item[]>,
      default: []
    },
    totalColor: {
      type: String,
      default: 'transparent'
    },
    activeColor: {
      type: String,
      default: 'transparent'
    }
  }
)
const currentTab = ref(0)
const emit = defineEmits<{
  tabChange: [index: number]
}>()
const changeTab = (index: number) => {
  currentTab.value = index
  emit('tabChange', index)
}
watch(currentTab, async (_, oldV) => {
  if (container.value && oldV !== undefined) {
    const el = container.value.children[oldV] as HTMLElement
    if (el) {
      await nextTick()
      el.classList.add('leave')
      setTimeout(() => {
        el.classList.remove('leave')
      }, 500)
    }
  }
})

</script>

<style scoped lang='scss'>
$radius: 0.6rem;

.item {
  position: relative;
  background-color: transparent;
  overflow: hidden;
  z-index: 10;
  border-radius: $radius $radius 0 0;

  &.active::after,
  &.leave::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 98%;
    background: v-bind(activeColor);
    left: 0;
    bottom: 0;
    z-index: -1;
  }

  &.leave::after {
    z-index: 1;
    animation: .5s cubic-bezier(.25, 1, .30, 1) wipe-out-down both;
  }

  &.active::after {
    animation: .5s cubic-bezier(.25, 1, .30, 1) wipe-in-up both;
    animation-delay: .1s;
  }

  @keyframes wipe-out-down {
    from {
      clip-path: inset(0 0 0 0);
    }

    to {
      clip-path: inset(100% 0 0 0);
    }
  }

  @keyframes wipe-in-up {
    from {
      clip-path: inset(100% 0 0 0);
    }

    to {
      clip-path: inset(0 0 0 0);
    }
  }


}
</style>