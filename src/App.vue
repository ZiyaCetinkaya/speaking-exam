<script>
import AppHeader from "./components/layout/appHeader.vue";
import RandomQuestion from "./pages/randomQuestion.vue";
import QuestionList from "./pages/questionList.vue";

export default {
  data() {
    return {};
  },
  computed: {
    activeComponent() {
      return this.$store.getters._activeComponent;
    },
  },
  components: { AppHeader, RandomQuestion, QuestionList },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <app-header />

        <Transition name="fade" mode="out-in">
          <component :is="activeComponent" />
        </Transition>
      </div>
    </div>
  </div>
</template>
