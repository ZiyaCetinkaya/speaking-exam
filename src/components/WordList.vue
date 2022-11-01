<script>
import WordListItem from "./WordListItem.vue";

export default {
  inject: ["pd", "showWordAdding"],
  components: { WordListItem },
};
</script>


<template>
  <div class="col-lg-6 col-md-6 col-12 mb-2">
    <div class="row" v-if="pd.learnedWords.length > 0">
      <div class="col-12 mb-2 d-flex justify-content-end">
        <button class="btn btn-outline-dark btn-sm mx-1 mt-4" @click="showWordAdding()"><i class="bi bi-plus-lg me-2"></i>Add Word</button>
      </div>
      <div class="col-12">
        <ul class="list-group">
          <li class="list-group-item" v-for="word in pd.learnedWords" :key="word.id">
            <WordListItem :word="word"/>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="alert alert-warning d-flex flex-column align-items-center justify-content-center mt-4 py-5">
      <i class="bi bi-card-list fs-1 mb-2"></i>
      <h4>Your word list is empty.</h4>
      <button class="btn btn-outline-dark btn-sm mx-1 mt-4" @click="showWordAdding()"><i class="bi bi-plus-lg me-2"></i>Add One</button>
    </div>
  </div>
</template>