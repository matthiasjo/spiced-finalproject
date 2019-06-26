<template lang="html">
  <b-container fluid>
    <div class="adoption-form">
      <form>
        <input
          id="input"
          v-model="form.name"
          type="text"
          name="name"
          placeholder=" Dog's name"
        />
        <input
          id="input"
          v-model="form.adoption_status"
          type="text"
          name="adoption_status"
          placeholder="adoption_status"
        />
        <input
          id="input"
          v-model="form.dob"
          type="date"
          name="dob"
          placeholder="dob"
        />
        <input
          id="input"
          v-model="form.sex"
          type="text"
          name="sex"
          placeholder="sex"
        />
        <input
          id="input"
          v-model="form.breed"
          type="text"
          name="breed"
          placeholder="breed"
        />
        <input
          id="input"
          v-model="form.size"
          type="text"
          name="size "
          placeholder="size in cm "
        />
        <input
          id="input"
          v-model="form.training"
          type="text"
          name="training"
          placeholder="How trained is the dog?"
        />
        <input
          id="input"
          v-model="form.manner"
          type="text"
          name="manner"
          placeholder="Typical behavior of the dog"
        />
        <input
          id="select-img"
          type="file"
          name="file"
          accept="image/*"
          @change="handleFileChange"
          class="inputfile"
        />
        <label for="select-img">Choose a file</label>
        <button id="upload-button" v-on:click.prevent="uploadFile">
          Upload
        </button>
      </form>
    </div>
    <div class="dog-box">
      <div v-if="dogs.length > 0" v-for="dog in dogs" :key="dog.id">
        <b-card
          class="card"
          no-body
          style="max-width: 20rem;"
          :img-src="dog.url"
          img-alt="Image"
          img-top
        >
          <h4 slot="header">{{ dog.name }}</h4>

          <b-card-body>
            <b-card-title>{{ dog.adoption_status }}</b-card-title>
          </b-card-body>

          <b-card-body>
            <a href="#" class="card-link">Info</a>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
// @ is an alias to /src
import axios from "@/axios";

export default {
  name: "Adoption",
  components: {},
  data: function() {
    return {
      dogs: [],

      form: {
        name: "",
        adoption_status: "",
        dob: "",
        sex: "",
        breed: "",
        size: "",
        training: "",
        manner: "",
        file: null
      }
    };
  },
  mounted: function() {
    var self = this;

    axios.get("/get-dogs").then(function(resp) {
      self.dogs = resp.data;
      console.log(self.dogs);
    });
  },
  methods: {
    handleFileChange: function(e) {
      this.form.file = e.target.files[0];
    },

    uploadFile: function() {
      var formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("adoption_status", this.form.adoption_status);
      formData.append("dob", this.form.dob);
      formData.append("sex", this.form.sex);
      formData.append("breed", this.form.breed);
      formData.append("size", this.form.size);
      formData.append("training", this.form.training);
      formData.append("manner", this.form.manner);
      formData.append("file", this.form.file);
      // if you log formData and get an {}, that's ok
      var self = this;
      axios.post("/upload-image", formData).then(function(resp) {
        console.log("RESP_UPLOAD", resp);
        self.dogs.push(resp.data);
      });
    }
  }
};
</script>

<style src="../../public/style.adoption.css" scoped></style>
