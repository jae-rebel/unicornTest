<template>
  <div class="container">
    <h3>Unicorns:</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Color</th>
          <th scope="col">Favorite Food</th>
          <th scope="col">Location</th>
          <th scope="col">Change Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="unicorn in unicorns" v-bind:key="unicorn.name">
          <th scope="row">{{ unicorn.name }}</th>
          <td>{{ unicorn.color }}</td>
          <td>{{ unicorn.favorite_food }}</td>
          <td>{{ unicorn.place }}</td>
          <td>
            <button
              type="button"
              class="btn btn-info"
              data-toggle="modal"
              data-target="#myModal"
              v-on:click="unicornModal = unicorn"
            >Change Location</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Change Location</h4>
          </div>
          <div class="modal-body">
            <p>{{ unicornModal.name }}</p>
            <input v-model="changeLocation" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-info"
              data-dismiss="modal"
              v-on:click="updateUnicorn"
            >Change Location</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Unicorns",

  data() {
    return {
      unicorns: null,
      unicornModal: {},
      changeLocation: null
    };
  },
  created: function() {
    this.refreshUnicornData();
  },
  methods: {
    refreshUnicornData: function() {
      axios
        .get(
          "https://j6n35kh4ca.execute-api.us-east-1.amazonaws.com/staging/unicorn"
        )
        .then(res => {
          this.unicorns = res.data;
        });
    },

    updateUnicorn: function() {
      axios
        .post(
          "https://j6n35kh4ca.execute-api.us-east-1.amazonaws.com/staging/unicorn",
          { name: this.unicornModal.name, place: this.changeLocation }
        )
        .then(() => {
          this.refreshUnicornData();
        });
    }
  }
};
</script>
<style>
h3 {
  margin-bottom: 5%;
}
</style>
