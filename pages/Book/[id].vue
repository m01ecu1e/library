<template>
    <UContainer v-if="book" class=" rounded-lg w-2/3 py-5">
        <UCard class="px-20 shadow-lg">
            <template #header>
                <div class="font-semibold text-xl">
                    {{ book.title }}
                </div>
            </template>
            <div class="flex">
                <div class="h-50 w-1/6 content-center border border-gray-400 shadow-xl">
                    <img :src="book.coverImage" alt="Обложка">
                </div>
                <div class=" w-full pl-5  content-center">
                    <div class="flex">
                        Автор: <p class="ml-2 font-semibold"> {{ book.author }}</p>
                    </div>
                    <div class="flex">
                        Издательство: <p class="ml-2 font-semibold"> {{ book.publisher }}</p>
                    </div>
                    <div class="mt-8">
                        <p class="font-semibold">
                            В наличии в:
                        </p>
                        <p>{{ libraryBooks.length}} библиотеках</p>
                        <!-- <p v-for="libraryBook in libraryBooks" :key="libraryBook.id" class="mb-3">
                        <p>
                            {{ libraryBook.libraryName }}
                        </p>
                        <p class="font-semibold">{{ libraryBook.amountAvailable }} экз.</p>
                        <p> По адресу: {{ libraryBook.address }}</p>
                        </p> -->
                    </div>
                </div>
            </div>
            <template #footer>
                <USelectMenu v-model="selectedLib" :options="libraryBooks"
                    placeholder="Для бронирования выберите библиотеку" value-attribute="id"
                    option-attribute="libraryName" class="mb-2" size="xl" />
                <div v-if="user">
                    <!-- <button v-if="selectedLib.amountAvailable > 0" @click="handleBooking"
                        class=" text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-2 ">
                        Забронировать
                    </button> -->
                    <UButton @click="handleBooking" size="lg" class="my-2">
                        Забронировать
                    </UButton>
                </div>
            </template>
        </UCard>
        <yandex-map v-model="map" :settings="{
            location: {
                center: [44.985491, 53.163541],
                zoom: 13,
            },
        }" height="500px" :show-all-markers="true">
            <yandex-map-default-scheme-layer />
            <yandex-map-default-features-layer />
            <yandex-map-marker v-for="(marker, index) in markers" :key="index" :settings="marker" offset="15">
                <!-- <div class="bg-white rounded-lg shadow-lg text-xs content-center py-1 px-1 mb-3 border border-gray-600"><p class="font-bold">{{ marker.library.amountAvailable }} экз. </p></div>
                <button @click="isOpen = true"
                    class="transform -translate-x-1/2 -translate-y-1/2 text-white text-md font-semibold border-4 shadow-lg border-white bg-sky-500 hover:bg-sky-600 rounded-full px-3 py-3">
                </button> -->
                <CustomMarker :library="marker.library"  @selectLibrary="handleSelectLibrary"/>
            </yandex-map-marker>
        </yandex-map>
    </UContainer>
    <UModal v-model="isOpen">
    <!-- <UContainer class="p-4"> -->
      <div v-if="selectedLib && selectedLibInfo" class="px-7 py-5">
        <p>Вы выбрали библиотеку:</p>
        <p class="font-semibold">{{ selectedLibInfo.name }}</p>
        <p>По адресу: {{ selectedLibInfo.address }}</p>
        <p>Книга: {{ book.title }}</p>
        <p>Издательство: {{ book.publisher }}</p>
        <button  @click="handleBooking" class="text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-2">
          Забронировать
        </button>
      </div>
    <!-- </UContainer> -->
  </UModal>

</template>

<script setup lang="ts">
// import { YMapMarkerProps } from '@yandex/ymaps3-types/imperative/YMapMarker';
import type { YMap } from '@yandex/ymaps3-types';
import { shallowRef } from 'vue';
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker } from 'vue-yandex-maps';

// const handleClick = (event: MouseEvent) => console.log(event);

const markers = ref([])


const map = shallowRef<null | YMap>(null);

const isOpen = ref(false)
const { getBookById } = useBooks()
const book = ref(null)
const libraryBooks = ref(null)
const selectedLib = ref()
const selectedLibInfo = ref()
const route = useRoute()
const loading = ref(false)
const toast = useToast()
const error = ref()

const { useAuthUser, initAuth, useAuthLoading } = useAuth()

const user = useAuthUser()

onBeforeMount(() => {
    initAuth()
})

const bookId = computed(() => route.params.id)

async function getBook() {
    try {
        const response = await getBookById(bookId.value)
        book.value = response.book
        libraryBooks.value = response.libs
        console.log(libraryBooks.value)
        markers.value = response.libs.map(library => ({
            coordinates: [library.longitude, library.latitude],
            library
        }));
    } catch (error) {
        console.log(error)
    }
}

async function handleBooking() {

    const { postBookedBook, putLibraryBook } = useBooks()
    loading.value = true
    isOpen.value = false
    error.value = null
    try {
        await putLibraryBook({
            libraryBookId: selectedLib.value,
            value: -1
        })
        await postBookedBook({
            libraryBookId: selectedLib.value,
            userId: user._object.$sauth_user.id
        })
        toast.add({
            title: 'Вы забронировали книгу:',
            description: '' + book.value.title + '',
            icon: 'i-heroicons-check-circle'
        })
    } catch (err) {
        console.log(err.statusMessage)
        toast.add({
            title: 'Ошибка:',
            description: '' + err.statusMessage + '',
            icon: 'i-heroicons-x-circle',
            color: 'red'
        })
    } finally {
       
        
        loading.value = false
    }
}

getBook()

function handleSelectLibrary(libraryId) {
  const selectedLibrary = libraryBooks.value.find(library => library.id === libraryId);
  selectedLib.value = selectedLibrary.id;
  selectedLibInfo.value = selectedLibrary;
  isOpen.value = true;
}
</script>

<style scoped>

</style>