<template>
    
    <MainSection class="flex flex-col bg-red-400">

        Home Page
        <BookListFeed :books="homeBooks"/>
    </MainSection>
</template>

<script setup>
import MainSection from '~/components/MainSection.vue';


const {getBooks} = useBooks()
    const homeBooks = ref([])
    const searchQuery = useRoute().query.q

    onBeforeMount(async () => {
        console.log(searchQuery)
        try {
            const {books} = await getBooks({
                query: searchQuery
            })

            homeBooks.value = books
        } catch (error) {
            console.log(error)
        } 
    })

</script>