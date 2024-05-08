<template>
    <div class="flex">
        <!-- <input :value="props.modelValue" @input="event => emits
            ('update:modelValue', event.target.value)" class="border px-4 mx-20 w-full
             rounded-full h-full text-sm" :type="props.type" :placeholder="props.placeholder"> -->
             <input class="border px-4 mx-20 w-full
              rounded-full h-full text-sm shrink-0" :placeholder="props.placeholder">
    </div>
</template>

<script setup>

// const emits = defineEmits(['update:modelValue'])

const props = defineProps({
    // modelValue: {
    //     type: String,
    //     required: true
    // },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: null
    },

})

</script>