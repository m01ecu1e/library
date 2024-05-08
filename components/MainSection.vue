<template>
    <div class="bg-red-400">
        <BookListFeed :books="homeBooks"/>
    </div>
</template>

<script setup>
    const {getHomeBooks} = useBooks()
    const homeBooks = ref([])

    onBeforeMount(async () => {
        try {
            const {books} = await getHomeBooks()

            homeBooks.value = books
        } catch (error) {
            console.log(error)
        } 
    })
</script>