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
          <a href="#" class="card-link">Info</a>
        </b-card-body>
      </b-card>
    </div>
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
    return {};
  },
  mounted: function() {},
  methods: {},
  updated: function() {}
};
</script>
