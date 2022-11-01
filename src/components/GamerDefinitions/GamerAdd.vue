<script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        newGamerName: null,
        newGamerOrder: null,
        newGamerPawn: null,
        pawns: [],
      };
    },
    props: ["getGamers", "hide"],
    methods: {
      getPawns() {
        axios.get("http://localhost:4000/pawns?_sort=name").then((res) => {
          this.pawns = res.data || [];
        });
      },
      save() {
        if (this.newGamerName && this.newGamerOrder && this.newGamerPawn) {
          axios
            .post("http://localhost:4000/gamers", {
              name: this.newGamerName,
              order: this.newGamerOrder,
              amount: 1500000,
              pawn: this.newGamerPawn,
              boardCell: 1,
            })
            .then((res) => {
              this.getGamers();
              this.hide();
            });
          this.newGamerName = null;
          this.newGamerOrder = null;
          this.newGamerPawn = null;
        }
      },
    },
    mounted() {
      this.getPawns();
    },
  };
  </script>
  
  <template>
    <div class="modal modal-sm d-block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow-lg">
          <div class="modal-body px-5 py-4">
            <div class="w-100 d-flex justify-content-center align-items-center flex-column pb-1">
              <i class="bi bi-plus-square fs-1"></i>
              <h6 class="card-title">Yeni Oyuncu Ekle</h6>
            </div>
            <hr />
            <div class="row">
              <div class="col">
                <div class="form-group mb-2">
                  <input type="number" class="form-control form-control-sm" placeholder="Sıra" v-model="newGamerOrder" />
                </div>
                <div class="form-group mb-2">
                  <select v-model="newGamerPawn" class="form-select form-select-sm" v-if="pawns">
                    <option v-for="pawn in pawns" :value="pawn.image" :key="pawn.id">{{ pawn.name }}</option>
                  </select>
                </div>
                <div class="form-group mb-2">
                  <input type="text" class="form-control form-control-sm" placeholder="Oyuncu adı" v-model="newGamerName" @keydown.enter="save()" />
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <button class="btn btn-primary btn mt-3 mx-2" @click="save()"><i class="bi bi-check-lg fs-5"></i></button>
              <button class="btn btn-danger btn mt-3 mx-2" @click="hide()"><i class="bi bi-x-lg fs-5"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  