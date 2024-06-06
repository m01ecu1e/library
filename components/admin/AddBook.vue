<template>
  <UCard class="w-full">
    <h3 class="mb-4">Добавить книгу:</h3>
    <form
          @submit="handleAddBook"
          class="flex flex-col gap-2"
        >
          <UInput
            type="text"
            :disabled="bookLoading"
            placeholder="Название"
            v-model="title"
            size="xl"
            required
          />
          <UInputMenu
            v-model="selectedAuthor"
            :search="searchAuthors"
            :options="authors"
            :loading="bookLoading"
            size="xl"
            placeholder="Автор"
            option-attribute="name"
            trailing
            by="id"
            required
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
    
        <UInput
          type="text"
          :disabled="bookLoading"
          placeholder="Год издания"
          v-model="year"
          size="xl"
          />
          <!-- <UInput
          type="text"
          :disabled="bookLoading"
          placeholder="Дополнительная информация"
          v-model="info"
          class="mb-2"
          size="xl"
          /> -->
        <UTextarea
        autoresize
        type="text"
          :disabled="bookLoading"
          placeholder="Дополнительная информация"
          v-model="info"
          size="xl"
        />
        <UInput
          type="text"
          :disabled="bookLoading"
          placeholder="ISBN"
          v-model="ISBN"
          size="xl"
        />
        <UInputMenu
            v-model="selectedPublisher"
            :search="searchPublishers"
            :options="publishers"
            :loading="bookLoading"
            size="xl"
            placeholder="Издательство"
            option-attribute="name"
            trailing
            by="id"
            required
          />
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
        :disabled="bookLoading"
        accept="image/*"
        @change="handleFileUpload"
        required
        size="xl"
        />
        <UButton
        type="submit"
        :loading="bookLoading"
        :disabled="bookLoading"
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
const toast = useToast()
const title = ref('')
const year = ref('')
const ISBN = ref('')
const info = ref('')

const authors = ref([])
const publishers = ref([])

const bookLoading = ref(false)
const error = ref()

const selectedAuthor = ref()
const selectedPublisher = ref()
const coverImage = ref('')

const searchAuthors = async (q) => {
  if (q === '') return []

  bookLoading.value = true

  const response = await $fetch('/api/authors/', {
    method: 'GET',
    query: {
      query: q
    }
  })
  
  authors.value = response
  // console.log(authors.value)
  bookLoading.value = false
  return authors.value
}

const searchPublishers = async (q) => {
  if (q === '') return []

  bookLoading.value = true

  const response = await $fetch('/api/publishers/', {
    method: 'GET',
    query: {
      query: q
    }
  })
  publishers.value = response
  
  bookLoading.value = false
  return publishers.value
}

const handleFileUpload = (event) => {
  // console.log(event[0])
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
  bookLoading.value = true
  try {
    await postBook({
      publisherId: selectedPublisher.value.id,
      authorId: selectedAuthor.value.id,
      title: title.value,
      year: year.value,
      info: info.value,
      ISBN: ISBN.value,
      coverImage: coverImage.value
    })
  } catch (err) {
    console.log(error)
    if (err) {
      // console.log(err.message)
      error.value = err.message
      toast.add({
            title: 'Ошибка:',
            description: '' + error.value + '',
            icon: 'i-heroicons-x-circle',
            color: 'red'
        })
    } else {
      error.value = 'Что-то пошло не так :/'
      toast.add({
            title: 'Ошибка:',
            description: '' + error.value + '',
            icon: 'i-heroicons-x-circle',
            color: 'red'
        })
    }
  } finally {
    bookLoading.value = false

  }
  // console.log(selectedAuthor.value.id)
  // console.log(selectedPublisher.value.id)
  // console.log(title.value)
}

</script>