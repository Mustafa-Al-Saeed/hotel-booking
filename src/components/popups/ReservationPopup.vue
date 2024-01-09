<template>
  <div>
    <div class="formCont" @click="closePopup">
      <div v-if="!isSubmited" class="form">
        <h3>Create Reservation for {{ currentHotel?.name }}</h3>
        <form @submit.prevent="submitReservation">
          <div class="inputWrapper">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="state.name" />
            <p v-if="errors.name.state" class="err-msg">
              {{ errors.name.message }}
            </p>
          </div>

          <div>change branch</div>

          <div class="inputWrapper">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="state.email" />
            <p v-if="errors.email.state" class="err-msg">
              {{ errors.email.message }}
            </p>
          </div>
          <div class="inputWrapper">
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" v-model="state.phone" />
            <p v-if="errors.phone.state" class="err-msg">
              {{ errors.phone.message }}
            </p>
          </div>
          <button type="submit" class="submit">Submit</button>
        </form>
      </div>
      <div class="success-msg" v-else>
        <h2>Thank you for booking with us!</h2>
        <!-- <div>
        <p>You have been booked into the <span>  {{ currentHotel?.name  }} </span> hotel </p>

      </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
} from "@vuelidate/validators";
import store from "@/store/store";

const emit = defineEmits(["closePopup"]);
const props = defineProps({
  currentHotel: Object,
});

// declarations
const isSubmited = ref(false);

// close popup function
const closePopup = (e) => {
  const overLay = document.getElementsByClassName("formCont")[0];
  if (e.target === overLay) {
    emit("closePopup");
  }
};

// form state and validation
const state = reactive({
  name: "",
  email: "",
  phone: "",
});

const errors = reactive({
  name: {
    message: "Please, add your full name",
    state: false,
  },
  email: {
    message: "Please, add your Email",
    state: false,
  },
  phone: {
    message: "Please, add a vaild phone number",
    state: false,
  },
});

const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    phone: {
      required,
      minLength: minLength(7),
      maxLength: maxLength(11),
      numeric,
    },
  };
});

const v$ = useVuelidate(rules, state);

// submit form
const submitReservation = async () => {
  // remove the errors to revalidate the form
  errors.name.state = false;
  errors.email.state = false;
  errors.phone.state = false;

  // triger the validation
  const result = await v$.value.$validate();
  if (result) {
    store.commit("changeBookedState", {
      id: props.currentHotel?.id,
      isBooked: true,
    });
    // store.commit('addReservedHotel' , props.currentHotel )
    store.commit("addReservedHotel", {
      hotel: props.currentHotel,
      isInit: false,
    });

    isSubmited.value = true;
    setTimeout(() => {
      emit("closePopup");
    }, 2500);
  } else {
    // set errors messages
    errors.name.state = v$.value.name.$error;
    errors.email.state = v$.value.email.$error;
    errors.phone.state = v$.value.phone.$error;
  }
};
</script>

<style>
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
  /* font-weight: bold; */
  font-size: 1.1rem;
  cursor: pointer;
  border: 1px solid gold;
  background: #292929;
  color: gold;
  margin-top: 1rem;
}

.form,
.success-msg {
  background: black;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}
.success-msg {
  /* height: 310px; */
}
.success-msg > div {
  padding-top: 80px;
  text-align: center;
}
.success-msg > div span {
  font-weight: bold;
  color: gold;
}
.success-msg > h2 {
  text-align: center;
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
  /* font-weight: bold; */
  margin-bottom: 10px;
}

.inputWrapper .err-msg {
  text-align: center;
  color: #a70000;
  padding-top: 5px;
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
