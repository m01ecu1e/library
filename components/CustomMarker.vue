<template>
  <div class="relative">
    <!-- Кнопка маркера -->
    <button @click="openModal"
      class="marker-button transform -translate-x-1/2 -translate-y-1/2  text-md font-semibold border-4 shadow-lg border-white bg-sky-500 hover:bg-sky-600 rounded-full px-3 py-3">
    </button>
    <!-- Всплывающая информация -->
    <div v-if="showInfo"
      class="absolute left-full bottom-full mb-3 w-40 transform -translate-x-1/4 bg-white dark:bg-gray-900 text-xs p-2 border border-gray-400 rounded-lg shadow-lg">
      <p v-if="library.libraryName" class="dark:text-gray-300 font-semibold mb-2">{{ library.libraryName }}</p>
      <p v-else class="font-semibold dark:text-gray-300 mb-2">{{ library.name }}</p>
      <p v-if="library.amountAvailable" class="dark:text-gray-300">Экземпляров: {{ library.amountAvailable }} из {{ library.amount }}</p>
      <p v-if="library.Address" class="mb-2 dark:text-gray-300">{{ library.Address }}</p>
      <p v-if="library.info" class="dark:text-gray-300">{{ library.info }}</p>
      <UButton v-if="library.amountAvailable > 0 && user" @click="selectLibrary"
        class=" text-md font-semibold px-4 py-2 mt-3 mb-2 ">
        Выбрать
      </UButton>
    </div>
    

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// const toast = useToast()
const props = defineProps({
  library: {
    type: Object,
    required: true
  },
  user : {
    type: Object,
    required: true
  }
});

const showInfo = ref(false);

function openModal() {
  showInfo.value = !showInfo.value;
}

const emits = defineEmits(['selectLibrary']);

function selectLibrary() {
  emits('selectLibrary', props.library.id);
}

</script>