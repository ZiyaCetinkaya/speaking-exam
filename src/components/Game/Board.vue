<script>
import axios from "axios";

import BoardCell from "./BoardCell.vue";
import NewGameConfirm from "./NewGameConfirm.vue";
import GamerList from "./GamerList.vue";

export default {
  data() {
    return {
      gameBoard: [],
      selectedGamer: null,
      newGameStarting: false,
      selectedCell: null,
    };
  },
  provide() {
    return {
      moveGamer: this.moveGamer,
      setSelectedGamer: this.setSelectedGamer,
    };
  },
  inject: ["setActiveComponent", "newGame", "setGamers"],
  props: ["gamers", "game"],
  methods: {
    setSelectedGamer(gamer) {
      this.selectedGamer = gamer;
    },
    hideNewGameStarting() {
      this.newGameStarting = false;
    },
    generateGameBoard() {
      axios.get(`http://localhost:4000/board`).then((res) => {
        let board = res.data || [];
        board.forEach((cell) => {
          cell.gamers = this.gamers.filter((x) => x.boardCell === cell.id);
        });
        this.gameBoard = board;
      });
    },
    moveGamer(cell) {
      if (cell.gamers.some((x) => x.id === this.selectedGamer.id)) return this.$toast.error(`${this.selectedGamer.name}, zaten bu hücrede...`);

      if (
        (40 + cell.id - this.selectedGamer.boardCell > 12 && cell.id - this.selectedGamer.boardCell < 0) ||
        cell.id - this.selectedGamer.boardCell > 12 ||
        cell.id - this.selectedGamer.boardCell === 1
      )
        return this.$toast.error(`${this.selectedGamer.name}, bu hücreye ilerleyemez...`);

      this.checkGamerPassedStart(cell);
      this.checkGamerOnIncomeTax(cell);

      this.setNewGamerCell(cell.id);
      this.setNextSelectedGamer();
      this.generateGameBoard();
    },
    setNewGamerCell(id) {
      this.selectedGamer = { ...this.selectedGamer, boardCell: id };
      let gamerIndex = this.gamers.findIndex((x) => x.id === this.selectedGamer.id);
      this.gamers[gamerIndex] = this.selectedGamer;
    },
    setNextSelectedGamer() {
      let nextOrder = this.selectedGamer.order === this.gamers.length ? 1 : this.selectedGamer.order + 1;
      this.selectedGamer = this.gamers.filter((x) => x.order === nextOrder)[0];
    },
    checkGamerPassedStart(cell) {
      if (40 + cell.id - this.selectedGamer.boardCell <= 12) {
        this.selectedGamer = { ...this.selectedGamer, amount: this.selectedGamer.amount + 200000 };
        let gamerIndex = this.gamers.findIndex((x) => x.id === this.selectedGamer.id);
        this.gamers[gamerIndex] = this.selectedGamer;

        this.$toast.info(`${this.selectedGamer.name}, başlanıçtan geçtiği için 2M kazandı.`);
      }
    },
    checkGamerOnIncomeTax(cell) {
      if (cell.type == "gelir-vergisi") {
        this.selectedGamer = { ...this.selectedGamer, amount: this.selectedGamer.amount - 200000 };
        let gamerIndex = this.gamers.findIndex((x) => x.id === this.selectedGamer.id);
        this.gamers[gamerIndex] = this.selectedGamer;

        this.$toast.warning(`${this.selectedGamer.name}, 2M gelir vergisi ödedi.`);
      }
    },
  },
  mounted() {
    this.selectedGamer = this.gamers[0];
    this.generateGameBoard();
  },
  components: { BoardCell, NewGameConfirm, GamerList },
};
</script>
  
<template>
  <div class="container-fluid">
    <div class="row d-flex align-items-start justify-content-center py-2" style="height: 98vh">
      <div class="col-md-2 d-flex flex-column justify-content-between pt-3">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <img src="img/monopoly_thanks.png" class="ingame-logo" alt="Monopoly Thanks" />
          <button class="btn btn-danger btn-sm" @click="newGameStarting = true"><i class="bi bi-dice-5 me-2"></i> Yeni Oyun</button>
        </div>
        <GamerList :gamers="gamers" :selectedGamer="selectedGamer" />
        <Transition name="bounce">
          <NewGameConfirm v-if="newGameStarting" :newGame="newGame" :hide="hideNewGameStarting" />
        </Transition>
      </div>
      <div class="col-md-10">
        <div class="h-100 d-flex flex-wrap justify-content-between align-items-center my-2" v-if="gameBoard">
          <BoardCell v-for="cell in gameBoard" :key="cell.id" :cell="cell" :gamers="gamers" :selectedGamer="selectedGamer" />
        </div>
      </div>
    </div>
  </div>
</template>
  