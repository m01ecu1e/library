<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-5 rounded-lg shadow-lg">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">QR-код</h2>
        <button @click="closeModal" class="text-red-500">&times;</button>
      </div>
      <div class="mt-4">
        <canvas ref="qrcode"></canvas>
        <p class="mt-2">https://libpnz.netlify.app/Admin/{{ orderCode }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  orderCode: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['close'])

const qrcode = ref(null)

const closeModal = () => {
  emit('close')
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    QRCode.toCanvas(qrcode.value, `https://libpnz.netlify.app/Admin/${props.orderCode}`, (error) => {
      if (error) console.error(error)
    })
  }
})
</script>