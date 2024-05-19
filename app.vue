<template>
  <div>
    <div class="flex">
      <div class="grid grid-rows-12">

        <!-- Header -->
        <div class=" row-span-1 content-center">
          <Header :user="user"></Header>
        </div>
        <!-- Main content -->
        <div class="md:block row-span-11">
          
          <NuxtPage/>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const { useAuthUser, initAuth, useAuthLoading } = useAuth()

const user = useAuthUser()

onBeforeMount(() => {
  initAuth()
})

</script>
