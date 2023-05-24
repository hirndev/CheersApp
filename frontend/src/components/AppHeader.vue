<script>
export default {
  name: "AppHeader",
  data() {
    return {
      searchBar: 0 /* 0 is Hidden, 1 is Show */
    };
  },
  methods: {}
};
</script>

<template>
  <v-toolbar class="navbar container bg-black" :elevation="8">
    <img src="../assets/aiwa_logo_nobg.png" height="40" />
    <v-toolbar-title class="logo_name">Ai Wall Art</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-scroll-x-transition>
      <v-card-text v-show="searchBar == 1">
        <v-text-field
          class="w-5"
          density="compact"
          variant="outlined"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-text>
    </v-scroll-x-transition>
    <v-btn @click="searchBar = !searchBar" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<style></style>
