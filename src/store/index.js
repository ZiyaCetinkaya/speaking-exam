import { createStore } from "vuex";

export default createStore({
  state: {
    activeComponent: "RandomSentence",
    sentenceList: JSON.parse(localStorage.getItem("sentences")) || [],
    selectedSentence: null,
    degrees: [9, 10, 11, 12],
  },
  mutations: {
    setActiveComponent(state, component) {
      state.activeComponent = component;
    },
    setSelectedSentence(state, sentence) {
      state.selectedSentence = sentence;
    },
    addSentence(state, sentence) {
      state.sentenceList.push({ id: new Date().getTime(), degree: sentence.degree, sentence: sentence.sentence });
      localStorage.setItem("sentences", JSON.stringify(state.sentenceList));
    },
    editSentence(state, sentence) {
      let sentenceIndex = state.sentenceList.findIndex((s) => s.id === state.selectedSentence.id);
      state.sentenceList[sentenceIndex] = { ...state.selectedSentence, degree: sentence.degree, sentence: sentence.sentence };
      localStorage.setItem("sentences", JSON.stringify(state.sentenceList));
    },
    deleteSentence(state) {
      state.sentenceList = state.sentenceList.filter((s) => s.id !== state.selectedSentence.id);
      localStorage.setItem("sentences", JSON.stringify(state.sentenceList));
    },
  },
  getters: {
    _activeComponent: (state) => state.activeComponent,
    _setSelectedSentence: (state) => state.setSelectedSentence,
    _selectedSentence: (state) => state.selectedSentence,
    _sentenceList: (state) => state.sentenceList,
    _degrees: (state) => state.degrees,
    _filteredSentenceList: (state) => (degree) => state.sentenceList.filter((s) => s.degree === degree),
  },
});
