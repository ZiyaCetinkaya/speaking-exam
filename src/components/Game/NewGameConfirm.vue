<script>
export default {
  props: ["newGame", "hide"],
};
</script>

<template>
  <div class="modal modal-sm d-block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-danger text-light">
        <div class="modal-body">
          <div class="w-100 d-flex justify-content-center align-items-center pb-1">
            <i class="bi bi-exclamation-octagon fs-1"></i>
          </div>
          <div class="py-3 text-center">
            <p class="m-0 text-center">Oyun ile ilgili tüm veriler silinecek. Devam etmek istiyor musunuz?</p>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-light btn mt-3 mx-2" @click="newGame()"><i class="bi bi-check-lg fs-5"></i></button>
            <button class="btn btn-dark btn mt-3 mx-2" @click="hide()"><i class="bi bi-x-lg fs-5"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
