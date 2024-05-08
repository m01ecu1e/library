<template>
    <div>
        <p class="">
            {{props.book.author}}
        </p>
        <p>
            {{ props.book.title }}
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