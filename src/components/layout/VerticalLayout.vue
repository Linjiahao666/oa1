<template>
  <div class="flex flex-row items-center justify-center flex-auto h-full w-full">
    <div class="left flex-grow-0 flex-shrink-0 h-full">
      <slot name="left"></slot>
    </div>
    <div class="center flex-auto h-full">
      <slot name="center"></slot>
    </div>
    <div class="right flex-grow-0 flex-shrink-0 h-full">
      <slot name="right"></slot>
    </div>
  </div>
</template>