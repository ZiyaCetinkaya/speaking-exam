import { createStore } from "vuex";

export default createStore({
  state: {
    activeComponent: "RandomQuestion",
    questionList: JSON.parse(localStorage.getItem("sentences")) || [],
    selectedQuestion: null,
    degrees: [9, 10, 11, 12],
  },
  mutations: {
    setActiveComponent(state, component) {
      state.activeComponent = component;
    },
    setSelectedQuestion(state, question) {
      state.selectedQuestion = question;
    },
    addQuestion(state, question) {
      state.questionList.push({ id: new Date().getTime(), degree: question.degree, sentence: question.sentence });
      localStorage.setItem("sentences", JSON.stringify(state.questionList));
    },
    editQuestion(state, question) {
      let questionIndex = state.questionList.findIndex((s) => s.id === state.selectedQuestion.id);
      state.questionList[questionIndex] = { ...state.selectedQuestion, degree: question.degree, sentence: question.sentence };
      localStorage.setItem("sentences", JSON.stringify(state.questionList));
    },
    deleteQuestion(state) {
      state.questionList = state.questionList.filter((s) => s.id !== state.selectedQuestion.id);
      localStorage.setItem("sentences", JSON.stringify(state.questionList));
    },
  },
  getters: {
    _activeComponent: (state) => state.activeComponent,
    _setSelectedQuestion: (state) => state.setSelectedQuestion,
    _selectedQuestion: (state) => state.selectedQuestion,
    _questionList: (state) => state.questionList,
    _degrees: (state) => state.degrees,
    _filteredQuestionList: (state) => (degree) => state.questionList.filter((s) => s.degree === degree),
  },
});
