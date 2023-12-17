<template>
  <CancelPopup v-if="cancelPopupState" :currentHotel="currentHotel" @closeCancelPopup="closeCancelPopup" />
  <ReservationPopupVue v-if="showBookingForm" :currentHotel="currentHotel" @closePopup="closeReservationPopup" />
    

  <div class="hotelsContainer">

    <div class="header fade-in-down-header"></div>
    <ul class="fade-in-down">
      <li v-for="( hotel , idx ) in hotels" :key="idx">
        <div @click="(e)=>getHotelDetailsLink(e ,hotel.id)">
          <div class="cardCont">
            <div class="imgCont">
              <div class="imgOverlay">
                <h2 class="name">{{ hotel.name }}</h2>

                <div
                  class="imgHolder"
                  :style="{ backgroundImage: `url(/imgs/${hotel.img})` }"
                ></div>
              </div>
              <div class="info">
                <div class="address">
                  <p>{{ hotel.address }}</p>
                  <p><RatingCom :rating="hotel.rating" /></p>
                </div>
                <button v-if="!hotel?.isBooked" class="booking btn" @click="openReservationPopup(hotel)">
                  Book
                </button>
                <button @click="()=>openCancelPopup(hotel)" v-else class="cancel btn">
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import store from "@/store/store";
import {  ref , computed} from "vue";
import { useRouter } from "vue-router";
//components
import ReservationPopupVue from "../components/popups/ReservationPopup.vue";
import RatingCom from "../components/RatingCom.vue";
import CancelPopup from "@/components/popups/CancelPopup.vue";

//declarations
const hotels = computed(()=> store.getters.getHotels);
const router  = useRouter()
const showBookingForm = ref(false);
const currentHotel = ref({})
const cancelPopupState =ref(false)

//functions
const openCancelPopup = ( hotel ) => {
  cancelPopupState.value =true
  currentHotel.value = hotel
}

const closeCancelPopup = ( ) => {
  cancelPopupState.value =false
}

const getHotelDetailsLink = (e,id) => {

  if(!e.target.closest('.btn')){
  router.push(`/details/${id}`)
  }
  
  }

const openReservationPopup = (hotel) => {
  currentHotel.value = hotel
  showBookingForm.value = true;
};

const closeReservationPopup = () => {
  showBookingForm.value = false;
};
</script>

<style>

.hotelsContainer{
  max-width: 1400px;
  margin: auto;
  display:flex;
  flex-direction: column;
}
.hotelsContainer ul li {
  width: 30%;
  margin: 1rem;
  min-width: 300px;
  max-width: 90%;
  color: #fff;
}

.hotelsContainer ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;
}
.imgCont {
  background-color: #292929;
  overflow: hidden;
  padding: 1rem;
  border-radius: 0.7rem;
  border: 1px solid #5a5a5a;
  box-shadow: 0 0 10px 0px #818181;
}
.imgOverlay {
  margin-bottom: 1rem;
  border-radius: 0.7rem;
  overflow: hidden;
  position: relative;
}

.imgOverlay .name {
  position: absolute;
}

.imgHolder {
  overflow: hidden;
  height: 300px;
  background-size: cover;
  background-position: center center;
  border-radius: 0.7rem;
}
.cardCont:hover .imgHolder {
  transform: scale(1.1);
  transition: 1s;
}

h2.name {
  position: absolute;
  z-index: 10;
  background: #08080880;
  right: 0;
  padding: 5px;
  top: 1.5rem;
  color: gold;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.booking , .cancel {
  padding: 10px 20px;
  border-radius: 0.7rem;
  font-size: 1rem;
  cursor: pointer;
  background: #292929;
}
.booking{
  color: gold;
  border: 1px solid gold;
    box-shadow: 0 0 5px 1px inset #99988e;

}
.cancel{
  color: #a70000;
  border: 1px solid #a70000;
    box-shadow: 0 0 5px 1px inset #99988e;
}

.booking:hover , .cancel:hover {
  border: 1px solid white;
  color: white;
  box-shadow: 0 0 5px 1px gray;
}


.fade-in-down {
  opacity: 0;
  transform: translateY(-50px);
  animation: fadeInDown 1s 0.5s ease-out forwards;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/**************  form  *********** */

.formCont {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #fafafa78;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit {
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  font-size: 1.1rem;
  cursor: pointer;
  border: 1px solid gold;
  background: #292929;
  color: gold;
  margin-top: 1rem;
}

.form {
  background: black;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}

.submit:hover {
  border: 1px solid #fff;
  color: #fff;
  box-shadow: 0 0 5px 1px white;
}

.inputWrapper input {
  width: 100%;
  padding: 10px;
  border-radius: 0.7rem;
  background: #292929;
  color: #fff;
}

.inputWrapper label {
  width: 100px;
  display: flex;
  margin-bottom: 10px;
}
.inputWrapper {
  margin-bottom: 16px;
  width: 100%;
}

.form h3 {
  font-size: 1.5rem;
  color: gold;
  border-bottom: 1px solid;
  padding: 15px 0;
  margin-bottom: 2rem;
}
</style>
