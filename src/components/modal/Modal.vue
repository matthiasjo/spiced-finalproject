<template lang="html">
  <div>
    <b-button v-b-modal.modal-center>Launch centered modal</b-button>

    <b-modal id="modal-center" centered title="BootstrapVue">
      <p class="my-4">Vertically centered modal!</p>
      <img
        src="https://i.pinimg.com/736x/fa/df/4e/fadf4ed0dee7f67f1a906a6354f92f99.jpg"
        alt=""
        height="150px"
        width="150px"
      />
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {}
};
</script>

<style lang="css" scoped></style>
