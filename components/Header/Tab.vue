<template>
  <div
    class="flex p-3 text-black hover:text-sky-600">
    <div
      class="text-md"
      :class="textClasses"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const textClasses = computed(() => props.active ? 'font-semibold' : 'font-normal')
</script>