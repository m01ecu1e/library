<template>
  <div
    class="grid grid-cols-9 pl-2 justify-items-center py-3 mx-2 w-full sm:flex sm:justify-center lg:flex lg:justify-center lg:py-3 lg:text-md">
    <div class="col-span-1 sm:px-5 lg:px-5 md:px-5 content-center text-xl text-sky-500 hover:text-sky-600 font-bold ">
      <NuxtLink to="/">
        <p>libPnz</p>
      </NuxtLink>
    </div>
    <UDivider orientation="vertical" class="col-span-1" />
    <!-- <div
      class=" pr-5 justify-items-end grid grid-cols-2 col-span-2 content-center text-xl px-5 sm:px-5 md:px-5 lg:px-5 lg:justify-items-center"> -->
    <NuxtLink to="/Libraries"
      class="col-span-3 px-5 sm:px-5 md:px-5 lg:px-5 hover:text-sky-600 text-xl content-center ">
      <p>Библиотеки</p>
    </NuxtLink>

    <UDivider orientation="vertical" class="col-span-1" />

    <div v-if="props.user"
      class="col-span-1 lg:flex-none px-5 sm:px-5 md:px-5 lg:px-5 hover:text-sky-600 text-xl content-center ">
      <NuxtLink v-if="props.user.admin" to="/Admin">
        <p>{{ props.user.firstName }}</p>
      </NuxtLink>
      <NuxtLink v-else-if="!props.user.admin" to="/Account">
        <p>{{ props.user.firstName }}</p>
      </NuxtLink>
    </div>

    <div v-else class="col-span-1 px-5 sm:px-5 md:px-5 lg:px-5  hover:text-sky-600 text-xl content-center ">
      <NuxtLink to="AuthPage">
        <p>Войти</p>
      </NuxtLink>
    </div>

    <UDivider orientation="vertical" class="col-span-1" />

    <UButton color="gray" variant="link" icon="i-heroicons-bars-3-20-solid" @click="isOpen = true"
      class="col-span-1 content-center px-5 sm:px-5 md:px-5 lg:px-5" size="xl" />
    <!-- </div> -->
  </div>


  <USlideover v-model="isOpen" :ui="{ width: 'w-md' }">
    <UCard class="flex flex-col flex-1"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="grid grid-cols-2 justify-items-end items-center">
          <p class="text-xl">Настройки</p>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="border" size="xl"
            @click="isOpen = false" />
        </div>
      </template>
      <div class="flex justify-end">
        <p class="mr-5">Тёмная тема</p>
        <UToggle on-icon="i-mdi-moon-waxing-crescent" off-icon="i-mdi-white-balance-sunny" size="lg" v-model="isDark">
        </UToggle>
        
      </div>

      <Placeholder class="h-full" />

      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </USlideover>
</template>

<script setup>



const isOpen = ref(false)

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const props = defineProps({
  user: {
    type: Object,
    required: false
  }
})
</script>