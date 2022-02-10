<template>
  <GmapMap 
  :center="{ lat: 35.68944, lng: 139.69167 }" 
  :zoom= "14" 
  map-type-id="terrain" 
  style="width: 100vw; height: 90vh;"
  @click="setLatLng($event)"
  >
    <GmapInfoWindow 
   
    :position="this.infoWindowPos"
    :opened="this.infoWinOpen" 
    @click="infoWinOpen=false" 
  >
    hoge</GmapInfoWindow>
    <GmapMarker 
    :position="{ lat: this.lat, lng: this.lng }" 
    icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    />
    <GmapMarker 
    :key="id" 
    v-for="(park, id) in this.parks" 
    :position="{ lat: Number(park.lat), lng: Number(park.lng) }" 
    :clickable="true" 
    @click="toggleInfoWindow($event)"
    />
  </GmapMap>
</template>

<script>
import { apiService } from "../common/api.service"

export default {
  name: 'Gmap',
  data(){
    return{
      lat: '',
      lng: '',
      parks: [],
      infoWindowPos: null,
      infoWinOpen: false
    }
  },
  methods:{
    setLatLng(e){
      this.lat = e.latLng.lat()
      this.lng = e.latLng.lng()
    },
    toggleInfoWindow(marker) {
      console.log(marker.lat)
      this.infoWindowPos = marker.position;
      this.infoWinOpen = true;
    },
    getParks() {
      let endpoint = "api/parks/"
      apiService(endpoint).then(data => {
          this.parks.push(...data.results)
      })  
    },
  },
  created() {
    this.getParks()
  },
}
</script>

<style>

</style>