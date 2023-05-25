<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import AppHome from "./components/AppHome.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    AppHome
  },
  data() {
    return {
      fullmenuToggle: false
    };
  },
  methods: {
    showFullmenu() {
      this.fullmenuToggle = !this.fullmenuToggle;
    }
  }
};
</script>

<template>
  <AppHeader @showFullmenu="showFullmenu"></AppHeader>
  <template>
    <div v-show="fullmenuToggle" class="fullscreenMenu">check</div>
  </template>
  <AppHome></AppHome>
  <AppFooter></AppFooter>
</template>

<style>
.fullscreenMenu {
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 100;
}
</style>
