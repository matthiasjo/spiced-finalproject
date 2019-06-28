<template>
  <div class="connect">
    <div class="router-lost">
      <div class="links-lost">
        <router-link class="nav" to="/connect/lost">Lost</router-link> |
        <router-link class="nav" to="/connect/found">Found</router-link>
      </div>

      <div id="lost-found-btn">
        <b-button
          class="doggy-btn"
          v-if="userInfo.userId != null"
          id="show-btn"
          @click="$bvModal.show('uploadLostFound')"
        >
          Upload Details
        </b-button>
      </div>
      <div class="lost-box">
        <b-modal id="uploadLostFound" hide-footer>
          <template slot="modal-title">
            Lost & Found Uploader
          </template>
          <div class="d-block text-center">
            <h2>Please add a lost or found Pet</h2>
            <form class="">
              <label for="spiecies">Spiecies</label>
              <input
                type="text"
                name="spiecies"
                value=""
                placeholder="species"
                v-model="form.species"
              />
              <fieldset>
                <label for="status">Status</label>
                <input
                  type="radio"
                  id="lost"
                  name="status"
                  value="lost"
                  v-model="form.status"
                />
                <label for="lost">Lost</label>
                <input
                  type="radio"
                  id="found"
                  name="status"
                  value="found"
                  v-model="form.status"
                />
                <label for="found">Found</label>
              </fieldset>
              <label for="chipped">Chipped</label>
              <fieldset>
                <input
                  type="radio"
                  id="chipped-yes"
                  name="chipped"
                  value="yes"
                  v-model="form.chipped"
                />
                <label for="chipped-yes">Yes</label>
                <input
                  type="radio"
                  id="chipped-no"
                  name="chipped"
                  value="no"
                  v-model="form.chipped"
                />
                <label for="found">No</label>
              </fieldset>
              <label for="lastSeen">Last Seen</label>
              <input type="date" name="" value="" v-model="form.lastSeen" />

              <label for="description">Description</label>
              <textarea
                name="description"
                rows="2"
                cols="40"
                placeholder="description"
                v-model="form.description"
              ></textarea>
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                value=""
                placeholder="name"
                v-model="form.name"
              />
              <label for="gender">Gender</label>
              <input
                type="text"
                name="gender"
                value=""
                placeholder="gender"
                v-model="form.gender"
              />
              <label for="breed">Breed</label>
              <input
                type="text"
                name="breed"
                value=""
                placeholder="breed"
                v-model="form.breed"
              />
              <label for="age">Age</label>
              <input
                type="text"
                name="age"
                value=""
                placeholder="age"
                v-model="form.age"
              />
              <input
                id="select-img"
                type="file"
                name="file"
                accept="image/*"
                @change="handleFileChange"
                class="inputfile"
              />
            </form>
            <label>
              <gmap-autocomplete @place_changed="setPlace"> </gmap-autocomplete>
              <button @click="addMarker">Add</button>
            </label>
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
          </div>
          <b-button class="mt-3" block v-on:click.prevent="sendForm"
            >Upload</b-button
          >
        </b-modal>
      </div>
      <Lost
        :lostAnimals="lostAnimals"
        v-if="this.$route.path == '/connect/lost'"
      />
      <Found
        :foundAnimals="foundAnimals"
        v-if="this.$route.path == '/connect/found'"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "@/axios";
import Lost from "@/components/Lost";
import Found from "@/components/Found";
import { mapState } from "vuex";

export default {
  name: "Connect",
  components: { Lost, Found },
  data: function() {
    //       lat: 52.52000659999999
    // lng: 13.404953999999975
    return {
      center: { lat: 52.52000659999999, lng: 13.404953999999975 },
      markers: [],
      places: [],
      currentPlace: null,
      lostAnimals: [],
      foundAnimals: [],
      myMapMarker: {},
      form: {
        species: "",
        status: "",
        chipped: "",
        lastSeen: "",
        location: "",
        description: "",
        name: "",
        age: "",
        gender: "",
        breed: "",
        file: null
      }
    };
  },
  mounted: function() {
    this.geolocate();
    var self = this;
    axios.get("/get-animals").then(function(resp) {
      resp.data.forEach(item => {
        item.location = JSON.parse(item.location);
      });
      const lostAnimals = resp.data.filter(animal => animal.status == "lost");
      const foundAnimals = resp.data.filter(animal => animal.status == "found");
      self.lostAnimals = lostAnimals;
      self.foundAnimals = foundAnimals;
    });
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.myMapMarker = { position: marker };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    handleSearch(event) {
      console.log("handleSearch", event);
    },
    handleFileChange: function(e) {
      this.form.file = e.target.files[0];
    },
    sendForm: function() {
      var stringMarker = JSON.stringify(this.myMapMarker);
      console.log(stringMarker);
      var formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("status", this.form.status);
      formData.append("species", this.form.species);
      formData.append("chipped", this.form.chipped);
      formData.append("gender", this.form.gender);
      formData.append("breed", this.form.breed);
      formData.append("location", stringMarker);
      formData.append("description", this.form.description);
      formData.append("lastSeen", this.form.lastSeen);
      formData.append("age", this.form.age);
      formData.append("file", this.form.file);
      // if you log formData and get an {}, that's ok
      var self = this;
      axios.post("/upload-connect", formData).then(function(resp) {
        //$bvModal.hide("uploadLostFound");
        console.log("animal from upload response", resp.data);
        if (resp.data.status == "lost") {
          self.lostAnimals.push(resp.data);
        } else {
          self.foundAnimals.push(resp.data);
        }
      });
    }
  },
  computed: mapState(["userInfo", "verified"])
};
</script>

<style src="../../public/style.connect.css" scoped></style>
