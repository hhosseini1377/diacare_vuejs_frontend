<template>
  <v-bottom-sheet
      v-if="false"
      v-model="portfolioWarning"
      overlay-color="white"
      persistent
  >
    <v-sheet
        class="text-justify px-5 px-md-10 py-7 relative"
        color="white"
        elevation="10"
    >
      <!--persian-->
      <v-row dir="rtl" no-gutters align="center" v-show="warningLang == 'fa'">
        <!--logo-->
        <v-col cols="12" md="3" lg="2">
          <div
              class="ml-auto d-flex align-center"
              style="width: min-content"
          >
            <v-img
                :src="require(`@/assets/media/img/viranik/viranik-mark.svg`)"
                height="34px"
                width="34px"
                contain
                eager
            ></v-img>
            <v-img
                :src="require(`@/assets/media/img/viranik/viranik-fa-light.svg`)"
                height="22px"
                class="mr-1"
                contain
                eager
            ></v-img>
          </div>
        </v-col>

        <!--viranik-->
        <v-col cols="12" md="9" lg="10">
          <p>
            شما در حال مشاهده نمونه کار
            <a
                target="_blank"
                href="https://viranik.com/fa"
                rel="nofollow"
                class="purple--text font-weight-bold text-decoration-none"
            >گروه ویرانیک</a>
            هستید.<br>
            ممکن است با کلیک روی برخی از لینک‌ها شما مجددا این پیغام را مشاهده کنید. لطفا توجه داشته باشید که صفحات و اطلاعاتی که مشاهده می‌کنید آزمایشی و غیرواقعی هستند.
          </p>

          <v-btn
              rounded
              color="black"
              dark
              @click="portfolioWarning = false"
              style="letter-spacing: 0 !important;"
          >باشه</v-btn>
          <v-btn
              class="mr-2"
              text
              rounded
              @click="warningLang = 'en'"
          >
            English
          </v-btn>
        </v-col>
      </v-row>
      <!--english-->
      <v-row dir="ltr" no-gutters align="center" v-show="warningLang == 'en'">
        <!--logo-->
        <v-col cols="12" md="3" lg="2">
          <div
              class="mr-auto d-flex align-center"
              style="width: min-content"
          >
            <v-img
                :src="require(`@/assets/media/img/viranik/viranik-mark.svg`)"
                height="34px"
                width="34px"
                contain
                eager
            ></v-img>
            <v-img
                :src="require(`@/assets/media/img/viranik/viranik-en-light.svg`)"
                height="22px"
                class="ml-1"
                contain
                eager
            ></v-img>
          </div>
        </v-col>

        <!--viranik-->
        <v-col cols="12" md="9" lg="10">
          <p>
            This is
            <a
                target="_blank"
                href="https://viranik.com/en"
                rel="nofollow"
                class="purple--text font-weight-bold text-decoration-none"
            >ViRANiK Group</a>
            portfolio.<br>
            You may see this message again by clicking on some links. Please note that the pages and all informations are sample and unrealistic.
          </p>

          <v-btn
              rounded
              color="black"
              dark
              @click="portfolioWarning = false"
              style="letter-spacing: 0 !important;"
          >OK</v-btn>
          <v-btn
              class="ml-2"
              text
              rounded
              @click="warningLang = 'fa'"
              style="letter-spacing: 0 !important;"
          >
            فارسی
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "ViranikPortfolio",
  data: () => ({
    portfolioWarning: false,
    warningLang: 'fa'
  }),
  created() {
    //read warningLang from cookie
    let lang = localStorage.getItem('warning-lang')

    if(lang != undefined){
      this.warningLang = lang
    }

    //show warning every 24 hours
    let latestShow = localStorage.getItem('warning-latest')

    if([null, undefined].includes(latestShow) || latestShow < this.$moment().unix()){
      this.portfolioWarning = true

      localStorage.setItem('warning-latest', this.$moment().unix()+86400)
    }
  },
  watch: {
    warningLang(){
      localStorage.setItem('warning-lang', this.warningLang)
    },
    '$route.query.viranik': {
      handler(){
        if(![undefined, ''].includes(this.$route.query.viranik)){
          this.portfolioWarning = true
        }
      }
    }
  }
}
</script>

<style scoped>

</style>