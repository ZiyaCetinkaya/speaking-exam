<script>
export default {
  inject: ["pd", "deleteWord", "cancelDeleteWord"],
  props: ["word"],
  data() {
    return {};
  },
  methods: {
    save() {
      this.deleteWord();
    },
  },
};
</script>

<template>
  <div class="col-lg-4 col-md-4 col-12 mb-2 mt-4">
    <div class="card">
      <div class="card-header bg-danger text-light">
        <h5 class="p-0 m-0"><i class="bi bi-trash me-3"></i>Delete Word</h5>
      </div>
      <div class="card-body">
        <div class="form-group mb-2">
          <label class="form-label">Turkish</label>
          <input type="text" class="form-control form-control-sm" :value="word.tr" readonly />
        </div>
        <div class="form-group mb-2">
          <label class="form-label">English</label>
          <input type="text" class="form-control form-control-sm" :value="word.en" readonly />
        </div>
        <div class="form-group">
          <div class="alert alert-danger text-center p-1 m-0">
            <span>Are you sure?</span>
          </div>
        </div>
        <div class="form-group mt-3 d-flex justify-content-between">
          <button class="btn btn-danger btn-sm" @click="save()"><i class="bi bi-trash me-2"></i>Delete</button>
          <button class="btn btn-dark btn-sm" @click="cancelDeleteWord()"><i class="bi bi-x-square me-2"></i>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>