<script>
import AppHeader from "./components/AppHeader.vue";
import WordList from "./components/WordList.vue";
import WordAdd from "./components/WordAdd.vue";
import WordUpdate from "./components/WordUpdate.vue";
import WordDelete from "./components/WordDelete.vue";
import Alerts from "./components/Alerts.vue";

export default {
  provide() {
    return {
      pd: this.pd,
      addWord: this.addWord,
      updateWord: this.updateWord,
      deleteWord: this.deleteWord,
      selectWord: this.selectWord,
      showWordListing: this.showWordListing,
      cancelUpdateWord: this.cancelUpdateWord,
      cancelDeleteWord: this.cancelDeleteWord,
      showWordAdding: this.showWordAdding,
      closeAllAlerts: this.closeAllAlerts,
    };
  },
  data() {
    return {
      pd: {
        learnedWords: [],
        selectedWordForUpdate: null,
        selectedWordForDelete: null,
        wordAdded: false,
        wordUpdated: false,
        wordDeleted: false,
        emptyWordError: false,
        wordListing: true,
        wordAdding: false,
        wordUpdating: false,
        wordDeleting: false,
      },
    };
  },
  methods: {
    addWord(wordTr, wordEn) {
      if (!wordEn || !wordTr) {
        this.showEmptyError();
        return;
      }
      this.pd.learnedWords.push({
        id: new Date().getTime(),
        tr: wordTr,
        en: wordEn,
      });

      this.showWordAdded();
      this.showWordListing();
    },
    selectWord(id, operation) {
      var selectedWord = this.pd.learnedWords.filter((w) => w.id === id)[0];
      if (selectedWord) {
        if (operation === "update") {
          this.pd.selectedWordForUpdate = selectedWord;
          this.pd.selectedWordForDelete = null;

          this.showWordUpdating();
        } else {
          this.pd.selectedWordForDelete = selectedWord;
          this.pd.selectedWordForUpdate = null;

          this.showWordDeleting();
        }
      }

      this.closeAllAlerts();
    },
    updateWord(wordTr, wordEn) {
      if (!wordEn || !wordTr) {
        this.showEmptyError();
        return;
      }

      this.pd.learnedWords = this.pd.learnedWords.map((word) => {
        if (word.id === this.pd.selectedWordForUpdate.id) {
          return { ...word, tr: wordTr, en: wordEn };
        }
        return word;
      });

      this.showWordUpdated();
      this.cancelUpdateWord();
    },
    cancelUpdateWord() {
      this.pd.selectedWordForUpdate = null;

      this.showWordListing();
    },
    deleteWord() {
      this.pd.learnedWords = this.pd.learnedWords.filter((w) => w.id !== this.pd.selectedWordForDelete.id);

      this.showWordDeleted();
      this.cancelDeleteWord();
    },
    cancelDeleteWord() {
      this.pd.selectedWordForDelete = null;

      this.pd.wordListing = true;
      this.pd.wordAdding = false;
      this.pd.wordUpdating = false;
      this.pd.wordDeleting = false;
    },
    showWordAdded() {
      this.pd.wordAdded = true;
      this.pd.wordUpdated = false;
      this.pd.wordDeleted = false;
      this.pd.emptyWordError = false;
    },
    showWordUpdated() {
      this.pd.wordAdded = false;
      this.pd.wordUpdated = true;
      this.pd.wordDeleted = false;
      this.pd.emptyWordError = false;
    },
    showWordDeleted() {
      this.pd.wordAdded = false;
      this.pd.wordUpdated = false;
      this.pd.wordDeleted = true;
      this.pd.emptyWordError = false;
    },
    showEmptyError() {
      this.pd.emptyWordError = true;
      this.pd.wordAdded = false;
      this.pd.wordUpdated = false;
      this.pd.wordDeleted = false;
    },
    closeAllAlerts() {
      this.pd.wordAdded = false;
      this.pd.wordUpdated = false;
      this.pd.wordDeleted = false;
      this.pd.emptyWordError = false;
    },
    showWordListing() {
      this.pd.wordListing = true;
      this.pd.wordAdding = false;
      this.pd.wordUpdating = false;
      this.pd.wordDeleting = false;
    },
    showWordAdding() {
      this.pd.wordListing = false;
      this.pd.wordAdding = true;
      this.pd.wordUpdating = false;
      this.pd.wordDeleting = false;
    },
    showWordUpdating() {
      this.pd.wordListing = false;
      this.pd.wordAdding = false;
      this.pd.wordUpdating = true;
      this.pd.wordDeleting = false;
    },
    showWordDeleting() {
      this.pd.wordListing = false;
      this.pd.wordAdding = false;
      this.pd.wordUpdating = false;
      this.pd.wordDeleting = true;
    },
  },
  components: { AppHeader, WordList, WordAdd, WordUpdate, WordDelete, Alerts },
};
</script>

<template>
  <div class="container">
    <AppHeader />

    <Alerts />

    <div class="row justify-content-center">
      <WordAdd v-if="pd.wordAdding" />
      <WordList v-if="pd.wordListing" />
      <WordUpdate v-if="pd.wordUpdating" :word="pd.selectedWordForUpdate" />
      <WordDelete v-if="pd.wordDeleting" :word="pd.selectedWordForDelete" />
    </div>
  </div>
</template>

