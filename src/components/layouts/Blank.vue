<template>
  <div class="fill-height">
    <div>
      <v-row no-gutters justify="center" class="mt-6">
        <v-col cols="12" sm="7" md="8" lg="7" xl="6">
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
                class="mr-10 mr-md-16"
                style="z-index: 1;"
            />
          </router-link>
        </v-col>
      </v-row>
      <router-view></router-view>
      <!--ViRANiK-->
      <div class="my-4 d-flex justify-center" v-if="false">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <a
                href="https://www.viranik.com"
                target="_blank"
                v-bind="attrs"
                v-on="on"
                style="z-index: 1;"
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blank',
};
</script>

<style>
#app{
  background: #E5E5E5;
}
</style>
