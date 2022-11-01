<script>
  import axios from "axios";
  
  import Landing from "./components/Landing.vue";
  import SaveGamers from "./components/GamerDefinitions/SaveGamers.vue";
  import Board from "./components/Game/Board.vue";
  import Loading from "./components/Loading.vue";
  
  export default {
    data() {
      return {
        activeComponent: "Loading",
        gamers: [],
        game: null,
      };
    },
    provide() {
      return {
        setActiveComponent: this.setActiveComponent,
        getGamers: this.getGamers,
        setGamers: this.setGamers,
        clearGamers: this.clearGamers,
        newGame: this.newGame,
      };
    },
    methods: {
      setActiveComponent(component) {
        this.activeComponent = component;
      },
      async getGamers() {
        await axios.get("http://localhost:4000/gamers?_sort=order").then((res) => {
          this.gamers = res.data || [];
        });
      },
      setGamers(gamers) {
        this.gamers = gamers;
      },
      async clearGamers() {
        await this.getGamers().then(() => {
          this.gamers.forEach((gamer) => {
            axios.delete(`http://localhost:4000/gamers/${gamer.id}`).then(() => this.getGamers());
          });
        });
      },
      async getGame() {
        await axios.get("http://localhost:4000/games").then((res) => {
          this.activeComponent = res.data.length > 0 ? "Board" : "Landing";
          this.game = res.data[0];
        });
      },
      async clearGame() {
        await this.getGame().then((res) => {
          axios.delete(`http://localhost:4000/games/${this.game.id}`).then(() => this.getGame());
        });
      },
      async clearBoard() {
        await axios.get(`http://localhost:4000/board`).then((res) => {
          res.data.forEach((cell) => {
            axios.put(`http://localhost:4000/board/${cell.id}`, { ...cell, gamers: [] });
          });
        });
      },
      newGame() {
        this.setActiveComponent("Loading");
        this.clearBoard().then(() => {
          this.clearGamers().then(() => {
            this.clearGame().then(() => {
              this.setActiveComponent("Landing");
            });
          });
        });
      },
    },
    components: { Landing, SaveGamers, Board, Loading },
    mounted() {
      this.getGame();
      this.getGamers();
    },
  };
  </script>
  
  <template>
    <Transition name="fade" mode="out-in" duration="200">
      <component :is="activeComponent" :gamers="gamers" :game="game" />
    </Transition>
  </template>
  
  <style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>
  