<template>
  <div class="book">
    <div class="image"  :style="{ backgroundImage: `url(/imgs/${hotel?.img})` }">
      <div class="text">
        <h4>{{ hotel?.name  }}</h4>
      </div>
    </div>
  </div>
  <button @click="()=>openCancelPopupFun()">Cancel</button>
</template>

<script setup>

const props = defineProps({
  hotel:Object
})

const emit = defineEmits(['openCancelPopup'])

const openCancelPopupFun = ( ) => {
  emit('openCancelPopup' , props.hotel)
}


</script>

<style scoped>
.book {
  margin-top: 20px;
}
.image {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 150px;
}

.text h4 {
  padding: 10px;
  margin-top: 0px;
  color: #ffcc00;
  text-align: center;

  background-color: rgba(0, 0, 0, 0.608);
}

button {
  background-color: rgb(68 68 68);
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  font-weight: bold;
  border: none;
  color: #ffcc00;
}
</style>
