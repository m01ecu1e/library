<template>
    <div>
        <NuxtLink :to="bookUrl">
            <p class="font-semibold">
                {{ props.book.title }}
            </p>

        </NuxtLink>
        <p>
            Автор: {{props.book.author}}
        </p>
        <p>
            Издательство: {{ props.book.publisher }}
        </p>
        <p>
            В наличии в {{ props.book.libraryBookCount }} библиотеках
        </p>
    </div>
</template>

<script setup>
    const props = defineProps({
        book: {
            type: Object,
            required: true
        }
    })

const bookUrl = computed(() => `/Book/${props.book.id}`)
</script>