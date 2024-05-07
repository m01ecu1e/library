<template>
    <nuxt-link to="#" class="flex p-3
    text-black hover:text-indigo-500">

        <div class=" text-md" :class="textClasses">
            <slot name="name"></slot>
        </div>
    </nuxt-link>
</template>

<script setup>

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

const textClasses = computed(() => props.active ? 'font-semibold':'font-normal')

</script>