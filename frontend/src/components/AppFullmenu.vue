<template>
  <v-slide-x-reverse-transition>
    <div class="fullMenu mt-2">
      <v-list class="d-flex flex-column align-end mr-5">
        <v-list-item width="300">
          <v-text-field
            class="w-5"
            density="compact"
            variant="outlined"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-btn elevation="0" icon>
            <v-icon>mdi-cart-outline</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            rounded="lg"
            class="site_font text-none font-weight-bold bg-yellow-darken-1"
            elevation="0"
            >Login</v-btn
          >
        </v-list-item>
        <v-list-item>
          <v-btn
            rounded="lg"
            class="site_font text-none font-weight-bold bg-light-blue-lighten-1"
            elevation="0"
            >Sign Up</v-btn
          >
        </v-list-item>
      </v-list>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  name: "AppFullmenu"
};
</script>

<style scoped>
.fullMenu {
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: absolute;
}
</style>
