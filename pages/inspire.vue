<template>
  <v-layout>
    <v-flex>
      <h2>Locations</h2> 
      <v-card v-for="location in locations" :key="location.created_at" class="my-2">
        <v-card-title class="headline">
          {{location.name}}
        </v-card-title>
        <v-card-text>
          <div>
            ID: {{location.id}}<br>
            Address: {{location.address.locality}} , {{location.address.country}}<br>
            Created at: {{location.created_at}}<br>
          </div>
        </v-card-text>
      </v-card> 
    </v-flex>
  </v-layout>
</template>

<script>
const axios = require('axios');

export default {
  async asyncData({ env }) {
    console.log(process.env.FRONT_API_BASE_URL);
    const result = await axios.get("/sq_locations",{
      baseURL: process.env.FRONT_API_BASE_URL
    });
    console.log(result.data);
    return {
      locations: result.data.locations,
    }
  },
}
</script>
