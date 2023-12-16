<template>
  <div
    @click="closeSidebarFun"
    :class="`sidebar-overlay ${!isOpen ? 'hidden' : ''}`"
  ></div>
  <div :class="`sideBar ${!isOpen ? 'closed' : ''}`">
    <h2>My Booking</h2>

    <div v-if="reservedHotels?.length">
      <div v-for="(hotel, idx) in reservedHotels" :key="idx">
        <Book :hotel="hotel" />
      </div>
    </div>

    <div  v-if="!reservedHotels?.length" class="no-reserved">
      There are no reservations on this list
    </div>
  </div>
</template>

<script setup>
import Book from "../Book.vue";
import store from "@/store/store";
import { computed, ref } from "vue";

const isOpen = computed(() => store.getters.getSidebarState);
const reservedHotels = computed(() => store.getters.getReservedHotels);

const closeSidebarFun = () => {
  store.commit("toggleSidebar", false);
};


</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background: #fafafa78;
}
.sidebar-overlay.hidden {
  display: none;
}
.sideBar {
  background-color: #ffffff;
  height: 100vh;
  width: 310px;
  transition: 0.7s ease;
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  padding: 20px;
  overflow: auto;
}
.sideBar.closed {
  right: -310px;
}

h2 {
  margin: 0;
  padding-bottom: 20px;
  text-align: center;
  border-bottom: 1px solid gray;
  color: #000;
}
.no-reserved{
  color: #000;
  padding-top: 30px;
  text-align: center;
}
</style>
