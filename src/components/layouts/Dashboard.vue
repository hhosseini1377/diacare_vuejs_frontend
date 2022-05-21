<template>
  <div>
    <!--app bar-->
    <v-app-bar
        app
        class="px-md-4"
        color="dashboardBg"
        elevate-on-scroll
    >
      <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="px-0 mr-2 mr-md-0">
        <router-link
            :to="{
              name: 'LandingPage'
            }"
        >
          <v-img
              :src="require(`@/assets/media/img/logo.png`)"
              contain
              height="40px"
              position="right center"
          />
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
          color="accent"
          elevation="0"
          @click="signout"
      >
        <v-icon class="ml-1" size="20">logout</v-icon>
        خروج
      </v-btn>
    </v-app-bar>

    <!--navigation drawer-->
    <v-navigation-drawer
        v-model="drawer"
        app
        color="white"
        mobile-breakpoint="960"
        right
        touchless
    >
      <v-sheet
          class="pa-4"
          color="grey lighten-5"
      >
        <v-avatar
            class="white--text text-h5 text-uppercase"
            color="amber darken-2"
            size="56"
        >{{ $store.state.user.email[0] }}
        </v-avatar>

        <div class="mt-2 font-weight-bold">{{ $store.state.user.email }}</div>

        <!--<div class="grey&#45;&#45;text text-body-2">email@example.com</div>-->
      </v-sheet>

      <v-list class="pt-0">
        <v-list-item
            v-for="(item, i) in menu"
            :key="`dashboard-menu-${i}`"
            :to="item.link?item.link:''"
            active-class="accent--text no-bg"
            exact
            link @click="item.func?callThis(item.func):false"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--main-->
    <v-main>
      <div class="pa-4 pa-md-8 pt-2">
        <router-view/>
      </div>
      <!--ViRANiK-->
      <div v-if="false" class="my-4 d-flex align-center justify-center">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <a
                href="https://www.viranik.com"
                target="_blank"
                v-bind="attrs"
                v-on="on"
            >
              <img
                  :height="17"
                  :src="require(`@/assets/media/img/viranik/viranik-en-light.svg`)"
              />
            </a>
          </template>
          <span>طراحی و توسعه توسط ویرانیک</span>
        </v-tooltip>
      </div>
    </v-main>

    <!--viranik portfolio-->
    <viranik-portfolio/>
  </div>
</template>

<script>
import ViranikPortfolio from "../parts/ViranikPortfolio";

export default {
  name: 'Main',
  components: {
    ViranikPortfolio
  },
  props: {},
  data: () => ({
    drawer: false,
  }),
  computed: {
    queries() {
      //define empty query var
      let query = {}

      //read current query of the route
      Object.keys(this.$route.query).forEach((item) => {
        this.$set(query, item, this.$route.query[item])
      })

      return query
    },
    userType() {
      return [
        'DashboardDoctor',
        'VisitDetailDoctor',
        'AddArticle',
        'AddPrescription',
      ].includes(this.$route.name) ? 'doctor' : 'patient'
    },
    menu() {
      let patient = [
        {
          icon: 'dashboard',
          text: 'داشبورد',
          link: {
            name: 'DashboardPatient'
          }
        },
        {
          icon: 'person_search',
          text: 'جستجوی پزشکان',
          link: {
            name: 'SearchDoctors'
          }
        },
        /*{
          icon: 'monitor_heart',
          text: 'ویزیت های شما',
          link: '#my-visits'
        },
        {
          icon: 'assignment_ind',
          text: 'پروفایل',
          link: '#my-profile'
        },
        {
          icon: 'password',
          text: 'تغییر گذرواژه',
          link: '#change-password'
        },*/
        {
          icon: 'logout',
          text: 'خروج',
          link: false,
          func: 'signout'
        }
      ]

      let doctor = [
        {
          icon: 'dashboard',
          text: 'داشبورد',
          link: {
            name: 'DashboardDoctor'
          }
        },
        {
          icon: 'note_add',
          text: 'افزودن مقاله',
          link: {
            name: 'AddArticle'
          }
        },
        /*{
          icon: 'monitor_heart',
          text: 'ویزیت های شما',
          link: '#my-visits'
        },
        {
          icon: 'edit_calendar',
          text: 'مدیریت نوبت ها',
          link: '#turns-management'
        },
        {
          icon: 'assignment_ind',
          text: 'پروفایل',
          link: '#my-profile'
        },
        {
          icon: 'password',
          text: 'تغییر گذرواژه',
          link: '#change-password'
        },*/
        {
          icon: 'logout',
          text: 'خروج',
          link: false,
          func: 'signout'
        }
      ]

      let items = patient

      if (this.userType == 'doctor') {
        items = doctor
      }

      return items
    }
  },
  methods: {
    callThis(func) {
      this[func]()
    },
    signout() {
      this.$store.commit('setUser', false)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      localStorage.removeItem('remember')
      localStorage.removeItem('access_token_time')
      //show snackbar
      this.$store.commit('setSnackbar', {
        show: this.$moment().unix(),
        time: 2000,
        message: 'خروج موفقیت آمیز',
        color: 'green'
      })

      this.$router.push({
        name: 'LandingPage'
      })
    }
  },
  created() {
    this.drawer = this.$vuetify.breakpoint.mdAndUp

  },
  watch: {}
};
</script>

<style>
#app {
  background: #F6F8FB !important;
}

.v-navigation-drawer {
  box-shadow: 4px 0px 16px rgba(16, 30, 115, 0.08);
}
</style>