<template>
  <div class="flex justify-center">
    <div class="justify-start p-3 text-lg text-sky-500 hover:text-sky-600 font-bold">
      <NuxtLink to="/">
        <p>libPnz.ru</p>
      </NuxtLink>
    </div>
    <div class="">
      <div class="flex mx-8 text-lg justify-center">
        <HeaderTab class="mx-2">Каталог</HeaderTab>
        <HeaderTab class="mx-2">Библиотеки</HeaderTab>
        <HeaderTab class="mx-2">Афиша</HeaderTab>
        <HeaderTab class="mx-2">Новости</HeaderTab>

        <template v-if="props.user">
          <NuxtLink v-if="props.user.admin" to="/Admin">
            <HeaderTab class="mx-2">{{props.user.firstName}}</HeaderTab>
          </NuxtLink>
          <NuxtLink v-else-if="!props.user.admin" to="/Account">
            <HeaderTab class="mx-2">{{props.user.firstName}}</HeaderTab>
          </NuxtLink>
        </template>

        <NuxtLink v-else to="AuthPage">
          <HeaderTab class="mx-2">Войти</HeaderTab>
        </NuxtLink>
        
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: false
  }
})
</script>