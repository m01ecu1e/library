<template>
  <div>
    <div class="flex">
      <div class="grid grid-rows-12">

        <!-- Header -->
        <div class=" row-span-1 content-center">
          <Header></Header>
        </div>
        <!-- Search bar -->
        <div class="row-span-3 content-center border">
          <HomePageSearchBar/>
        </div>

        <!-- Book cards -->
        <div class=" md:block row-span-8">
          <NuxtPage/>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

</script>
