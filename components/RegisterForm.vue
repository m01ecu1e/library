<template>
  <UForm :schema="schema" :state="data" @submit="handleRegister" class="pt-5 space-y-4 shadow-lg my-5 px-8 pb-6 rounded-lg bg-white">
    <UFormGroup name="firstName" size="lg">
      <UInput v-model="data.firstName" placeholder="Имя"/>
    </UFormGroup>

    <UFormGroup name="lastName" size="lg">
      <UInput v-model="data.lastName" placeholder="Фамилия"/>
    </UFormGroup>

    <UFormGroup name="email" size="lg">
      <UInput v-model="data.email" placeholder="Email"/>
    </UFormGroup>

    <UFormGroup name="password" size="lg">
      <UInput v-model="data.password" type="password" placeholder="Пароль" />
    </UFormGroup>

    <UFormGroup name="repeatPassword" size="lg" >
      <UInput v-model="data.repeatPassword" type="password" placeholder="Повторите пароль" />
    </UFormGroup>

    <UButton type="submit" size="lg" class="text-md">
      Зарегистрироваться
    </UButton>
    <div class="text-gray-400">Уже есть аккаунт?</div>
    <NuxtLink to="/AuthPage" class=" hover:text-sky-600">
      Войти
    </NuxtLink>
  </UForm>
</template>

<script setup>
import { object, string } from 'yup'

const schema = object({
  email: string().email('Неверный email').required('Required'),
  password: string()
    .min(3,'Не менее 3 символов')
    .required('Required'),
  firstName: string()
    .min(2,'Некорректное имя')
    .required('Required'),
  lastName :string()
    .min(2,'Некорректная фамилия')
    .required('Required'),
})

const error = ref()
const toast = useToast()

const data = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
  admin: false,
  loading: false
})

async function handleRegister() {
  // console.log("reg")
  const { register } = useAuth()
  data.loading = true
  // error.value = null

  try {
    await register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
      admin: data.admin
    })
    toast.add({
            title: 'Вы зарегистрированы!',
            description: 'Ваш email: ' + data.email + '',
            icon: 'i-heroicons-check-circle',
            color: 'green'
        })
    // navigateTo('/AuthPage')
  } catch (err) {
    if (err.statusMessage) {
      error.value = err.statusMessage
      toast.add({
            title: 'Ошибка:',
            description: '' + err.statusMessage + '',
            icon: 'i-heroicons-x-circle',
            color: 'red'
        })
    } 
    else {
      error.value = 'An unexpected error occurred'
    }
  } finally {
    data.loading = false
  }
}

</script>