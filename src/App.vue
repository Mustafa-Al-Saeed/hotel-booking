<template>
  <HeaderCom />
  <SideBar />
  <CancelPopup v-if="cancelPopupState" />
  <RouterView />
  <FooterCom />
</template>

<script setup>
import HeaderCom from "./components/generic/HeaderCom.vue";
import FooterCom from "./components/generic/FooterCom.vue";
import SideBar from "./components/generic/SideBar.vue";
import CancelPopup from "./components/popups/CancelPopup.vue";

import store from "./store/store";
import { computed, onBeforeMount } from "vue";

const cancelPopupState = computed(() => store.getters.getDeletePopupState);


// set the reserved hotels from the localstorage to the store
onBeforeMount(()=>{
  let reservedHotels = localStorage.getItem("reserved-hotels");
  let reservedArr = JSON.parse(reservedHotels) || [];
  if(reservedArr && reservedArr.length){
    reservedArr.forEach((item)=>{
      store.commit('changeBookedState' , {id:item?.id , isBooked:true})
        store.commit('addReservedHotel' ,{ hotel: item , isInit:true} )
    })
  }

})
</script>

<style></style>
