<template>
  <div class="flex justify-center w-screen bg-green-300">
    <div class="justify-start bg-red-300 p-3 text-lg text-sky-500 hover:text-sky-600 font-bold">
      <NuxtLink to="/">
        <p>libPnz.ru</p>
      </NuxtLink>
    </div>
    <div class="bg-green-400">
      <div class="flex mx-8 text-lg justify-center">
        <HeaderTab class="mx-2">Каталог</HeaderTab>
        <HeaderTab class="mx-2">Библиотеки</HeaderTab>
        <HeaderTab class="mx-2">Афиша</HeaderTab>
        <HeaderTab class="mx-2">Новости</HeaderTab>
      </div>
    </div>
  </div>
</template>