<template>
  <div>
    <div>
      <router-link class="nav" to="/connect/found">Lost</router-link> |
      <router-link class="nav" to="/connect/lost">Found</router-link>
      <button id="show-btn" @click="$bvModal.show('uploadLostFound')">
        Upload
      </button>
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
            <label for="location">Location</label>
            <input
              type="text"
              name=""
              value=""
              placeholder="last known location"
              v-model="form.location"
            />
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
</template>

<script>
// @ is an alias to /src
import axios from "@/axios";
import Lost from "@/components/Lost";
import Found from "@/components/Found";

export default {
  name: "Connect",
  components: { Lost, Found },
  data: function() {
    return {
      lostAnimals: [],
      foundAnimals: [],
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
    var self = this;
    axios.get("/get-animals").then(function(resp) {
      const lostAnimals = resp.data.filter(animal => animal.status == "lost");
      const foundAnimals = resp.data.filter(animal => animal.status == "found");
      self.lostAnimals = lostAnimals;
      self.foundAnimals = foundAnimals;
    });
  },
  methods: {
    handleFileChange: function(e) {
      this.form.file = e.target.files[0];
    },

    sendForm: function() {
      var formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("status", this.form.status);
      formData.append("species", this.form.species);
      formData.append("chipped", this.form.chipped);
      formData.append("gender", this.form.gender);
      formData.append("breed", this.form.breed);
      formData.append("location", this.form.location);
      formData.append("description", this.form.description);
      formData.append("lastSeen", this.form.lastSeen);
      formData.append("age", this.form.age);
      formData.append("file", this.form.file);
      // if you log formData and get an {}, that's ok
      var self = this;
      axios.post("/upload-connect", formData).then(function(resp) {
        //$bvModal.hide("uploadLostFound");
        if (resp.data.status == "lost") {
          self.lostAnimals.push(resp.data);
        } else {
          self.foundAnimals.push(resp.data);
        }
      });
    }
  }
};
</script>

<style scoped></style>
