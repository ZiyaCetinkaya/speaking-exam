<script>
export default {
  data() {
    return {
      filterDegree: 0,
      randomSentence: null,
    };
  },
  methods: {
    getRandomSentence() {
      this.randomSentence = this.sentenceList[Math.floor(Math.random() * this.sentenceList.length)];
    },
  },
  computed: {
    degrees() {
      return this.$store.getters._degrees;
    },
    sentenceList() {
      if (this.filterDegree > 0) return this.$store.getters._filteredSentenceList(this.filterDegree);
      else return this.$store.getters._sentenceList;
    },
  },
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="card rounded-0 shadow">
        <div class="card-body">
          <div class="d-flex justify-content-center align-items-center">
            <select class="form-select me-3" style="width: 100px" v-model="filterDegree" @onchange="filter">
              <option value="0" selected>ALL</option>
              <option v-for="degree in degrees" :key="degree" :value="degree">{{ degree }}</option>
            </select>
            <button class="btn btn-danger" @click="getRandomSentence()"><i class="bi bi-magic"></i></button>
          </div>
          <hr />
          <div class="text-center py-5" v-if="sentenceList.length > 0">
            <h2 v-if="randomSentence" class="m-0">{{ randomSentence.sentence }}</h2>
          </div>
          <empty-sentence-list v-else />
        </div>
      </div>
    </div>
  </div>
</template>
