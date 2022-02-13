<template>
  <div class="parent">
    <div class="maps">
      <GmapMap 
      :center="center"
      :zoom= "14" 
      
      map-type-id="terrain" 
      style="width: 100vw; height: 86vh;"
      @click="setLatLng($event)"
      >
        <GmapInfoWindow 
        :options="infoOptions"
        :position="this.infoWindowPos" 
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
        >
        <v-card class="mx-auto" max-width="400">
          <v-img class="white--text align-end" height="200px" :src="this.park.image" lazy-src="@/assets/no_image.png">
            <v-card-title><b>{{ this.park.park_name }}</b></v-card-title>
          </v-img>

          <!-- <v-card-subtitle class="pb-0">
            {{ this.park.park_name }}
          </v-card-subtitle> -->

          <v-card-text class="text--primary">
            <div>ブランコ：{{ this.park.playset_swing }}</div>
            <div>すべり台：{{ this.park.playset_slide }}</div>
            <div>砂場：{{ this.park.playset_sandbox }}</div>
            <div>水道：{{ this.park.water_services }}</div>
            <div>自動販売機：{{ this.park.vending_machine }}</div>
            <div>駐輪場：{{ this.park.bicycle_parking }}</div>
            <div>駐車場：{{ this.park.parking }}</div>
            <div>その他の情報：<br>{{ this.park.add_info }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" text :to="{ name: 'park', params: { id: this.park.id } }">
              詳細へ
            </v-btn>
          </v-card-actions>
        </v-card>
        </GmapInfoWindow>
        <GmapMarker 
        :position="{ lat: this.lat, lng: this.lng }" 
        icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        />
        <GmapMarker 
        :key="id" 
        v-for="(park, id) in this.parks" 
        :position="{ lat: Number(park.lat), lng: Number(park.lng) }" 
        :clickable="true" 
        @click="toggleInfoWindow($event); addPark(park)" 
        />
      </GmapMap>
    </div>
    <v-btn class="btn" x-large @click="createInfo" style="z-index:10;">情報を登録する</v-btn>
  </div>
</template>

<script>
import { apiService } from "../common/api.service"

export default {
  name: 'Gmap',
  data(){
    return{
      lat: '',
      lng: '',
      center: { lat: 35.68944, lng: 139.69167 },
      parks: [],
      park: [],
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  methods:{
    setLatLng(e) {
      this.lat = e.latLng.lat()
      this.lng = e.latLng.lng()
    },
    toggleInfoWindow(marker) {
      console.log(marker)
      this.infoWindowPos = marker.latLng;
      this.infoWinOpen = true
    },
    getParks() {
      let endpoint = "api/parks/"
      apiService(endpoint).then(data => {
          this.parks.push(...data.results)
      })  
    },
    addPark(park) {
      this.park = park
    },
    createInfo() {
      if(this.lat && this.lng){
      this.$router.push({
        name: 'info',
        params: {
          lat: this.lat,
          lng: this.lng,
        }
      })
      }else{
        alert('場所を選択してください')
      }
    },
    setCenter() {
      if(sessionStorage.getItem('lat')){
        this.center = { lat:Number((sessionStorage.getItem('lat'))), lng:Number((sessionStorage.getItem('lng'))) }
      } 
    }
  },
  created() {
    this.getParks(),
    this.setCenter()
  },
}
</script>

<style scoped>
.parent {
  position: relative;
}

.map {
  position: absolute;
  z-index: 1;
}

.btn {
  position: absolute;
  bottom: 20px;
  left: 25px;
  z-index: 5;
}

ul {
  list-style: none;
}

h3 {
  text-align: center;
}
</style>