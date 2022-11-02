<script>
import EmptyQuestionList from "../components/emptyQuestionList.vue";

export default {
  data() {
    return {
      filterDegree: 0,
      randomQuestion: null,
    };
  },
  methods: {
    getRandomQuestion() {
      this.randomQuestion = this.questionList[Math.floor(Math.random() * this.questionList.length)];
    },
  },
  computed: {
    degrees() {
      return this.$store.getters._degrees;
    },
    questionList() {
      if (this.filterDegree > 0) return this.$store.getters._filteredQuestionList(this.filterDegree);
      else return this.$store.getters._questionList;
    },
  },
  components: { EmptyQuestionList },
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
            <button class="btn btn-danger" @click="getRandomQuestion()"><i class="bi bi-magic"></i></button>
          </div>
          <hr />
          <div class="text-center py-5" v-if="questionList.length > 0">
            <h2 v-if="randomQuestion" class="m-0">{{ randomQuestion.sentence }}</h2>
          </div>
          <empty-question-list v-else />
        </div>
      </div>
    </div>
  </div>
</template>
