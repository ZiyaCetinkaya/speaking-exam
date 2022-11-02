<script>
export default {
  props: ["hide"],
  methods: {
    onSubmit() {
      this.$store.commit("deleteQuestion");
      this.hide();
    },
  },
  computed: {
    selectedQuestion() {
      return this.$store.getters._selectedQuestion;
    },
  },
};
</script>

<template>
  <div class="modal d-block" style="background-color: rgba(0, 0, 0, 0.8)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px">
        <form @submit.prevent="onSubmit">
          <div class="modal-header d-flex align-items-center justify-content-betweeen">
            <h4 class="m-0">Delete Question</h4>
            <button type="button" class="btn btn-danger btn-sm" @click="hide(null)"><i class="bi bi-x-lg fs-5"></i></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group mb-3">
                  <b>Degree: </b>
                  {{ selectedQuestion.degree }}
                </div>
                <div class="form-group mb-3">
                  <b>Question: </b>
                  {{ selectedQuestion.sentence }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row w-100">
              <div class="col-6">
                <button type="submit" class="btn btn-outline-danger btn-lg w-100"><i class="bi bi-trash me-3"></i>Delete</button>
              </div>
              <div class="col-6">
                <button type="button" class="btn btn-danger btn-lg w-100" @click="hide(null)"><i class="bi bi-x-lg me-3"></i>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
