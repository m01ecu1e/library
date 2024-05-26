<template>
  <UContainer class="w-1/4">
    <UForm :schema="schema" :state="data" @submit="handleRegister" class="pt-5 space-y-4 shadow-lg my-5 px-8 pb-6 rounded-lg bg-white">
      <UFormGroup name="firstName" size="lg">
        <UInput v-model="data.firstName" placeholder="Имя" @input="clearError"/>
      </UFormGroup>
  
      <UFormGroup name="lastName" size="lg">
        <UInput v-model="data.lastName" placeholder="Фамилия" @input="clearError"/>
      </UFormGroup>
  
      <UFormGroup name="email" size="lg">
        <UInput v-model="data.email" placeholder="Email" @input="clearError"/>
      </UFormGroup>
  
      <UFormGroup name="password" size="lg">
        <UInput v-model="data.password" type="password" placeholder="Пароль" @input="clearError"/>
      </UFormGroup>
  
      <UFormGroup name="repeatPassword" size="lg" >
        <UInput v-model="data.repeatPassword" type="password" placeholder="Повторите пароль" @input="clearError"/>
      </UFormGroup>
      <div v-if="error" class="text-red-500">
        {{ error }}
      </div>      
      <UButton type="submit" size="lg" class="text-md">
        Зарегистрироваться
      </UButton>
      <div class="text-gray-400">Уже есть аккаунт?</div>
      <NuxtLink to="/AuthPage" class=" hover:text-sky-600">
        Войти
      </NuxtLink>
      
    </UForm>
  </UContainer>
</template>

<script setup>
import { object, string } from 'yup'
const error = ref()

const schema = object({
  email: string().email('Неверный формат email').required('Обязательное поле'),
  password: string()
    .min(3,'Пароль должен быть не менее 3 символов')
    .required('Обязательное поле'),
  firstName: string()
    .min(2,'Некорректное имя')
    .required('Обязательное поле'),
  lastName :string()
    .min(2,'Некорректная фамилия')
    .required('Обязательное поле'),
})

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

function clearError() {
  error.value = null
}

async function handleRegister() {
  // console.log("reg")
  const { register } = useAuth()
  data.loading = true
  error.value = null

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
    if (err.message) {
      error.value = err.message
      toast.add({
            title: 'Ошибка:',
            description: '' + error.value + '',
            icon: 'i-heroicons-x-circle',
            color: 'red'
        })
    } 
    else {
      error.value = 'Что-то пошло не так :/'
      toast.add({
            title: 'Ошибка:',
            description: '' + error.value + '',
            icon: 'i-heroicons-x-circle',
            color: 'red'
        })
    }
  } finally {
    data.loading = false
  }
}

</script>