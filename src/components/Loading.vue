<script>
export default {};
</script>

<template>
  <div class="row m-0 p-0">
    <div class="col-12 d-flex justify-content-center align-items-center" style="height: 98vh">
      <i class="bi bi-arrow-repeat" style="font-size: 128px"></i>
    </div>
  </div>
</template>

<style scoped>
i {
  -webkit-animation: rotation 2s infinite linear;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
</style>
