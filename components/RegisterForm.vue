<template>
  <form class="pt-5 space-y-2 shadow-lg my-5 px-8 pb-6 rounded-lg bg-white">
    <p class="pl-4">Имя</p>
    <input class="border px-4 basis-8/12 rounded-md h-full text-md focus:border-sky-500  outline-none"
      placeholder="Имя" v-model="data.firstName" />
    <p class="pl-4">Фамилия</p>
    <input class="border px-4 basis-8/12 rounded-md h-full text-md focus:border-sky-500  outline-none"
      placeholder="Фамиля" v-model="data.lastName" />
    <p class="pl-4">Email</p>
    <input class="border px-4 basis-8/12 rounded-md h-full text-md focus:border-sky-500  outline-none"
      placeholder="Email" v-model="data.email" />
    <p class="pl-4">Пароль</p>
    <input class="border px-4 basis-8/12 rounded-md h-full text-md focus:border-sky-500  outline-none"
      placeholder="•••••••••••" v-model="data.password" type="password" />
    <p class="pl-4">Повторите пароль</p>
    <input class="border px-4 basis-8/12 rounded-md h-full text-md focus:border-sky-500  outline-none"
      placeholder="•••••••••••" v-model="data.repeatPassword" type="password" />
    <div>

      <button @click="handleRegister"
        class=" text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-2 ">
        Зарегистрироваться
      </button>
    </div>
    <div class="ml-2 text-gray-400">
      Уже есть аккаунт?
    </div>
    <NuxtLink to="/AuthPage" class="m-2 hover:text-sky-600">
      Войти
    </NuxtLink>
  </form>
</template>

<script setup>

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

  navigateTo('/AuthPage')
  const { register } = useAuth()

  data.loading = true

  try {
    await register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
      admin: data.admin
    })
  } catch (error) {
    console.log(error)
  } finally {
    data.loading = false
  }

}

</script>