<template>
  <form class="pt-5 space-y-2 shadow-lg my-5 px-8 pb-6 rounded-lg bg-white">
    <p class="pl-4">Email</p>
    <input class="border px-4 basis-8/12 rounded-md h-full text-md focus:border-sky-500  outline-none"
      placeholder="Email" v-model="data.email" />
    <p class="pl-4">Пароль</p>
    <input class="border px-4 basis-8/12 rounded-md h-full text-md focus:border-sky-500  outline-none"
      placeholder="•••••••••••" v-model="data.password" type="password" />
    <div>
      <button @click="handleLogin"
        class=" text-white text-md font-semibold bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2 mt-3 mb-2 ">
        Войти
      </button>
    </div>
    <div class="ml-2 text-gray-400">
      Нет аккаунта?
    </div>
    <NuxtLink to="/" class="m-2 hover:text-sky-600">
      Зарегистрироваться
    </NuxtLink>
  </form>
</template>

<script setup>

const data = reactive({
  email: '',
  password: '',
  loading: false
})

async function handleLogin() {
  //alert(JSON.stringify(data))
  navigateTo('/')
  const { login } = useAuth()

  data.loading = true

  try {
    await login({
      email: data.email,
      password: data.password
    })
  } catch (error) {
    console.log(error)
  } finally {
    data.loading = false
    
  }

}

</script>
