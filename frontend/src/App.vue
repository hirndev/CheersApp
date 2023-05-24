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
  }
};
</script>

<template>
  <AppHeader></AppHeader>
  <AppHome></AppHome>
  <AppFooter></AppFooter>
</template>

<style></style>
