<template>
  <UForm :schema="schema" :state="data" @submit="handleLogin"
    class="pt-5 space-y-4 shadow-lg my-5 px-8 pb-6 rounded-lg bg-white">

    <UFormGroup name="email" size="lg">
      <UInput v-model="data.email" placeholder="Email" />
    </UFormGroup>

    <UFormGroup name="password" size="lg">
      <UInput v-model="data.password" type="password" placeholder="Пароль" />
    </UFormGroup>

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

</template>

<script setup>
import { object, string } from 'yup'

const schema = object({
  email: string().email('Неверный email').required('Required'),
  password: string().required('Required'),
})

const error = ref()
const toast = useToast()

const data = reactive({
  email: '',
  password: '',
  loading: false
})

async function handleLogin() {
  //alert(JSON.stringify(data))

  
  const { login } = useAuth()

  data.loading = true

  try {
    await login({
      email: data.email,
      password: data.password
    })
    navigateTo('/')
  } catch (err) {
    if (err.statusMessage) {
      error.value = err.statusMessage
      toast.add({
            title: 'Ошибка:',
            description: '' + err.statusMessage + '',
            icon: 'i-heroicons-x-circle',
            color: 'red'
        })
    } else {
      error.value = 'An unexpected error occurred'
    }
  } finally {
    data.loading = false
  }
}

</script>
