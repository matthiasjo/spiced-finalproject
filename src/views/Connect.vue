<template>
  <div>
    <div>
      <router-link class="nav" to="/connect/found">Lost</router-link> |
      <router-link class="nav" to="/connect/lost">Found</router-link>
    </div>
    <Lost v-if="this.$route.path == '/connect/lost'" />
    <Found v-if="this.$route.path == '/connect/found'" />
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
    //var self = this;
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

<style scoped></style>
