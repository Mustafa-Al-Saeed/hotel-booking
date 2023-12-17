    <template>
        <CancelPopup v-if="cancelPopupState" :currentHotel="hotel" @closeCancelPopup="closeCancelPopup" />

        <div>
            <ReservationPopupVue v-if="showBookingForm" :currentHotel="hotel" @closePopup="closeReservationPopup" />
        </div>
        <div class="fade-in-down">
            <div class="details">
                <div class="leftSide">
                    <div class="image" :style="{ backgroundImage: `url(/imgs/${hotel.img})` }"></div>
                </div>
                
                <div class="rightSide">
                    <h2>{{hotel.name}}</h2>
                    <p class="address">{{ hotel.address }}</p>

                    <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam enim praesentium dicta accusantium repellendus est nihil animi rerum officiis tenetur. Unde iste dolore consequuntur consectetur voluptatum libero quidem eos dicta!</p>

                    <p class="rate"><RatingCom :rating="hotel.rating" /></p>
                    <button v-if="!hotel?.isBooked" @click="openReservationPopup" class="booking">Book</button>

                    <button @click="()=>openCancelPopup()" v-else class="cancel btn ">
                        cancel
                    </button>
                </div>
            </div>
        </div>
    </template>
    
    <script setup>

        import { useRoute } from 'vue-router';
        import store from "@/store/store";
        import {  ref , computed} from "vue";
        import CancelPopup from '@/components/popups/CancelPopup.vue';
        import ReservationPopupVue from "../components/popups/ReservationPopup.vue";
        import RatingCom from "../components/RatingCom.vue";

        const cancelPopupState =ref(false)
        const showBookingForm = ref(false);

        const route = useRoute();
        const id = route.params.id;

        const hotels = computed(()=> store.getters.getHotels);
        const hotel = computed(()=>  hotels.value.find(hotel => hotel.id === parseInt(id)))

        //functions
        const openCancelPopup = (  ) => {
            cancelPopupState.value =true
        }
        
        const closeCancelPopup = ( ) => {
            cancelPopupState.value =false
        }

        const closeReservationPopup = () => {
            showBookingForm.value = false;
        };

        const openReservationPopup = (hotel) => {
            showBookingForm.value = true;
        };

    </script>
    
    <style scoped>
        .details {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            max-width: 1400px;
            margin: auto ;
        }
        .image {
            background-size: cover;
            background-position: center;
            width: 100%;
            height: 350px;
            border-radius: 20px;
            box-shadow: 0 0 10px 0px #818181
        }
        .leftSide {
            width: 50%;
        }

        .rightSide {
            width: 50%;
            padding: 0 25px ;
            text-align: right;
        }

        .rightSide .description {
            line-height: 1.6;
        }

        button {
            width: 30%;
        }
        .rightSide h2 {
            padding: 20px 0;
            color: gold;
        }

        .rightSide .address {
            padding: 10px 0;
        }

        .rate {
            margin: 20px 0;
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

        @media(max-width : 768px){
            .details {
                flex-direction: column;
            }

            .leftSide {
                width: 100%;
            }

            .rightSide {
                width: 100%;
                padding-left: 0;
                text-align: center;
            }
        }
    </style>