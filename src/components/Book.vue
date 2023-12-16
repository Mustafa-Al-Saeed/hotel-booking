<template>
  <div class="book">
    <div class="image"  :style="{ backgroundImage: `url(/imgs/${hotel?.img})` }">
      <div class="text">
        <h4>{{ hotel?.name  }}</h4>
      </div>
    </div>
  </div>
  <button @click="()=>openCacelPopup(hotel)">Cancel</button>
</template>

<script setup>
import store from '@/store/store';
const props = defineProps({
  hotel:Object
})
const openCacelPopup = ( hotel )=>{
  store.commit("changeDeletePopupState" , true)
  store.commit("updateCurrentHotel" , props.hotel ) 
}
</script>

<style scoped>
.book {
  margin-top: 20px;
}
.image {
  /* background-image: url(../assets//images/3.jpg); */
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 150px;
}

.text h4 {
  padding: 10px;
  margin-top: 0px;
  color: #ffcc00;
  text-align: center;

  background-color: rgba(0, 0, 0, 0.608);
}

button {
  background-color: rgb(35, 35, 35);
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  font-weight: bold;
  border: none;
  color: #ffcc00;
}
</style>
