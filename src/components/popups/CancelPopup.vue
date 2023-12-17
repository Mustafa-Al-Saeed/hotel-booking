<template>
  <div>
    <div class="formCont" @click="closePopup">
      <div v-if="!isSubmited" class="form">
        <h3>Cancel Reservation for {{ currentHotel?.name }}</h3>
        <p>Are you sure to cancel your hotel reservation ?</p>
        <form @submit.prevent="submitCancelResevation">
          <div class="btn-holder">
            <span @click="closeAction" type="submit" class="close">close</span>
            <button type="submit" class="submit">Submit</button>
          </div>
        </form>
      </div>
      <div class="success-msg" v-else>
        <h2>   The booking on <span> {{ currentHotel?.name }} </span> has been canceled
              successfully</h2>
    
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    currentHotel: Object
  });
  const emit = defineEmits(['closeCancelPopup'])

import { computed, reactive, ref } from "vue";
import store from "@/store/store";

// declarations
const isSubmited = ref(false);

// close popup function
const closeAction = ( ) =>{
    emit('closeCancelPopup')
}
const closePopup = (e) => {
  const overLay = document.getElementsByClassName("formCont")[0];
  if (e.target === overLay) {
    closeAction()
  }
};
// cancel reservation
const submitCancelResevation = () => {
    store.commit("canselReservation",props.currentHotel?.id );
    store.commit('changeBookedState' , {id:props.currentHotel?.id , isBooked:false});

    isSubmited.value = true

    setTimeout(()=>{
    closeAction()
    isSubmited.value = false

    },2500)
};
</script>

<style scoped>
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
.btn-holder {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.submit,
.close {
  text-align: center;
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  font-size: 1.1rem;
  cursor: pointer;
  background: #292929;
  margin-top: 1rem;
  width: 85px;
}
.close {
  border: 1px solid gold;

  color: gold;
}
.submit {
  border: 1px solid #a70000;

  color: #a70000;
}

.form,
.success-msg {
  background: black;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}
.success-msg > div {
  padding-top: 50px;
  text-align: center;
}
.success-msg > div span {
  font-weight: bold;
  color: gold;
}

.submit:hover,
.close:hover {
  border: 1px solid #fff;
  color: #fff;
  box-shadow: 0 0 5px 1px white;
}

.form h3 {
  font-size: 1.5rem;
  color: gold;
  border-bottom: 1px solid;
  padding: 15px 0;
  margin-bottom: 2rem;
  text-align: center;
}

.form p {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
