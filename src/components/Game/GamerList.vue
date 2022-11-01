<script>
import convert from "../../helpers/ConvertToMonopolyMoney";
export default {
  data() {
    return {
      ConvertToMoney: convert.Convert,
    };
  },
  props: ["selectedGamer", "gamers"],
  inject: ["setSelectedGamer"],
  mounted() {},
};
</script>

<template>
  <div class="row my-4 rounded-end" v-if="selectedGamer">
    <div class="col-12 d-flex flex-column align-items-center justify-content-center p-2">
      <div class="card w-100 shadow-sm border-0 my-1" v-for="gamer in gamers" :class="selectedGamer.id == gamer.id ? 'bg-danger text-light shadow' : 'bg-light shadow'" :key="gamer.id">
        <div class="card-body p-2" @click="setSelectedGamer(gamer)" style="cursor: pointer">
          <div class="row">
            <div class="col d-flex align-items-center">
              <img :src="`img/${gamer.pawn}`" class="" style="height: 50px" />
              <div class="px-3">
                <h5 class="m-0 p-0">{{ gamer.name }}</h5>
                <h4 class="m-0 p-0">{{ ConvertToMoney(gamer.amount) }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
