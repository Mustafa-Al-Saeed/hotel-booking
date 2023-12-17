<template>
      <div class="header fade-in-down-header">
         <h1 class="multicolortext">Hotel Booking Task</h1> 
         <div>
            <RouterLink to="/">
               <button>Home</button>
            </RouterLink>
            <button @click="openSidebarFun" class=" ">My Reservation</button>
         </div>
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
      
   }
   .fade-in-down-header {
   opacity: 0;
   transform: translateY(-50px);
   animation: fadeInDown 0.5s 0s ease-out forwards;
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

   @media(max-width : 768px){
      .header {
         flex-direction: column;
      }
      .header h1 {
         padding-bottom: 20px;
         font-size: 25px;
      }
   }

</style>