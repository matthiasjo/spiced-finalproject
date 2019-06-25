<template>
  <b-container fluid>
    <div>
      <b-jumbotron bg-variant="dark" text-variant="white" border-variant="dark">
        <template id="events-title" slot="header"
          >BootstrapVue</template
        >

        <template slot="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </template>

        <hr class="my-4" />

        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
      </b-jumbotron>
    </div>
    <div>
      <b-table striped hover :items="items"></b-table>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" }
      ]
    };
  }
};
</script>
