<template>
  <b-container class="events" fluid>
    <div class="jumbo">
      <b-jumbotron bg-variant="dark" text-variant="white" border-variant="dark">
        <template id="events-title" slot="header"
          >Upcomming Events</template
        >

        <template slot="lead">
          Rescueing dogs and puting them upp for adoption requires lots of help
          and commitment. That's why we always on the look for new volunteers
          and time to time helpers.
        </template>

        <hr class="my-4" />

        <p>
          Check out our upcomming events and join us.
        </p>
      </b-jumbotron>
    </div>
    <div class="b-table">
      <b-table striped hover :items="items"></b-table>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          When: "June 11th, 3PM",
          What: "Adoption Fair",
          Where: "Alexanderplatz"
        },
        {
          When: "July 5th, 3PM",
          What: "Adoption Fair",
          Where: "Alexanderplatz"
        },
        {
          When: "Augustune 4th, 3PM",
          What: "Adoption Fair",
          Where: "Alexanderplatz"
        },
        {
          When: "September 15th, 3PM",
          What: "Adoption Fair",
          Where: "Alexanderplatz"
        },
        {
          When: "June 11th, 3PM",
          What: "Adoption Fair",
          Where: "Alexanderplatz"
        },
        {
          When: "July 5th, 3PM",
          What: "Adoption Fair",
          Where: "Alexanderplatz"
        },
        {
          When: "Augustune 4th, 3PM",
          What: "Adoption Fair",
          Where: "Alexanderplatz"
        },
        {
          When: "September 15th, 3PM",
          What: "Adoption Fair",
          Where: "Alexanderplatz"
        }
      ]
    };
  }
};
</script>

<style src="../../public/style.events.css" scoped></style>
