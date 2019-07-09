<template>
  <b-container fluid>
    <div class="adoption-form">
      <form v-if="userInfo.admin == true">
        <input
          class="input"
          v-model="form.name"
          type="text"
          name="name"
          placeholder=" Dog's name"
        />
        <p>Adoption Status</p>
        <select
          class="select"
          name="adoption_status"
          v-model="form.adoption_status"
        >
          <option disabled value="">-</option>
          <option>Available</option>
          <option>Adopted</option>
        </select>
        <input
          class="input"
          v-model="form.dob"
          type="date"
          name="dob"
          placeholder="dob"
        />
        <p>Sex</p>
        <select class="select" name="sex" v-model="form.sex">
          <option disabled value="">-</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          class="input"
          v-model="form.breed"
          type="text"
          name="breed"
          placeholder="breed"
        />
        <input
          class="input"
          v-model="form.dogsize"
          type="text"
          name="dogsize "
          placeholder="Dog's size (height x width) "
        />
        <p>Training</p>
        <select class="select" name="training" v-model="form.training">
          <option disabled value="">-</option>
          <option value="None">None</option>
          <option value="Little">Little</option>
          <option value="Moderate">Moderate</option>
          <option value="Advanced">Advanced</option>
          <option value="Trained">Trained</option>
        </select>
        <input
          class="input"
          v-model="form.manner"
          type="text"
          name="manner"
          placeholder="Personality Attributes (playful, kid friendly etc.)"
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
    <div class="dog-box" v-if="dogs.length > 0">
      <div v-for="dog in dogs" :key="dog.id">
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
            <a
              href="#"
              class="card-link"
              v-b-modal.modal-center
              @click.prevent="clickedDog(dog)"
              >Info</a
            >
          </b-card-body>
        </b-card>
      </div>
    </div>
    <b-modal
      id="modal-center"
      centered
      title="BootstrapVue"
      ok-title="Adopt"
      hide-footer
    >
      <div class="dog-card" v-if="adoptform == true">
        <img
          class="modal-img"
          :src="modalDog.url"
          alt=""
          height="250px"
          width="250px"
        />
        <p class="my-4">Name: {{ modalDog.name }}</p>
        <p class="my-4">Adoption Status: {{ modalDog.adoption_status }}</p>
        <p class="my-4">Date of Birth: {{ modalDog.dob }}</p>
        <p class="my-4">Sex: {{ modalDog.sex }}</p>
        <p class="my-4">Breed: {{ modalDog.breed }}</p>
        <p class="my-4">Size(h, w): {{ modalDog.dogsize }}</p>
        <p class="my-4">Training: {{ modalDog.training }}</p>
        <p class="my-4">Manner: {{ modalDog.manner }}</p>

        <b-button
          v-if="userInfo.userId != null"
          v-on:click.prevent="adoptform = false"
          >Adopt Me</b-button
        >

        <p v-else>Please register to contact us about adopting a dog</p>
      </div>

      <div class="adopt-form-box" v-if="adoptform == false">
        <h1>Contact Us For Adoption Details</h1>
        <div class="" v-if="emailSend == true">
          <p>An email has been send to us and a copy to {{ email }}!</p>
        </div>
        <form v-if="modalDog.id" class="adopt-form" method="post">
          <input
            class="input"
            type="text"
            name="first"
            placeholder=" First Name"
            v-model="adoptProcess.first"
          />
          <input
            class="input"
            type="text"
            name="last"
            placeholder=" Last Name"
            v-model="adoptProcess.last"
          />
          <input
            class="input"
            type="text"
            name="street"
            placeholder="Street and House #"
            v-model="adoptProcess.street"
          />
          <input
            class="input"
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            v-model="adoptProcess.zipcode"
          />
          <input
            class="input"
            type="text"
            name="city"
            placeholder="City"
            v-model="adoptProcess.city"
          />
          <input
            class="input"
            type="text"
            name="state"
            placeholder="State"
            v-model="adoptProcess.state"
          />
          <input
            class="input"
            type="text"
            name="phone"
            placeholder="Phone/Mobile"
            v-model="adoptProcess.phone"
          />
          <input
            class="input"
            type="email"
            name="email"
            placeholder="example@domain.com"
            v-model="adoptProcess.email"
          />
          <p>Dog Owner Experience</p>
          <select name="experience" v-model="form.experience">
            <option value="More than 10 Years">More than 10 Year</option>
            <option value="5-10 Years">5-10 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="1-3 Years">1-3 Years</option>
            <option value="Less Than 1 Year">Less Than 1 Year</option>
            <option value="None">None</option>
          </select>
          <p>Experience with "listed" Dogs (Pitbull, Rotweiler, Doberman)</p>
          <select name="listed" v-model="form.listed">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <p>What is your living situation</p>
          <select name="housing" v-model="form.housing">
            <option value="Flat">Flat</option>
            <option value="House without garden">House without garden</option>
            <option value="House with garden">House with garden</option>
          </select>
          <b-button v-on:click.prevent="adopt">Submit</b-button>
          <b-button v-on:click.prevent="adoptform = true">Cancel</b-button>
        </form>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
// @ is an alias to /src
import axios from "@/axios";
import { mapState } from "vuex";

export default {
  name: "Adoption",
  components: {},
  data: function() {
    return {
      email: "",
      emailSend: false,
      modalDog: {},
      dogs: [],
      show: false,
      adoptform: true,
      adoptProcess: {},
      form: {
        name: "",
        adoption_status: "",
        dob: "",
        sex: "",
        breed: "",
        dogsize: "",
        training: "",
        file: null
      }
    };
  },
  mounted: function() {
    console.log("hello");
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
    swapForm() {
      this.adoptform = !this.adoptform;
    },
    clickedDog: function(dog) {
      this.modalDog = dog;
      console.log("MODADLDOG", this.modalDog.id);
    },
    uploadFile: function() {
      var formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("adoption_status", this.form.adoption_status);
      formData.append("dob", this.form.dob);
      formData.append("sex", this.form.sex);
      formData.append("breed", this.form.breed);
      formData.append("dogsize", this.form.dogsize);
      formData.append("training", this.form.training);
      formData.append("manner", this.form.manner);
      formData.append("file", this.form.file);
      // if you log formData and get an {}, that's ok
      var self = this;
      axios.post("/upload-image", formData).then(function(resp) {
        console.log("RESP_UPLOAD", resp);
        self.dogs.push(resp.data);
      });
    },
    adopt: function() {
      var self = this;
      console.log("ADOPTPROCESS", this.adoptProcess);
      axios
        .post("/adoptProcess", {
          form: this.adoptProcess,
          dogId: this.modalDog.id
        })
        .then(function(resp) {
          if (resp.data.success) {
            self.emailSend = true;
            self.email = resp.data.email;
          }
        })
        .catch(err => console.log(err));
    }
  },
  computed: mapState(["userInfo", "verified"])
};
</script>

<style src="../../public/style.adoption.css" scoped></style>
