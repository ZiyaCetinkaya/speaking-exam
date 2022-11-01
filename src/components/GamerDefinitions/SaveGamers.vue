<script>
  import axios from "axios";
  
  import Landing from "../Landing.vue";
  import GamerList from "./GamerList.vue";
  import GamerAdd from "./GamerAdd.vue";
  import GamerRemoveAll from "./GamerRemoveAll.vue";
  import Board from "../Game/Board.vue";
  
  export default {
    data() {
      return {
        newGamerAdding: false,
        allGamersRemoving: false,
      };
    },
    components: { Landing, GamerList, GamerAdd, GamerRemoveAll, Board },
    inject: ["setActiveComponent", "getGamers", "clearGamers"],
    props: ["gamers", "game"],
    methods: {
      showNewGamerAdding() {
        this.newGamerAdding = true;
        this.allGamersRemoving = false;
      },
      showAllGamersRemoving() {
        this.newGamerAdding = false;
        this.allGamersRemoving = true;
      },
      hideNewGamerAdding() {
        this.newGamerAdding = false;
      },
      hideAllGamersRemoving() {
        this.allGamersRemoving = false;
      },
      remove(id) {
        if (id) {
          axios.delete(`http://localhost:4000/gamers/${id}`).then((res) => {
            this.getGamers();
          });
          this.newGamerAdding = false;
          this.allGamersRemoving = false;
        }
      },
      removeAll() {
        this.clearGamers();
        this.newGamerAdding = false;
        this.allGamersRemoving = false;
      },
      newGame() {
        if (this.gamers.length <= 0) return this.$toast.error(`Oyuncu ekleyiniz...`);
        axios.post("http://localhost:4000/games", { selectedGamer: this.gamers[0] }).then((res) => {
          this.setActiveComponent("Board");
        });
      },
    },
    mounted() {
      this.getGamers();
    },
  };
  </script>
  
  <template>
    <div class="container">
      <div class="row justify-content-center py-5">
        <div class="col-md-8">
          <div class="d-flex w-100 justify-content-center">
            <img src="img/monopoly_thanks.png" class="ingame-logo" alt="Monopoly Thanks" />
          </div>
          <div class="card mt-4 shadow">
            <div class="card-body p-5">
              <p class="fs-5">Oyuncuları oynama sırasına dikkat ederek yazınız.</p>
  
              <GamerList :gamers="gamers" :remove="remove" />
              <hr />
              <div class="row">
                <div class="col-12 d-flex justify-content-between">
                  <button class="btn btn-danger btn-sm mx-1" v-if="gamers.length > 0" @click="showAllGamersRemoving()"><i class="bi bi-trash me-2"></i>Tüm Oyuncuları Sil</button>
                  <button class="btn btn-primary btn-sm mx-1" @click="showNewGamerAdding()"><i class="bi bi-plus-lg me-2"></i>Yeni Oyuncu Ekle</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row py-4">
            <div class="col-12 text-center">
              <button class="btn btn-dark px-5" @click="newGame()"><i class="bi bi-dice-5 me-3"></i>OYUNA BAŞLA</button>
            </div>
          </div>
        </div>
      </div>
      <Transition name="bounce">
        <!-- Yeni Oyuncu Ekleme -->
        <GamerAdd v-if="newGamerAdding" :getGamers="getGamers" :hide="hideNewGamerAdding" />
      </Transition>
      <Transition name="bounce">
        <!-- Tüm Oyuncuları Silme İçin Onay Alma -->
        <GamerRemoveAll v-if="allGamersRemoving" :removeAll="removeAll" :hide="hideAllGamersRemoving" />
      </Transition>
    </div>
  </template>
  