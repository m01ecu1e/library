<template>
    <UContainer v-if="loading" class=" rounded-lg lg:w-full py-5">
        <UCard class="px-0 lg:px-20 shadow-lg">
            <template #header>
                <div class="font-semibold text-xl">
                    <USkeleton class="h-8" />
                </div>
            </template>
            <div class="flex">
                <div class="w-48 lg:w-64 lg:content-start">
                    <!-- <img :src="book.coverImage" alt="Обложка" class="border border-gray-400  shadow-xl"> -->
                    <USkeleton class="h-48 lg:h-80" />
                </div>
                <div class=" w-full pl-5 space-y-3">
                    <USkeleton class="h-4 w-80" />

                    <USkeleton class="h-4 w-64" />

                    <USkeleton class="h-4 w-64" />

                    <USkeleton class="h-4 w-48" />

                </div>
            </div>
            <div class="mt-5">
                <USkeleton class="h-8 w-200" />
            </div>
            <div class="mt-10">
                <USkeleton class="h-12 w-200" />
            </div>
            <template #footer>
            </template>
        </UCard>
    </UContainer>


    <UContainer v-if="book" class=" rounded-lg lg:w-full py-5">
        <UCard class="px-0 lg:px-20 shadow-lg">
            <template #header>
                <div class="font-semibold text-xl">
                    {{ book.title }}
                </div>
            </template>
            <div class="flex">
                <div class="w-48 lg:w-64 lg:content-start">
                    <img :src="book.coverImage" alt="Обложка" class="border border-gray-400  shadow-xl">
                </div>
                <div class=" w-full pl-5 ">
                    <div class="lg:flex">
                        Автор: <p class="lg:ml-2 font-semibold"> {{ book.author }}</p>
                    </div>
                    <div class="lg:flex">
                        Издательство: <p class="lg:ml-2 font-semibold"> {{ book.publisher }}</p>
                    </div>
                    <div class="lg:flex">
                        Год издания: <p class="lg:ml-2 font-semibold"> {{ book.year }}</p>
                    </div>
                    <div class="lg:flex lg:mt-5">
                        ISBN: <p class="lg:ml-2 font-semibold"> {{ book.isbn }}</p>
                    </div>

                    <div class="mt-5 lg:mt-8">
                        <p class="font-semibold">
                            В наличии в:
                        </p>
                        <p>{{ libraryBooks.length }} библиотеках</p>

                    </div>
                </div>
            </div>
            <UAccordion :items="items" class="mt-5">
                <template #bookInfo>
                    <div class="flex">
                        {{ book.info }}
                    </div>
                </template>
            </UAccordion>
            <template #footer>
                <USelectMenu v-model="selectedLib" :options="libraryBooks"
                    placeholder="Для бронирования выберите библиотеку" value-attribute="id"
                    option-attribute="libraryName" size="xl" />

                <div v-if="authStore.authUser">
                    <UButton @click="handleBooking" :loading="loading" :disabled="loading" size="lg" class="mt-4">
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
            theme: colorMode.value,
        }" height="500px" :show-all-markers="true">
            <yandex-map-default-scheme-layer />
            <yandex-map-default-features-layer />
            <yandex-map-marker v-for="(marker, index) in markers" :key="index" :settings="marker" offset="15">
                <!-- <div class="bg-white rounded-lg shadow-lg text-xs content-center py-1 px-1 mb-3 border border-gray-600"><p class="font-bold">{{ marker.library.amountAvailable }} экз. </p></div>
                <button @click="isOpen = true"
                    class="transform -translate-x-1/2 -translate-y-1/2 text-white text-md font-semibold border-4 shadow-lg border-white bg-sky-500 hover:bg-sky-600 rounded-full px-3 py-3">
                </button> -->
                <CustomMarker :library="marker.library" :user="authStore.authUser"
                    @selectLibrary="handleSelectLibrary" />
            </yandex-map-marker>
        </yandex-map>
    </UContainer>
    <UModal v-model="isOpen">
        <!-- <UContainer class="p-4"> -->
        <div v-if="selectedLib && selectedLibInfo" class="px-7 py-5">
            <p>Книга будет забронирована в библиотеке:</p>
            <p class="font-semibold">{{ selectedLibInfo.libraryName }}</p>
            <p>По адресу: {{ selectedLibInfo.address }}</p>
            <p>Книга: {{ book.title }}</p>
            <p>Издательство: {{ book.publisher }}</p>
            <UButton :loading="loading" :disabled="loading" @click="handleBooking"
                class="text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-2">
                Забронировать
            </UButton>
        </div>
        <!-- </UContainer> -->
    </UModal>

</template>

<script setup lang="ts">
// import { YMapMarkerProps } from '@yandex/ymaps3-types/imperative/YMapMarker';
import type { YMap } from '@yandex/ymaps3-types';
import { shallowRef } from 'vue';
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker } from 'vue-yandex-maps';

const authStore = useAuthStore()

const markers = ref([])

const map = shallowRef<null | YMap>(null);

const items = [{
    label: 'Показать описание',
    defaultOpen: false,
    slot: 'bookInfo'
}]
const colorMode = useColorMode()

const isOpen = ref(false)
const { getBookById, loading } = useBooks()
const book = ref(null)
const libraryBooks = ref(null)
const selectedLib = ref()
const selectedLibInfo = ref()
const route = useRoute()
const postLoading = ref(false)
const toast = useToast()
const error = ref()

const bookId = computed(() => route.params.id)

async function getBook() {
    try {
        const response = await getBookById(bookId.value)
        book.value = response.book
        libraryBooks.value = response.libs
        // console.log(libraryBooks.value)
        markers.value = response.libs.map(library => ({
            coordinates: [library.longitude, library.latitude],
            library
        }));
    } catch (error) {
        console.log(error)
    }
}

async function handleBooking() {
    console.log("booking user id", authStore.authUser.id)
    const { postBookedBook, putLibraryBook } = useBooks()
    postLoading.value = true
    isOpen.value = false
    error.value = null
    try {
        await postBookedBook({
            libraryBookId: selectedLib.value,
            userId: authStore.authUser.id,
        })
        await putLibraryBook({
            libraryBookId: selectedLib.value,
            value: -1
        })
        toast.add({
            title: 'Вы забронировали книгу:',
            description: '' + book.value.title + '',
            icon: 'i-heroicons-check-circle',
        })
    } catch (err) {
        // console.log(err.statusMessage)
        if (err.message) {
            toast.add({
                title: 'Ошибка:',
                description: '' + err.message + '',
                icon: 'i-heroicons-x-circle',
                color: 'orange'
            })
        } else {
            toast.add({
                title: 'Ошибка:',
                description: 'Что-то пошло не так :/',
                icon: 'i-heroicons-x-circle',
                color: 'red'
            })
        }

    } finally {

        postLoading.value = false
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

<style scoped></style>