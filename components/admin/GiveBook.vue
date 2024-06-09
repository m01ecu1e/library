<template>
  <UCard v-if="authStore.authUser.admin" class="w-full">
    <h3 class="mb-4">Выдать или принять книгу</h3>
    <form class="flex flex-col">
      <UInputMenu v-model="selectedOrder" :search="getBookedBooks" :options="bookedBooks" :loading="loading" size="xl"
        class="w-96 max-w-full mb-2" placeholder="Номер заказа" option-attribute="orderCode" trailing by="orderCode">
        <template #option="{ option: orderCode }">
          <div class="flex-1 font-semibold">
            {{ orderCode.orderCode }}
          </div>
        </template>
      </UInputMenu>
      <UButton :loading="loading" :disabled="loading" @click="handleGiveOrder" size="xl" class="justify-center mb-5">
        Показать заказ
      </UButton>
      <UButton @click="toggleScanner" size="xl" class="justify-center mb-5">
        Отсканировать
      </UButton>
      <div v-if="scannerVisible" class="mb-5">
        <qrcode-stream :constraints="selectedConstraints" :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats" @error="onError" @detect="onDetect" @camera-on="onCameraReady" />
      </div>
    </form>
  </UCard>
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'

const authStore = useAuthStore()

const loading = ref(false)
const selectedOrder = ref('')
const bookedBooks = ref([])

const { fetchBookedBooks } = useBooks()
const router = useRouter()

const getBookedBooks = async (selectedOrder) => {
  if (selectedOrder === '') return []

  loading.value = true

  const response = await fetchBookedBooks({
    query: selectedOrder
  })

  bookedBooks.value = response.bookedBooks
  loading.value = false
  return bookedBooks.value
}

const handleGiveOrder = () => {
  router.push({
    path: `/Admin/Order/${selectedOrder.value}`,
  })
  console.log("order:", selectedOrder.value.orderCode)
}

const scannerVisible = ref(false)

const toggleScanner = () => {
  scannerVisible.value = !scannerVisible.value
}

const result = ref('')

function onDetect(detectedCodes) {
  if (detectedCodes.length > 0) {
    const decodedString = detectedCodes[0].rawValue // берем только первую распознанную строку
    result.value = decodedString
    selectedOrder.value = decodedString
    playBeepSound() // Воспроизведение звука
    handleGiveOrder()
    console.log("result:", result.value)
  }
}

function playBeepSound() {
  const audioCtx = new (window.AudioContext || window.AudioContext)()
  const oscillator = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(700, audioCtx.currentTime) // частота 440 Гц (нотка Ля)
  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  oscillator.start()
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1)
  oscillator.stop(audioCtx.currentTime + 0.2)
}

const selectedConstraints = ref({ facingMode: 'environment' })
const defaultConstraintOptions = [
  { label: 'rear camera', constraints: { facingMode: 'environment' } },
  { label: 'front camera', constraints: { facingMode: 'user' } }
]
const constraintOptions = ref(defaultConstraintOptions)

async function onCameraReady() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label: `${label} (ID: ${deviceId})`,
      constraints: { deviceId }
    }))
  ]

  error.value = ''
}

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}

function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}

function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 3
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(detectedCode.rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}

const trackFunctionOptions = [
  { text: 'nothing (default)', value: undefined },
  { text: 'outline', value: paintOutline },
  { text: 'centered text', value: paintCenterText },
  { text: 'bounding box', value: paintBoundingBox }
]
const trackFunctionSelected = ref(trackFunctionOptions[1])

/*** barcode formats ***/

const barcodeFormats = ref({
  aztec: false,
  code_128: false,
  code_39: false,
  code_93: false,
  codabar: false,
  databar: false,
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: false,
  ean_8: false,
  itf: false,
  maxi_code: false,
  micro_qr_code: false,
  pdf417: false,
  qr_code: true,
  rm_qr_code: false,
  upc_a: false,
  upc_e: false,
  linear_codes: false,
  matrix_codes: false
})
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
})

/*** error handling ***/

const error = ref('')

function onError(err) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission'
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  } else {
    error.value += err.message
  }
}
</script>