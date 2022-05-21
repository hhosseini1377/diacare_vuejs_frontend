<template>
  <div class="main-layout">
    <div class="circular-bg isblue"></div>
    <div class="circular-bg isblue second"></div>
    <!--app bar-->
    <v-app-bar
        color="transparent"
        elevation="0"
    >
      <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="px-0">
        <router-link
            :to="{
              name: 'LandingPage'
            }"
        >
          <v-img
              :src="require(`@/assets/media/img/logo.png`)"
              height="40px"
              :width="$vuetify.breakpoint.xsOnly?40:''"
              :contain="$vuetify.breakpoint.xsOnly?false:true"
              position="right center"
              class="mr-1 mr-md-0"
          />
        </router-link>
      </v-toolbar-title>

      <div class="hidden-sm-and-down">
        <v-btn
            text exact
            v-for="(item, i) in menu"
            :key="`topmenu-${i}`"
            :to="item.link"
            active-class="accent--text"
            class="ml-1"
        >
          {{ item.text }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-btn
          elevation="0"
          v-if="$store.state.user.role=='expert'"
          color="secondaryLight"
          class="exclusive ml-1"
          :to="{
            name: 'DashboardDoctor'
          }"
      >
        داشبورد
      </v-btn>
      <v-btn
          elevation="0"
          v-if="$store.state.user.role=='patient'"
          color="primaryLight"
          class="exclusive ml-1"
          :to="{
            name: 'DashboardPatient'
          }"
      >
        داشبورد
      </v-btn>
      <v-btn
          elevation="0"
          v-if="!$store.state.user"
          color="secondaryLight"
          class="exclusive ml-1"
          :to="{
            name: 'AuthDoctor'
          }"
      >
        ورود پزشکان
      </v-btn>
      <v-btn
          elevation="0"
          v-if="!$store.state.user"
          color="primaryLight"
          class="exclusive"
          :to="{
            name: 'AuthPatient'
          }"
      >
        ورود بیماران
      </v-btn>
    </v-app-bar>

    <!--navigation-drawer-->
    <v-navigation-drawer
        app right touchless
        disable-resize-watcher
        overlay-color="white"
        v-model="drawer"
    >
      <router-link
          :to="{
              name: 'LandingPage'
            }"
      >
        <v-img
            :src="require(`@/assets/media/img/logo.png`)"
            height="40px"
            contain
            position="right center"
            class="mx-3 mr-md-0 my-4"
        />
      </router-link>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="(item, i) in menu"
            :key="`navimenu-${i}`"
            :to="item.link"
            active-class="accent--text"
            exact
            link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--main-->
    <v-main>
      <router-view />
      <!--ViRANiK-->
      <div class="my-4 d-flex align-center justify-center" v-if="false">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <a
                href="https://www.viranik.com"
                target="_blank"
                v-bind="attrs"
                v-on="on"
            >
              <img
                  :src="require(`@/assets/media/img/viranik/viranik-en-light.svg`)"
                  :height="17"
              />
            </a>
          </template>
          <span>طراحی و توسعه توسط ویرانیک</span>
        </v-tooltip>
      </div>
    </v-main>

    <!--viranik portfolio-->
    <viranik-portfolio />
  </div>
</template>

<script>
import ViranikPortfolio from "../parts/ViranikPortfolio";

export default {
  name: 'Main',
  components: {
    ViranikPortfolio
  },
  props: {
  },
  data: () => ({
    drawer: false,
  }),
  computed:{
    queries(){
      //define empty query var
      let query = {}

      //read current query of the route
      Object.keys(this.$route.query).forEach((item) => {
        this.$set(query, item, this.$route.query[item])
      })

      return query
    },
    menu(){
      let items = [
        {
          text: 'صفحه اصلی',
          link: {
            name: 'LandingPage'
          }
        },
        {
          text: 'مقالات',
          link: {
            name: 'ArticlesArchive'
          }
        },
        {
          text: 'برنامه غذایی رایگان',
          link: {
            name: 'FreePlan'
          }
        },
        {
          text: 'برنامه کنترل دیابت',
          link: {
            name: 'SearchDoctors'
          }
        },
      ]

      return items
    }
  },
  methods: {
    callThis(func){
      this[func]()
    }
  },
  created() {},
  watch: {}
};
</script>

<style>
#app{
  background: #F0F2F5 !important;
}
</style>