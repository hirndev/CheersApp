<template>
  <div class="desktop_container w-100">
    <!-- HEADER CARDS: SEARCH, SELECT SEATING etc -->
    <AppHeaderCards>
      <!-- SET-CATEGORY, HEADER CARD-->
      <v-row no-gutters>
        <v-col cols="4">
          <RouterLink
            :to="{ name: 'menu', params: { category: 'drinks' } }"
            class="router_link_decoration"
          >
            <v-card class="mx-1 mb-2 pa-4 bg-black d-flex justify-center align-center" rounded="lg">
              <v-icon icon="mdi-glass-mug-variant" size="x-large"></v-icon>
            </v-card>
          </RouterLink>
        </v-col>
        <v-col cols="4">
          <RouterLink
            :to="{ name: 'menu', params: { category: 'food' } }"
            class="router_link_decoration"
          >
            <v-card class="mx-1 mb-2 pa-4 bg-black d-flex justify-center align-center" rounded="lg">
              <v-icon icon="mdi-hamburger" size="x-large"></v-icon>
            </v-card>
          </RouterLink>
        </v-col>
        <v-col cols="4">
          <RouterLink
            :to="{ name: 'menu', params: { category: 'softdrinks' } }"
            class="router_link_decoration"
          >
            <v-card class="mx-1 mb-2 pa-4 bg-black d-flex justify-center align-center" rounded="lg">
              <v-icon icon="mdi-beer" size="x-large"></v-icon>
            </v-card>
          </RouterLink>
        </v-col>
      </v-row>
      <!-- SET-SUBCATEGORY, HEADER CARD-->
      <v-card
        v-if="this.$route.params.category === 'drinks'"
        class="bg-grey-darken-4 my-2 pa-2 text-center desktop_container"
        rounded="lg"
        elevation="6"
      >
        <v-card-title class="site_font text-white"> What would you like to drink? </v-card-title>
        <v-btn
          v-if="setSubCategory !== ''"
          class="bg-black site_font"
          size="x-large"
          rounded="lg"
          @click="dialogCategory = true"
          block
        >
          {{ setSubCategory }}
        </v-btn>
        <v-btn
          v-else
          class="bg-black site_font"
          size="x-large"
          rounded="lg"
          @click="dialogCategory = true"
          block
        >
          Select Category
        </v-btn>
      </v-card>
    </AppHeaderCards>

    <!-- CATEGORY DIALOG WINDOW -->
    <v-dialog
      v-model="dialogCategory"
      class="bg-grey-lighten-2"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card class="container">
        <v-toolbar class="bg-black" dark>
          <v-toolbar-title class="site_font">Category</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="dialogCategory = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <label class="site_font text-h4 text-center my-5 mx-5">What would you like to drink?</label>
        <div class="desktop_container w-100">
          <v-list>
            <v-list-item v-for="subType of subcategory" :key="subType">
              <v-btn
                @click="selectedSubCategory(subType)"
                class="bg-black w-100 site_font btn_font"
                size="x-large"
                rounded="lg"
                elevation="0"
              >
                {{ subType }}
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                @click="selectedSubCategory()"
                class="bg-yellow-darken-3 w-100 site_font btn_font"
                size="x-large"
                rounded="lg"
                elevation="0"
              >
                Anything
              </v-btn>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-dialog>

    <!-- MENU PANELS -->
    <v-expansion-panels class="my-4">
      <v-expansion-panel
        class="bg-grey-lighten-1"
        v-for="menuItem of cartStore.menuItems"
        :key="menuItem._id"
        rounded="lg"
        elevation="6"
      >
        <v-badge
          icon="mdi-exclamation-thick"
          color="red-darken-3"
          class="w-100 mb-4"
          style="position: absolute"
          v-if="menuItem.outofstock === true"
        >
        </v-badge>
        <v-badge
          color="blue-darken-3"
          class="w-100 mb-4"
          style="position: absolute"
          v-if="menuItem.quantity !== 0 && menuItem.outofstock === false"
          :content="menuItem.quantity"
        >
        </v-badge>
        <v-expansion-panel-title>
          <div class="w-100 d-flex flex-row justify-space-between align-center">
            <div class="d-flex flex-column w-75">
              <label class="text-h6 site_font">{{ menuItem.title }}</label>
              <label class="mt-2 text-grey site_font">{{ menuItem.desc }}</label>
              <div>
                <v-chip class="mt-2" color="" v-if="setSubCategory === '' && menuItem.subcategory">
                  {{ menuItem.subcategory }}
                </v-chip>
              </div>
            </div>
            <label class="price_font site_font mx-2" style="flex-wrap: nowrap"
              >£ {{ menuItem.price }}</label
            >
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text v-if="menuItem.outofstock === true">
          <v-card class="d-flex flex-row align-center justify-end bg-transparent" elevation="0">
            <label>Out of Stock!</label>
          </v-card>
        </v-expansion-panel-text>
        <v-expansion-panel-text v-if="menuItem.outofstock === false">
          <v-card class="d-flex flex-row align-center justify-end bg-transparent" elevation="0">
            <v-btn class="ma-2 bg-red" @click="removingFromCart(menuItem._id)" elevation="4" icon>
              <v-icon>mdi-minus-thick</v-icon>
            </v-btn>
            <label class="mx-2 text-h6 site_font">{{ menuItem.quantity }}</label>
            <v-btn class="ma-2 bg-green" @click="addingToCart(menuItem._id)" elevation="4" icon>
              <v-icon>mdi-plus-thick</v-icon>
            </v-btn>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import AppHeaderCards from "@/components/AppHeaderCards.vue";
import { mapStores } from "pinia";
import useCartStore from "@/stores/cart";

export default {
  name: "MenuView",
  data() {
    return {
      /* Make *category/subcategory dynamic later */
      subcategory: ["Beers", "World Beers", "Ale", "Whiskey", "Vodka", "Rum"],
      setSubCategory: "",
      dialogCategory: false,
      category: this.$route.params.category
    };
  },
  methods: {
    selectedSubCategory(selected) {
      this.dialogCategory = false;
      if (selected) {
        this.setSubCategory = selected;
        this.cartStore.menuItems = this.cartStore.menu.filter((item) => {
          return item.subcategory === selected;
        });
      } else {
        this.setSubCategory = "";
        this.cartStore.menuItems = this.cartStore.menu.filter((item) => {
          return item.category === this.cartStore.category;
        });
      }
    },
    addingToCart(id) {
      this.cartStore.addToCart(id);
    },
    removingFromCart(id) {
      this.cartStore.removeFromCart(id);
    }
  },
  computed: {
    ...mapStores(useCartStore)
  },
  mounted() {
    this.cartStore.fetchMenu(this.category);
  },
  updated() {
    if (this.category !== this.$route.params.category) {
      this.category = this.$route.params.category;
      this.cartStore.fetchMenu(this.$route.params.category);
      this.setSubCategory = "";
    }
  },
  components: {
    AppHeaderCards
  }
};
</script>

<style scoped></style>
