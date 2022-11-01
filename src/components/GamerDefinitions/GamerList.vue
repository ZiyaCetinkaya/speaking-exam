<script>
  import convert from "../../helpers/ConvertToMonopolyMoney";
  export default {
    data() {
      return {
        ConvertToMoney: convert.Convert,
      };
    },
    props: ["gamers", "remove"],
  };
  </script>
  
  <template>
    <!-- Kayıtlı Oyuncu Yoksa Uyarı Gösterme -->
    <div v-if="gamers.length <= 0" class="alert alert-danger text-center d-flex flex-column shadow-sm">
      <i class="bi bi-exclamation-octagon fs-1 mb-2"></i>
      <p class="m-0">Henüz hiç oyuncu eklenmemiş...</p>
    </div>
  
    <!-- Kayıtlı Oyuncuları Listeleme -->
    <div v-else class="row justify-content-center">
      <div v-if="gamers" v-for="gamer in gamers" :key="gamer.id" class="col-md-2 col-6 p-1 col-4">
        <div class="card shadow-sm border-0">
          <div class="card-body text-center p-3">
            <h2>{{ gamer.order }}</h2>
            <img :src="`img/${gamer.pawn}`" class="img-fluid mb-2" />
            <h4>{{ gamer.name }}</h4>
            <h5>{{ ConvertToMoney(gamer.amount) }}</h5>
            <button class="btn btn-danger btn-sm mt-2" @click="remove(gamer.id)"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  </template>
  