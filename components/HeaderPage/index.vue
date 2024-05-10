<template>
    <div class="flex justify-center w-screen">
        <div class="flex p-3 text-lg text-sky-500 hover:text-sky-600 font-bold">
            <NuxtLink to="">
                    <p>libPnz.ru</p>
            </NuxtLink>
        </div>

        <div class="flex mx-8 justify-center">
            <HeaderPageTab class=" mx-2">
                <template v-slot:name>
                    Каталог
                </template>
            </HeaderPageTab>

            <HeaderPageTab class=" mx-2">
                <template v-slot:name>
                    Библиотеки
                </template>
            </HeaderPageTab>

            <HeaderPageTab class=" mx-2">
                <template v-slot:name>
                    Афиша
                </template>
            </HeaderPageTab>

            <HeaderPageTab class=" mx-2">
                <template v-slot:name>
                    Новости
                </template>
            </HeaderPageTab>

        </div>
    </div>
</template>

<script setup>


</script>