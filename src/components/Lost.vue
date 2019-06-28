<template>
  <div class="dog-box" v-if="lostAnimals.length > 0">
    <div v-for="animal in lostAnimals" :key="animal.id">
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
      title="Lost Pet"
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
        <gmap-map
          :center="center"
          :zoom="12"
          style="width:100%;  height: 400px;"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center = m.position"
          ></gmap-marker>
        </gmap-map>
        <b-button v-on:click.prevent="">Contact</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src

//import axios from "@/axios";

export default {
  name: "Lost",
  components: {},
  props: {
    lostAnimals: Array
  },
  data: function() {
    return {
      center: { lat: 52.52000659999999, lng: 13.404953999999975 },
      markers: [],
      places: [],
      currentPlace: null,
      show: false,
      modalAnimal: {}
    };
  },
  mounted: function() {},
  methods: {
    clickedAnimal: function(animal) {
      this.modalAnimal = animal;
      this.markers.push(this.modalAnimal.location);
      console.log(this.modalAnimal.location.position.lat);
      this.center = {
        lat: this.modalAnimal.location.position.lat,
        lng: this.modalAnimal.location.position.lng
      };
    }
  },
  updated: function() {}
};
</script>
