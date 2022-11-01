<script>
export default {
  inject: ["pd", "updateWord", "cancelUpdateWord"],
  props: ["word"],
  data() {
    return {
      wordTr: null,
      wordEn: null,
    };
  },
  methods: {
    save() {
      this.updateWord(this.wordTr, this.wordEn);
      this.wordEn = null;
      this.wordTr = null;
    },
  },
  mounted() {
    this.wordTr = this.word.tr;
    this.wordEn = this.word.en;
  },
};
</script>

<template>
  <div class="col-lg-4 col-md-4 col-12 mb-2 mt-4">
    <div class="card">
      <div class="card-header bg-warning text-dark">
        <h5 class="p-0 m-0"><i class="bi bi-pencil-square me-3"></i>Update Word</h5>
      </div>
      <div class="card-body">
        <div class="form-group mb-2">
          <label class="form-label">Turkish</label>
          <input type="text" class="form-control form-control-sm" v-model="wordTr" />
        </div>
        <div class="form-group mb-2">
          <label class="form-label">English</label>
          <input type="text" class="form-control form-control-sm" v-model="wordEn" />
        </div>
        <div class="form-group mt-3 d-flex justify-content-between">
          <button class="btn btn-warning btn-sm" @click="save()"><i class="bi bi-pencil-square me-2"></i>Update</button>
          <button class="btn btn-dark btn-sm" @click="cancelUpdateWord()"><i class="bi bi-x-square me-2"></i>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>