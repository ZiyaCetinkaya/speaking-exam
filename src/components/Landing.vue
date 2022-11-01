<script>
  export default {
    inject: ["setActiveComponent", "getGamers"],
    data() {
      return {};
    },
    props: ["gamers"],
    methods: {
      async save() {
        this.setActiveComponent("SaveGamers");
      },
    },
  };
  </script>
  <template>
    <div class="container">
      <div class="row justify-content-center py-5">
        <div class="col-md-6 text-center">
          <!-- <img src="img/monopoly_thanks.png" class="logo" alt="Monopoly Thanks" /> -->
          <h1>Monopoly Game Play</h1>
          <div class="card mt-4 shadow">
            <div class="card-body">
              <div class="row justify-content-center">
                <div class="col-12 text-center py-3">
                  <p class="fs-5 mb-5">Monopoly oyun içi takip uygulamasına hoş geldiniz...</p>
                  <button class="btn btn-primary px-3" @click="setActiveComponent('SaveGamers')"><i class="bi bi-dice-5 me-3"></i>OYUNA BAŞLA</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .logo {
    height: 200px;
    margin-bottom: 30px;
  }
  </style>