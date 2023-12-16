<template>
    <!-- v-if="selectedHotel" -->
    <div class="fade-in-down">
        <div class="details">
            <div class="leftSide">
                <div class="image">{{ $route.params.id }}</div>
                <button>sssssssss</button>
            </div>

            <div>
                <h2></h2>
                <p></p>
                <span></span>
            </div>
        </div>
    </div>
    </template>
    
    <script setup>
        import store from "@/store/store";
        import {  ref , computed} from "vue";
        const hotels = computed(()=> store.getters.getHotels);
        console.log(hotels.value[0])

        const hotelWithId3 = hotels.find(hotel => hotel.id === route.params.id);
        console.log(hotelWithId3)

        // const hotelId = this.$route.params.id;
        // console.log(hotelId)
    </script>
    
    <style scoped>

    </style>