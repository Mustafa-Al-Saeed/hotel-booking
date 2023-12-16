<template>

    <div class="header">
        <h1 class="multicolortext">Hotel Booking Task</h1> 
        <button @click="openSidebarFun" class=" ">My Reservation</button>
    </div>
</template>

<script setup>
import store from '@/store/store';


const openSidebarFun = ( ) =>{

   store.commit('toggleSidebar' , true )
}

</script>

<style scoped>
     .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 80%;
        padding: 1rem;
        margin:2rem auto 3rem;
        border-bottom: 1px solid gold;
        /* box-shadow: 0 0 5px 5px gold; */
        
 }

 .header button {
    position: relative;
    padding: 0.5rem;
    background: transparent;
    color: gold;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    margin:0 0.5rem
 }
 .header button:hover {
    position: relative;
    padding: 0.5rem;
    background: gold;
    color: black;
 
 }


  .multicolortext {
        background-image:linear-gradient(to left,   yellow, orange, #ff5200);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        color: transparent;
      }

</style>