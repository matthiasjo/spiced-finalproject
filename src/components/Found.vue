<template>
  <div class="dog-box" v-if="foundAnimals.length > 0">
    <div v-for="animal in foundAnimals" :key="animal.id">
      <b-card
        class="card"
        no-body
        style="max-width: 20rem;"
        :img-src="animal.url"
        img-alt="Image"
        img-top
      >
        <h4 slot="header">{{ animal.name }}</h4>

        <b-card-body>
          <b-card-title>{{ animal.description }}</b-card-title>
        </b-card-body>

        <b-card-body>
          <a
            class="card-link"
            v-b-modal.modal-center
            @click.prevent="clickedAnimal(animal)"
            href="#"
            >Info</a
          >
        </b-card-body>
      </b-card>
    </div>
    <b-modal
      v-if="modalAnimal"
      id="modal-center"
      centered
      title="Found Pet"
      hide-footer
    >
      <div class="dog-card">
        <img
          class="modal-img"
          :src="modalAnimal.url"
          alt=""
          height="250px"
          width="250px"
        />
        <p class="my-4">Name: {{ modalAnimal.name }}</p>
        <p class="my-4">Status:{{ modalAnimal.status }}</p>
        <p class="my-4">Chipped:{{ modalAnimal.chipped }}</p>
        <p class="my-4">Age: {{ modalAnimal.age }}</p>
        <p class="my-4">Gender: {{ modalAnimal.gender }}</p>
        <p class="my-4">Breed: {{ modalAnimal.breed }}</p>
        <p class="my-4">Last seen: {{ modalAnimal.lastSeen }}</p>
        <p class="my-4">Description: {{ modalAnimal.description }}</p>
        <p class="my-4">Location: {{ modalAnimal.location }}</p>

        <b-button v-on:click.prevent="">Contact</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src

//import axios from "@/axios";

export default {
  name: "Found",
  components: {},
  props: {
    foundAnimals: Array
  },
  data: function() {
    return {
      modalAnimal: {},
      show: false
    };
  },
  mounted: function() {},
  methods: {
    clickedAnimal: function(animal) {
      this.modalAnimal = animal;
    }
  },
  updated: function() {}
};
</script>
