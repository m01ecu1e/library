<template>
  <UCard class="w-full">
    <h3 class="mb-4">Добавить книгу:</h3>
    <form
          @submit="handleAddBook"
          class="flex flex-col"
        >
            <UInput
            type="text"
            :disabled="loading"
            placeholder="Название"
            v-model="title"
            class="mb-2"
            size="xl"
            required
          />
          <UInputMenu
            v-model="selectedAuthor"
            :search="searchAuthors"
            :options="authors"
            :loading="loading"
            size="xl"
            class="w-96 max-w-full mb-2"
            placeholder="Автор"
            option-attribute="name"
            trailing
            by="id"
          >
          </UInputMenu>
          <div v-if="false">
          <div
            v-if="authors.length > 0"
            v-for="author in authors"
          >
            <div >{{ author.name, author.info }} </div>
          </div>
          <div v-else>
            No results :(
          </div>
        </div>
    
        <UInputMenu
            v-model="selectedPublisher"
            :search="searchPublishers"
            :options="publishers"
            :loading="loading"
            size="xl"
            class="w-96 max-w-full mb-2"
            placeholder="Издательство"
            option-attribute="name"
            trailing
            by="id"
          >
          </UInputMenu>
          <div v-if="false">
          <div
            v-if="publishers.length > 0"
            v-for="publisher in publishers"
          >
            <div >{{ publisher.name }}</div>
          </div>
          <div v-else>
            No results :(
          </div>
        </div>

        <UInput
        type="file"
        :disabled="loading"
        accept="image/*"
        @change="handleFileUpload"
        class="mb-2 hover:bg-red-200"
        
        size="xl"
        />
        <UButton
        type="submit"
        :loading="loading"
        :disabled="loading"
        @submit="handleAddBook"
        class="justify-center"
      >
        Добавить
      </UButton>
        </form>
  </UCard>
</template>
<script setup>

// const authorQuery = ref()
// const publisherQuery = ref()

const title = ref('')

const authors = ref([])
const publishers = ref([])

const loading = ref(false)

const selectedAuthor = ref()
const selectedPublisher = ref()
const coverImage = ref('')

const searchAuthors = async (q) => {
  if (q === '') return []

  loading.value = true

  const response = await $fetch('/api/authors/', {
    method: 'GET',
    query: {
      query: q
    }
  })
  
  authors.value = response
  console.log(authors.value)
  loading.value = false
  return authors.value
}

const searchPublishers = async (q) => {
  if (q === '') return []

  loading.value = true

  const response = await $fetch('/api/publishers/', {
    method: 'GET',
    query: {
      query: q
    }
  })
  publishers.value = response
  
  loading.value = false
  return publishers.value
}

const handleFileUpload = (event) => {
  console.log(event[0])
  const file = event[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      // console.log(e.target.result)
      coverImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

async function handleAddBook() {
  const { postBook } = useBooks()
  loading.value = true
  try {
    await postBook({
      publisherId: selectedPublisher.value.id,
      authorId: selectedAuthor.value.id,
      title: title.value,
      coverImage: coverImage.value
    })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false

  }
  console.log(selectedAuthor.value.id)
  console.log(selectedPublisher.value.id)
  console.log(title.value)
}

</script>