<template>
  <div class="relative">
    <!-- Кнопка маркера -->
    <button @click="openModal"
      class="marker-button transform -translate-x-1/2 -translate-y-1/2 text-white text-md font-semibold border-4 shadow-lg border-white bg-sky-500 hover:bg-sky-600 rounded-full px-3 py-3">
    </button>
    <!-- Всплывающая информация -->
    <div v-if="showInfo"
      class="absolute left-full bottom-full mb-3 transform -translate-x-1/2 bg-white text-black text-xs p-2 border border-gray-400 rounded-lg shadow-lg">
      <p class="font-semibold mb-2">{{ library.libraryName }}</p>
      <p>Экземпляров: {{ library.amountAvailable }}</p>
      <button v-if="library.amountAvailable > 0" @click="selectLibrary"
        class=" text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-2 ">
        Выбрать
      </button>
    </div>
    

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const toast = useToast()
const props = defineProps({
  library: {
    type: Object,
    required: true
  },
});

const showInfo = ref(false);

function openModal() {
  showInfo.value = !showInfo.value;
}

const emits = defineEmits(['selectLibrary']);

function selectLibrary() {
  emits('selectLibrary', props.library.id);
  // console.log(props.library.id)
  // toast.add({
  //   title: 'Успешно добавлена книга: "Мастер и Маргарита" в "Городская библиотека №10"',
  //   description: '' + props.library.libraryName + '',
  //   icon: 'i-mdi-check',
  //   color: 'red'
  // })
}

</script>