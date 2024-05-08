<template>
    <div>
        <div class="flex h-8 ">
            <UIInput label="bookSearch" placeholder="Название, автор, тема, издательство"
            class="mx-2 pr-12 flex-none"/>
            <button @click="handleSearch" class="text-white text-sm font-semibold bg-indigo-500 
            hover:bg-indigo-600 rounded-full px-5 ml-8">Найти</button>
            <div class="text-indigo-600 font-semibold text-sm content-center ml-3">Избранное</div>
            <div class="text-indigo-600 font-semibold text-sm content-center ml-5">Личный кабинет</div>
        </div>
    </div>
</template>

<script setup>
    async function handleSearch() {

    }
</script>