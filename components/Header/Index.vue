<template>
  <div class="grid grid-cols-3 py-5 mx-2 w-full sm:flex sm:justify-center lg:flex lg:justify-center lg:py-3 lg:text-md">
    <div class="px-5 col-span-1 content-center text-xl text-sky-500 hover:text-sky-600 font-bold">
      <NuxtLink to="/">
        <p>libPnz</p>
      </NuxtLink>
    </div>
    <div class="pr-5 justify-items-end grid grid-cols-2 col-span-2 content-center text-xl px-5 sm:px-5 md:px-5 lg:px-5 lg:justify-items-center">
      <NuxtLink to="/Libraries" class="col-span-1 pr-2 hover:text-sky-600">
        <p>Библиотеки</p>
      </NuxtLink>
      <div v-if="props.user" class="col-span-1 sm:px-5 md:px-5 lg:px-5 hover:text-sky-600">
        <NuxtLink v-if="props.user.admin" to="/Admin">
          <p>{{ props.user.firstName }}</p>
        </NuxtLink>
        <NuxtLink v-else-if="!props.user.admin" to="/Account">
          <p>{{ props.user.firstName }}</p>
        </NuxtLink>
      </div>
      <div v-else class="col-span-1 sm:px-5 md:px-5 lg:px-5 hover:text-sky-600">
        <NuxtLink to="AuthPage">
          <p>Войти</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false)

const props = defineProps({
  user: {
    type: Object,
    required: false
  }
})
</script>