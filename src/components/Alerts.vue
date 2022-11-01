<script>
export default {
  inject: ["pd", "closeAllAlerts"],
};
</script>

<template>
  <div class="row justify-content-center p-0">
    <div class="col-12 text-center p-0">
      <div class="alert alert-success py-1 px-2 rounded-0 d-flex justify-content-between align-items-center" v-if="pd.wordAdded">
        <span>New word added.</span>
        <button @click="closeAllAlerts()" class="btn btn-sm"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="alert alert-warning py-1 px-2 rounded-0 d-flex justify-content-between align-items-center" v-if="pd.wordUpdated">
        <span>Word Updated.</span>
        <button @click="closeAllAlerts()" class="btn btn-sm"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="alert alert-danger py-1 px-2 rounded-0 d-flex justify-content-between align-items-center" v-if="pd.wordDeleted">
        <span>Word Deleted.</span>
        <button @click="closeAllAlerts()" class="btn btn-sm"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="alert alert-info py-1 px-2 rounded-0 d-flex justify-content-between align-items-center" v-if="pd.emptyWordError">
        <span>Fill in all fields.</span>
        <button @click="closeAllAlerts()" class="btn btn-sm"><i class="bi bi-x-lg"></i></button>
      </div>
    </div>
  </div>
</template>