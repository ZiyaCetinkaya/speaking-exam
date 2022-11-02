<script>
export default {
  props: ["hide"],
  methods: {
    onSubmit() {
      this.$store.commit("deleteSentence");
      this.hide();
    },
  },
  computed: {
    selectedSentence() {
      return this.$store.getters._selectedSentence;
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
            <h4 class="m-0">Cümle Sil</h4>
            <button type="button" class="btn btn-danger btn-sm" @click="hide(null)"><i class="bi bi-x-lg fs-5"></i></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group mb-3">
                  <b>Sınıf: </b>
                  {{ selectedSentence.degree }}
                </div>
                <div class="form-group mb-3">
                  <b>Cümle: </b>
                  {{ selectedSentence.sentence }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row w-100">
              <div class="col-6">
                <button type="submit" class="btn btn-outline-danger btn-lg w-100"><i class="bi bi-trash me-3"></i>Sil</button>
              </div>
              <div class="col-6">
                <button type="button" class="btn btn-danger btn-lg w-100" @click="hide(null)"><i class="bi bi-x-lg me-3"></i>İptal</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
