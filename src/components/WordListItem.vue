<script>
import enFlag from "@/assets/images/en.png";
import trFlag from "@/assets/images/tr.png";

export default {
  props: ["word"],
  inject: ["selectWord"],
  data() {
    return {
      enFlag: enFlag,
      trFlag: trFlag,
    };
  },
};
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex justify-content-between align-items-center flex-fill">
      <img :src="trFlag" class="icon" />
      <div class="d-flex">
        <span>{{ word.tr }}</span>
        <div class="mx-3">
          <i class="bi bi-arrow-bar-left"></i>
          <i class="bi bi-arrow-bar-right"></i>
        </div>
        <span>{{ word.en }}</span>
      </div>
      <img :src="enFlag" class="icon" />
    </div>
    <div class="w-25 d-flex justify-content-end">
      <button class="btn btn-warning btn-sm mx-1 p-0 px-1" @click="selectWord(word.id, 'update')"><i class="bi bi-pencil-square"></i></button>
      <button class="btn btn-danger btn-sm mx-1 p-0 px-1" @click="selectWord(word.id, 'delete')"><i class="bi bi-trash"></i></button>
    </div>
  </div>
</template>