<template>
  <div class="ml-5 text-black hover:text-sky-600 bg-blue-200">

    <slot></slot>

  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

// const textClasses = computed(() => props.active ? 'font-semibold' : 'font-normal')
</script>