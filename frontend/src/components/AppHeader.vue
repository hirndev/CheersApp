<script>
export default {
  name: "AppHeader",
  mounted() {
    /* Could use CSS media Queries with "display: contents/none" for this, but this help me check if the fullscreenMenu is open/close */
    window.addEventListener("load", this.checkScreen);
    window.addEventListener("resize", this.checkScreen);
  },
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
        this.fullscreenMenu = false;
      }
    },
    burgerClicked() {
      this.fullscreenMenu = !this.fullscreenMenu;
      // this.$emit("showFullmenu");
    }
  }
};
</script>

<template>
  <!-- bg-grey-lighten-1 -->
  <v-card>
    <v-layout>
      <v-app-bar class="navbar container" elevation="4">
        <img class="logo_img" src="../assets/aiwa_logo_nobg.png" />
        <v-app-bar-title class="logo_text">Ai Wall Art</v-app-bar-title>

        <v-card v-show="!screenSmall" style="padding-right: 5vw" elevation="0">
          <v-responsive max-width="300">
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

          <v-btn @click.prevent="searchBar = !searchBar" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn rounded="lg" class="site_font text-none font-weight-bold mr-1 bg-yellow-darken-1"
            >Login</v-btn
          >
          <v-btn
            rounded="lg"
            class="site_font text-none font-weight-bold ml-1 bg-light-blue-lighten-1"
            >Sign Up</v-btn
          >
          <v-btn icon>
            <v-icon>mdi-cart-outline</v-icon>
          </v-btn>
        </v-card>

        <div v-show="screenSmall" style="padding-right: 4vw">
          <v-btn v-show="!fullscreenMenu" @click.prevent="burgerClicked" icon>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-btn v-show="fullscreenMenu" @click.prevent="burgerClicked" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-app-bar>

      <v-navigation-drawer class="w-50" v-model="fullscreenMenu" location="right" temporary>
        <v-list class="fullmenu d-flex flex-column align-end mr-5">
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
      </v-navigation-drawer>

      <v-main></v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&display=swap");
.logo_text {
  font-family: "Dancing Script", cursive;
  font-size: 2rem;
}
.logo_img {
  height: 3rem;
}
.fullMenu {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
}
</style>
