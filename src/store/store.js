import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      hotels: [
        {
          id: 1,
          name: "Hotel A",
          address: "123 Main St",
          rating: 4,
          img: "1.jpg",
          isBooked: false,
        },
        {
          id: 2,
          name: "Hotel B",
          address: "456 Oak St",
          rating: 3,
          img: "2.jpg",
          isBooked: false,
        },
        {
          id: 3,
          name: "Hotel C",
          address: "789 Pine St",
          rating: 5,
          img: "3.jpg",
          isBooked: false,
        },
        {
          id: 4,
          name: "Hotel D",
          address: "101 Elm St",
          rating: 2,
          img: "4.jpg",
          isBooked: false,
        },
        {
          id: 5,
          name: "Hotel E",
          address: "202 Maple St",
          rating: 3,
          img: "5.jpg",
          isBooked: false,
        },
        {
          id: 6,
          name: "Hotel F",
          address: "303 Birch St",
          rating: 5,
          img: "6.jpg",
          isBooked: false,
        },
      ],
      sidebarState: false,
      deletePopupState: false,
      reservedHotels: [],
      currentHotel: {},
    };
  },
  getters: {
    getHotels(state) {
      return state.hotels;
    },
    getSidebarState(state) {
      return state.sidebarState;
    },
    getDeletePopupState(state) {
      return state.deletePopupState;
    },
    getReservedHotels(state) {
      return state.reservedHotels;
    },
    getCurrentHotel(state) {
      return state.currentHotel;
    },
  },

  mutations: {
    updateCurrentHotel(state, payload) {

      state.currentHotel = payload;
      

    },
    toggleSidebar(state, payload) {
      state.sidebarState = payload;
    },
    changeBookedState(state, payload) {
      state.hotels = state.hotels.map((item) => {
        if (item?.id == payload?.id) {
          item.isBooked = payload?.isBooked;
        }
        return item;
      });
    },
    changeDeletePopupState(state, payload) {
      state.deletePopupState = payload;
      console.log("payload", payload);
    },
    addReservedHotel(state, payload) {
      state.reservedHotels.push(payload?.hotel);

      // add to local storage
      if( !payload.isInit){
        let reservedHotelsLocStorage = localStorage.getItem("reserved-hotels");
        let reservedArr = JSON.parse(reservedHotelsLocStorage);
  
        if (reservedArr && reservedArr?.length) {
  
          reservedArr.push(payload?.hotel);
          localStorage.setItem("reserved-hotels", JSON.stringify(reservedArr));
        } else {
          localStorage.setItem("reserved-hotels", JSON.stringify([payload?.hotel]));
        }
      }else{
        console.log("dfg")
      }

    },

    

    canselReservation(state, payload) {
      console.log("hi")
      console.log("pay" , payload)
      state.reservedHotels = state.reservedHotels.filter((item) => {
        return item.id != payload;
      });

      // remove from the localstorage

      let reservedHotels = localStorage.getItem("reserved-hotels");
      if (reservedHotels) {
        let reservedArr = JSON.parse(reservedHotels);

        reservedArr = reservedArr.filter((ele) => {
          return ele?.id != payload;
        });
        localStorage.setItem("reserved-hotels", JSON.stringify(reservedArr));
      }
    },
  },

});
export default store;
