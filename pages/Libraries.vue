<template>
  <UContainer>
    <yandex-map v-model="map" :settings="{
      location: {
        center: [44.985491, 53.163541],
        zoom: 13,
      },
      theme:colorMode.value,
    }" 
    height="900px" :show-all-markers="true">
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-marker v-for="(marker, index) in markers" :key="index" :settings="marker" offset="15">
        <CustomMarker :library="marker.library" />
      </yandex-map-marker>
    </yandex-map>
  </UContainer>

</template>

<script lang="ts" setup>
import type { YMap } from '@yandex/ymaps3-types';
import { shallowRef } from 'vue';
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker } from 'vue-yandex-maps';

// const handleClick = (event: MouseEvent) => console.log(event);

const markers = ref([])

const map = shallowRef<null | YMap>(null);

const { fetchLibs } = useLibrary()

const libraries = await fetchLibs()

const colorMode = useColorMode()

// console.log(libraries?.libraries)

markers.value = libraries?.libraries.map(library => ({
  coordinates: [library.longitude, library.latitude],
  library
}));

// console.log(markers.value)

// function handleSelectLibrary(libraryId) {
//   const selectedLibrary = libraryBooks.value.find(library => library.id === libraryId);
//   selectedLib.value = selectedLibrary.id;
//   selectedLibInfo.value = selectedLibrary;
//   isOpen.value = true;
// }
</script>

<style></style>