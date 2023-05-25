<script>
export default {
  name: "AppHeader",
  data() {
    return {
      searchBar: false /* 0 is Hidden, 1 is Show */,
      screenSmall: true,
      fullscreenMenu: false
    };
  },
  methods: {
    checkScreen() {
      if (window.innerWidth <= 800) {
        this.screenSmall = true;
      } else {
        this.screenSmall = false;
      }
    },
    burgerClicked() {
      this.fullscreenMenu = !this.fullscreenMenu;
      this.$emit("showFullmenu");
    }
  },
  mounted() {
    window.addEventListener("load", this.checkScreen);
    window.addEventListener("resize", this.checkScreen);
  }
};
</script>

<template>
  <!-- bg-grey-lighten-1 -->
  <v-toolbar height="82" class="navbar container" elevation="4">
    <img class="logo_img" src="../assets/aiwa_logo_nobg.png" />
    <v-toolbar-title class="logo_text">Ai Wall Art</v-toolbar-title>

    <v-responsive max-width="300" v-show="!screenSmall">
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
    </v-responsive>

    <v-btn @click="searchBar = !searchBar" v-show="!screenSmall" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn
      rounded="lg"
      class="site_font text-none font-weight-bold mr-1 bg-yellow-darken-1"
      v-show="!screenSmall"
      >Login</v-btn
    >
    <v-btn
      rounded="lg"
      class="site_font text-none font-weight-bold ml-1 bg-light-blue-lighten-1"
      v-show="!screenSmall"
      >Sign Up</v-btn
    >
    <v-btn v-show="!screenSmall" icon>
      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>

    <div v-show="screenSmall">
      <v-btn v-show="!fullscreenMenu" @click="burgerClicked" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn v-show="fullscreenMenu" @click="burgerClicked" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&display=swap");
.logo_text {
  font-family: "Dancing Script", cursive;
  font-size: 2rem;
}
.logo_img {
  height: 3rem;
}
.fullMenu_toolbar {
  top: 82;
  background-color: black;
}
</style>
