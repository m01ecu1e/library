<template>
  <UCard class="w-full">
    <h3 class="mb-4">Добавить автора:</h3>
    <form
      @submit="handleAddAuthor"
      class="flex flex-col"
    >
      <UInput
        type="text"
        :disabled="data.loading"
        placeholder="Имя автора"
        v-model="data.name"
        class="mb-2"
        size="xl"
        required
      />
      <UInput
        type="text"
        :disabled="data.loading"
        placeholder="Доп. информация"
        v-model="data.info"
        class="mb-6"
        size="xl"
        required
      />
      <UButton
        type="submit"
        :loading="data.loading"
        :disabled="data.loading"
        @submit="handleAddAuthor"
        class="justify-center"
      >
        Добавить
      </UButton>
    </form>
  </UCard>
</template>

<script setup>
const data = reactive({
  name: '',
  info: '',
  loading: false
})


async function handleAddAuthor() {
  const { postAuthor } = useAuthors()
  data.loading = true
  try {
    await postAuthor({
      name: data.name,
      info: data.info
    })
  } catch (error) {
    console.log(error)
  } finally {
    data.loading = false

  }
  // alert(JSON.stringify({
  //   name: data.name,
  //   info: data.info
  // }))
}


</script>