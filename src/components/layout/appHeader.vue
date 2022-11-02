<script>
export default {
  data() {
    return {};
  },
  methods: {
    setActiveComponent(component) {
      this.$store.commit("setActiveComponent", component);
    },
  },
};
</script>

<template>
  <div class="row mb-3">
    <div class="col-12">
      <div class="bg-info text-white p-3 shadow-sm d-flex align-items-center justify-content-between">
        <h5 class="m-0">English Speaking Exam</h5>
        <div>
          <button class="btn btn-light me-3" @click="setActiveComponent('RandomQuestion')"><i class="bi bi-shuffle"></i></button>
          <button class="btn btn-light" @click="setActiveComponent('QuestionList')"><i class="bi bi-translate"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
