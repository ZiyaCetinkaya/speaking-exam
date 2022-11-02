<script>
import EmptyQuestionList from "../components/emptyQuestionList.vue";
import QuestionAdd from "../components/questionAdd.vue";
import QuestionDelete from "../components/questionDelete.vue";
import QuestionEdit from "../components/questionEdit.vue";

export default {
  data() {
    return {
      filterDegree: 0,
      activeModal: null,
    };
  },
  methods: {
    setActiveModal(modal, question) {
      this.activeModal = modal;
      this.$store.commit("setSelectedQuestion", question);
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
    totalCount() {
      return this.$store.getters._questionList.length;
    },
    filteredCount() {
      return this.filterDegree <= 0 ? this.totalCount : this.$store.getters._filteredQuestionList(this.filterDegree).length;
    },
  },
  components: { QuestionAdd, QuestionEdit, QuestionDelete, EmptyQuestionList },
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="card rounded-0 shadow">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="m-0">Question List</h5>
            <div class="d-flex align-items-center">
              <div class="d-flex">
                <span>{{ filteredCount }}</span>
                <span class="mx-1">/</span>
                <span>{{ totalCount }}</span>
              </div>
              <select class="form-select mx-3" v-model="filterDegree" @onchange="filter">
                <option value="0" selected>ALL</option>
                <option v-for="degree in degrees" :key="degree" :value="degree">{{ degree }}</option>
              </select>
              <button class="btn btn-primary" @click="setActiveModal('QuestionAdd')"><i class="bi bi-plus-lg"></i></button>
            </div>
          </div>
          <hr />
          <div class="table-responsive" v-if="questionList.length > 0">
            <table class="table table-sm table-border table-hover table-striped">
              <thead>
                <tr>
                  <th width="75">Degree</th>
                  <th>Question</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="question in questionList" :key="question.id">
                  <td>{{ question.degree }}</td>
                  <td>{{ question.sentence }}</td>
                  <td width="100">
                    <button class="btn btn-warning btn-sm ms-2" @click="setActiveModal('QuestionEdit', question)"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger btn-sm ms-2" @click="setActiveModal('QuestionDelete', question)"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <empty-question-list v-else />
        </div>
      </div>
    </div>
    <Transition name="fade" mode="out-in">
      <component :is="activeModal" :hide="setActiveModal" />
    </Transition>
  </div>
</template>
