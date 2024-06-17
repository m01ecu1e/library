<template>
  <UContainer class="bg-white dark:bg-gray-900 my-5 rounded-lg shadow-lg">

    <UForm :schema="schema" :state="data" @submit="handleLogin"
      class="pt-5 space-y-4 my-5 px-8 pb-6">
  
      <UFormGroup name="email" size="lg">
        <UInput v-model="data.email" placeholder="Email" />
      </UFormGroup>
  
      <UFormGroup name="password" size="lg">
        <UInput v-model="data.password" type="password" placeholder="Пароль" />
      </UFormGroup>

      <div v-if="error" class="text-red-500">
        {{ error }}
      </div>  
  
      <UButton type="submit" size="lg" class="text-md">
        Войти
      </UButton>
      <div class="ml-2 text-gray-400">
        Нет аккаунта?
      </div>
      <NuxtLink to="/Register" class="m-2 hover:text-sky-600">
        Зарегистрироваться
      </NuxtLink>
    </UForm>
  </UContainer>

</template>

<script setup>
import { object, string } from 'yup'

const authStore = useAuthStore()

const schema = object({
  email: string().email('Неверный формат email').required('Обязательное поле'),
  password: string().required('Введите пароль'),
})

const error = ref()
const toast = useToast()

const data = reactive({
  email: '',
  password: '',
  loading: false
})

async function handleLogin() {
  data.loading = true
  error.value = null

  try {
    await authStore.login({
      email: data.email,
      password: data.password
    })
    toast.add({
            title: 'Вы авторизованы :)',
            // description: 'Ваш email: ' + data.email + '',
            icon: 'i-heroicons-check-circle',
            color: 'green'
        })
    navigateTo('/')
  } catch (err) {
    console.log("error", err)
    if(err && err.message) {
      error.value = err.message
    } else {
      error.value = 'Что-то пошло не так :/'
    }
    // if (err && err.data && err.message) {
    //   error.value = err.message
    // } else if (err && err.response && err.response._data) {
    //   error.value = err.response._data.message
    // } else {
    //   error.value = 'Что-то пошло не так :/'
    // }
    toast.add({
      title: 'Ошибка:',
      description: error.value,
      icon: 'i-heroicons-x-circle',
      color: 'red'
    })
  } finally {
    data.loading = false
  }
}

</script>
