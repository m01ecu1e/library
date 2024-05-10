<template>
    <div>
        <p>
            {{ props.book.title }}
        </p>
        <p>
            Автор: {{props.book.author}}
        </p>
        <p>
            Издательство: {{ props.book.publisher }}
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
</script>