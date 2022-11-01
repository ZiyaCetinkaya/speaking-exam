<script>
import convert from "../../helpers/ConvertToMonopolyMoney";
export default {
  data() {
    return {
      ConvertToMoney: convert.Convert,
    };
  },
  inject: ["moveGamer"],
  props: ["cell", "gamers", "selectedGamer"],
  methods: {},
  mounted() {},
  computed: {
    cellBG() {
      return (40 + this.cell.id - this.selectedGamer.boardCell <= 12 || this.cell.id - this.selectedGamer.boardCell > 1) && this.cell.id - this.selectedGamer.boardCell <= 12 ? "bgNextCell" : "";
    },
    cellTitle() {
      return this.cell.title ? this.cell.title : this.cell.type;
    },
  },
};
</script>
  
<template>
  <div class="gameCard" @click="moveGamer(cell)">
    <div class="card-body" :class="cellBG">
      <div class="w-100 d-flex justify-content-between align-items-center bg-light p-1">
        <span class="fs-12">{{ cellTitle }}</span>
        <span v-if="cell.value" class="fs-14">{{ ConvertToMoney(cell.value) }}</span>
      </div>
      <span v-if="cell.owner">{{ cell.owner.name }}</span>
      <div v-if="cell" class="w-100 d-flex justify-content-center flex-wrap">
        <img v-for="gamer in cell.gamers" :key="gamer.id" :src="`img/${gamer.pawn}`" style="height: 40px" :class="selectedGamer.id === gamer.id ? 'selectedGamerPawn' : ''" />
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.selectedGamerPawn {
  outline: rgba(255, 0, 0, 0.6) solid 3px;
  border-radius: 4px;
  padding: 3px;
  background-color: rgba(255, 0, 0, 0.6);
}
</style>
  