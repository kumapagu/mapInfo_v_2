<template>
  <GmapMap
   :center="{ lat: 35.66606091, lng: 139.41392096 }" 
   :zoom= "16" 
   map-type-id="terrain" 
   style="width: 500px; height: 300px;"
   ></GmapMap>
</template>

<script>
export default {
  name: 'GmapMap'

}
</script>

<style>

</style>