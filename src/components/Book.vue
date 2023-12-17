<template>
  <CancelPopup v-if="cancelPopupState" :currentHotel="currentHotel" @closeCancelPopup="closeCancelPopup" />

  <div class="book">
    <div class="image"  :style="{ backgroundImage: `url(/imgs/${hotel?.img})` }">
      <div class="text">
        <h4>{{ hotel?.name  }}</h4>
      </div>
    </div>
  </div>
  <button @click="()=>openCancelPopup(hotel)">Cancel</button>
</template>

<script setup>
import store from '@/store/store';
import { computed, ref } from "vue";
import CancelPopup from './popups/CancelPopup.vue';
const props = defineProps({
  hotel:Object
})
const currentHotel =ref({})
const cancelPopupState =ref(false)

// functions 
const openCancelPopup = ( hotel ) => {
  cancelPopupState.value =true
  currentHotel.value = hotel
}

const closeCancelPopup = ( ) => {
  cancelPopupState.value =false
}

</script>

<style scoped>
.book {
  margin-top: 20px;
}
.image {
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
  background-color: rgb(68 68 68);
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  font-weight: bold;
  border: none;
  color: #ffcc00;
}
</style>
