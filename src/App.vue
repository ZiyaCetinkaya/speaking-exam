<script>
import AppHeader from "./components/layout/appHeader.vue";
import RandomSentence from "./pages/randomSentence.vue";
import SentenceList from "./pages/sentenceList.vue";

export default {
  data() {
    return {};
  },
  computed: {
    activeComponent() {
      return this.$store.getters._activeComponent;
    },
  },
  components: { AppHeader, RandomSentence, SentenceList },
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
