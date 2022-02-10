<template>
  <div class="parent">
    <div id="map" class="map" ref="googleMap" />
    <v-btn class="btn" x-large @click="createInfo">情報を登録する</v-btn>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
import { apiService } from "../common/api.service"
export default {
  name: 'maps',
  props: {

  },
  data() {
    return {
      google: null,
      mapConfig: {
        center: {
          lat: 35.68944,
          lng: 139.69167
        },
        zoom: 17,
        mapTypeControl: false
      },
      marker: null,
      lat: null,
      lng: null,
      parks: [],
      markers: [],
      map: null,
      session_info: null
    }
  },
  async mounted() {
    this.google = await GoogleMapsApiLoader({
      // apiKey: process.env.VUE_APP_GOOGLE_API
    })
    if(sessionStorage.getItem('lat')){
      this.mapConfig.center.lat = Number((sessionStorage.getItem('lat')))
      this.mapConfig.center.lng = Number((sessionStorage.getItem('lng')))
    }
    this.initializeMap();
    window.onload = ()=>{
      this.setMarker()
    }
  },
  methods: {
    initializeMap() {
      
      
      const map = new this.google.maps.Map(this.$refs.googleMap, this.mapConfig);
      this.map = map
      map.addListener("click", (e) => {
        this.deleteMarker()
        this.placeMarkerAndPanTo(e.latLng, map);
        this.lat = e.latLng.lat()
        this.lng = e.latLng.lng()
      });
      
    },
    placeMarkerAndPanTo(latLng, map) {
      let marker = new this.google.maps.Marker({
        position: latLng,
        map: map,
        icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });
      this.marker = marker
    },
    deleteMarker() {
      if (this.marker){
        this.marker.setMap(null)
        this.lat = null
        this.lng = null
      }
    },
    
    getParks() {
      let endpoint = "api/parks/"
      apiService(endpoint).then(data => {
          this.parks.push(...data.results)
      })  
    },
    setMarker() {
      for(const park of this.parks){
        let infoContent = 
          `<h3>${park.park_name}</h3>` + 
          '<ul>' +
          `<li>ブランコ：${park.playset_swing}</li>` +
          `<li>すべり台：${park.playset_slide}</li>` +
          `<li>砂場：${park.playset_sandbox}</li>` +
          `<li>水道：${park.water_services}</li>` +
          `<li>自転車置場：${park.bicycle_parking}</li>` +
          `<li>駐車場：${park.parking}</li>` +
          `<li>自動販売機：${park.vending_machine}</li>` +
          '</ul>' +
          `<p>その他の情報：<br>${park.add_info}</p>` +
          `<a href='/park/${ park.id }'>詳細</a>` +
          '<style>' +
          'h3 { text-align:center; }' +
          'ul { list-style:none; }' +
          '</style>'
        let infoWindow = new this.google.maps.InfoWindow({content: infoContent, maxWidth: 200})
        let latLng = new this.google.maps.LatLng(park.lat,park.lng)
        let marker = new this.google.maps.Marker({
        position: latLng,
        });
        this.markers.push(marker)
        marker.setMap(this.map)

        marker.addListener("click", ()=>{
          infoWindow.open({
            anchor: marker,
            map: this.map,
            shouldFocus: false
          })
        })
      }
      document.title = 'MapInfo';
    },
    createInfo(){
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
    }    
  },
  created() {
    this.getParks()
  },
}
</script>

<style scoped>
.parent {
  position: relative;
}

.map {
  width: 100vw;
  height: 90vh;
  position: absolute;
  z-index: 1;
}

.btn {
  position: absolute;
  top: 20px;
  left: 25px;
  z-index: 5;
}
</style>