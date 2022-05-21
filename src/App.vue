<template>
  <v-app id="app">
    <!--loader-->
    <v-progress-linear
        indeterminate
        height="5"
        color="accent"
        fixed
        v-show="$store.state.onLoad"
        style="z-index: 1000"
    ></v-progress-linear>
    
    <!--layout-->
    <component
        :is="this.$route.meta.layout"
    ></component>

    <!--snackbar-->
    <v-snackbar
        style="position: fixed"
        right bottom
        v-model="snackbarCtrl"
        :timeout="$store.state.snackbar.time"
        width="auto"
        min-width="0"
        min-height="0"
        :color="$store.state.snackbar.color"
        rounded="pill"
        class="ma-0"
        content-class="text-center col-12 text-body-2 pa-0"
    >
      <div @click="snackbarCtrl = false" class="pointer px-3 py-2">
        <v-avatar
            :class="`ml-1`"
            size="28"
            color="rgba(0,0,0,0.2)"
        >
          <v-icon size="20">info_outline</v-icon>
        </v-avatar>
        {{ $store.state.snackbar.message }}
      </div>
    </v-snackbar>
  </v-app>
</template>

<script>
import Main from "@/components/layouts/Main"
import Blank from "@/components/layouts/Blank"
import Dashboard from "@/components/layouts/Dashboard"

export default {
  name: 'App',
  components: {
    Main,
    Blank,
    Dashboard
  },
  data: () => ({
    snackbarCtrl: false,
  }),
  computed: {
    snackbarShow(){
      return this.$store.state.snackbar.show
    }
  },
  created() {},
  methods: {},
  watch: {
    snackbarShow: {
      handler(){
        this.snackbarCtrl = true
      }
    }
  }
}
</script>

<style>
@import './assets/style/general.css';
</style>