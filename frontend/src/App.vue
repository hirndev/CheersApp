<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import AppHome from "./components/AppHome.vue";
import AppFullmenu from "./components/AppFullmenu.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFullmenu,
    AppFooter,
    AppHome
  },
  data() {
    return {
      fullmenuToggle: false,
      homeComponent: "AppHome"
    };
  },
  methods: {
    showFullmenu() {
      this.fullmenuToggle = !this.fullmenuToggle;
    },
    checkfullscreenMenu() {
      if (window.innerWidth >= 800) {
        this.fullmenuToggle = false;
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.checkfullscreenMenu);
  },
  watch: {
    fullmenuToggle() {
      if (this.fullmenuToggle === true) {
        this.homeComponent = "AppFullmenu";
      } else {
        this.homeComponent = "AppHome";
      }
    }
  }
};
</script>

<template>
  <AppHeader @showFullmenu="showFullmenu"></AppHeader>
  <KeepAlive>
    <component :is="homeComponent"></component>
  </KeepAlive>
  <AppFooter v-show="!fullmenuToggle"></AppFooter>
</template>

<style scoped></style>
