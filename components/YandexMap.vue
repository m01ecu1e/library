<template>
  <yandex-map v-model="map" :settings="{
            location: {
                center: [44.985491, 53.163541],
                zoom: 13,
            },
        }" height="500px" :show-all-markers="true">
            <yandex-map-default-scheme-layer />
            <yandex-map-default-features-layer />
            <yandex-map-marker v-for="(marker, index) in markers" :key="index" :settings="marker" offset="15">
                <!-- <div class="bg-white rounded-lg shadow-lg text-xs content-center py-1 px-1 mb-3 border border-gray-600"><p class="font-bold">{{ marker.library.amountAvailable }} экз. </p></div>
                <button @click="isOpen = true"
                    class="transform -translate-x-1/2 -translate-y-1/2 text-white text-md font-semibold border-4 shadow-lg border-white bg-sky-500 hover:bg-sky-600 rounded-full px-3 py-3">
                </button> -->
                <CustomMarker :library="marker.library"  @selectLibrary="handleSelectLibrary"/>
            </yandex-map-marker>
        </yandex-map>
</template>

<script lang="ts" setup>

</script>

<style>

</style>