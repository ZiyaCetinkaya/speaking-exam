<script>
import EmptySentenceList from "../components/emptySentenceList.vue";
import SentenceAdd from "../components/sentenceAdd.vue";
import SentenceDelete from "../components/sentenceDelete.vue";
import SentenceEdit from "../components/sentenceEdit.vue";

export default {
  data() {
    return {
      filterDegree: 0,
      activeModal: null,
    };
  },
  methods: {
    setActiveModal(modal, sentence) {
      this.activeModal = modal;
      this.$store.commit("setSelectedSentence", sentence);
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
    totalCount() {
      return this.$store.getters._sentenceList.length;
    },
    filteredCount() {
      return this.filterDegree <= 0 ? this.totalCount : this.$store.getters._filteredSentenceList(this.filterDegree).length;
    },
  },
  components: { SentenceAdd, SentenceEdit, SentenceDelete, EmptySentenceList },
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="card rounded-0 shadow">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="m-0">Sentence List</h5>
            <div class="d-flex align-items-center">
              <div class=" d-flex">
                <span>{{ filteredCount }}</span>
                <span class="mx-1">/</span>
                <span>{{ totalCount }}</span>
              </div>
              <select class="form-select mx-3" v-model="filterDegree" @onchange="filter">
                <option value="0" selected>ALL</option>
                <option v-for="degree in degrees" :key="degree" :value="degree">{{ degree }}</option>
              </select>
              <button class="btn btn-primary" @click="setActiveModal('SentenceAdd')"><i class="bi bi-plus-lg"></i></button>
            </div>
          </div>
          <hr />
          <div class="table-responsive" v-if="sentenceList.length > 0">
            <table class="table table-sm table-border table-hover table-striped">
              <thead>
                <tr>
                  <th width="75">Degree</th>
                  <th>Sentence</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sentence in sentenceList" :key="sentence.id">
                  <td class="pt-2">{{ sentence.degree }}</td>
                  <td class="pt-2">{{ sentence.sentence }}</td>
                  <td width="100">
                    <button class="btn btn-warning btn-sm ms-2" @click="setActiveModal('SentenceEdit', sentence)"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger btn-sm ms-2" @click="setActiveModal('SentenceDelete', sentence)"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <empty-sentence-list v-else />
        </div>
      </div>
    </div>
    <Transition name="fade" mode="out-in">
      <component :is="activeModal" :hide="setActiveModal" />
    </Transition>
  </div>
</template>
