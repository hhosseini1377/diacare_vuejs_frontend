<template>
  <div>
    <!--hero-->
    <horizontal-banner
        :img="require(`@/assets/media/img/searchdoctors-hiro.webp`)"
    >
      <template slot="content">
        <h1 class="heading">برنامه کنترل دیابت</h1>
        <h2 class="heading">توسط بهترین پزشک‌ها</h2>
        <p class="my-7">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت
          فراوان جامعه و متخصصان را می طلبد.</p>
      </template>
    </horizontal-banner>

    <!--form-->
    <v-row justify="center" no-gutters>
      <v-col cols="11" lg="7" md="9" sm="10">
        <box title="">
          <template slot="content">
            <div class="title">لطفا نام پزشک و تاریخ موردنظر خود را برای ویزیت وارد کنید:</div>
            <v-row class="my-6" no-gutters>
              <v-col class="pl-sm-2" cols="12" sm="6">
                <!--`پزشک`-->
                <v-text-field
                    v-model="form.name"
                    :filled="$env.btn.filled"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    dir="rtl"
                    hide-details
                    label="نام پزشک"
                    placeholder=""
                ></v-text-field>
              </v-col>
              <v-col class="pr-sm-2 pt-4 pt-sm-0" cols="12" sm="6">
                <!--تاریخ-->
                <v-text-field
                    :error-messages="errors.date?errors.date[0]:''"
                    :filled="$env.btn.filled"
                    :hide-details="errors.date?false:true"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    :value="form.date!=null?$moment(new Date(form.date)).format('jYYYY/jMM/jDD'):''"
                    class="mb-4"
                    dir="rtl"
                    label="تاریخ"
                    placeholder=""
                    readonly
                    @click="showPicker=true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
                class="exclusive"
                color="primaryLight"
                elevation="0"
                x-large
                @click="submit"
            >جستجو
            </v-btn>
          </template>
        </box>
      </v-col>
    </v-row>
    <viradate-picker
        v-model="form.date"
        :auto-submit="true"
        :inline="false"
        :min="$moment().locale('en').format('YYYY-MM-DD')"
        :range="false"
        :show="showPicker"
        custome-input=".ok"
        element="id"
        format="YYYY-MM-DD"
        type="date"
        @close="showPicker = false"
    ></viradate-picker>

    <!--result list-->
    <v-row v-if="![null,''].includes(doctors) && doctors.length>0" class="mt-10" justify="center" no-gutters>
      <v-col cols="11">
        <div class="px-4 mt-16 text-sm-h6 text-lg-h5 font-weight-bold"> لیست پزشکان
        </div>
        <div class="px-4 mb-10 mt-4 text-body-1 text-md-h6">لطفا جهت رزرو نوبت یک پزشک را از لیست زیر انتخاب کنید.</div>
        <v-row no-gutters>
          <v-col
              v-for="(item, i) in doctors" :key="`article-${i}`"
              class="pa-4"
              cols="12"
              lg="3"
              md="4"
              sm="6"
              xl="2"
          >
            <doctor-card
                :link="{
              name: 'DoctorsShow',
              params: {
                id: item.id,
                date: form.date
              }
            }"
                :name="item.name"
                :times="item.times">
            </doctor-card>
          </v-col>
        </v-row>
        <v-pagination
            v-if="total>10"
            v-model="page"
            :length="(total%10==0)?Math.floor(total/10):Math.floor(total/10)+1"
            :total-visible="5"
            circle
            class="mt-8"
            color="primaryLight"
        ></v-pagination>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import HorizontalBanner from "../components/parts/HorizontalBanner";
import Box from "../components/parts/Box";
import DoctorCard from "@/components/cards/DoctorCard";

export default {
  name: "SearchDoctors",
  components: {DoctorCard, Box, HorizontalBanner},
  data: () => ({
    showPicker: false,
    errors: false,
    form: {
      name: null,
      date: null,
    },
    defaults: {
      name: null,
      date: null,
    },
    doctors: false,
    page: 1,
    total: false,
  }),
  computed: {
    filled() {
      return JSON.stringify(this.form) === JSON.stringify(this.defaults)
    },
  },
  methods: {
    submit() {
      this.errors = false

      if (!this.$store.state.user) {
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: 'برای رزرو نوبت به حساب کاربری خود وارد شوید.',
          color: 'warning'
        })
        this.$router.push({
          name: 'AuthPatient'
        })
        return false
      }

      if ([null, ''].includes(this.form.date)) {
        this.errors = {
          date: [
            'انتخاب تاریخ الزامی است.'
          ]
        }
        return false
      }

      this.getDoctors()
    },
    getDoctors() {
      this.doctors = null
      var name = ([null, ''].includes(this.form.name)) ? '' : 'name=' + this.form.name + '&'
      this.$store.getters.api({
        method: 'get',
        url: `api/v1/diabetes_control/visits/available/search/per_doctor?${name}date=${this.form.date}&limit=10&offset=${this.page == 1 ? 0 : (this.page - 1) * 10}`,
        data: null,
        loader: true
      }).then((r) => {
        if (r.data.count == 0) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: 'نوبتی برای رزرو یافت نشد.',
            color: 'error'
          })
        } else {
          this.doctors = []
          this.total = r.data.count
          r.data.results.forEach((item) => {
            this.doctors.push({
              name: `${item.doctor_name} ${item.doctor_last_name} `,
              times: item.available_times,
              id: item.doctor
            })
          })
        }
      }).catch((e) => {
        if (e.response.status == 400) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: e.response.data.message,
            color: 'error'
          })
        } else if (e.response.status == 401) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: 'توکن نامعتبر یا منقضی شده است',
            color: 'error'
          })

          this.$router.push({
            name: 'AuthPatient'
          })
        } else if (e.response.status == 404) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: 'نوبتی برای رزرو یافت نشد.',
            color: 'error'
          })
        }
      })
    }
  },
  created() {
    if (this.$store.state.user.role == 'expert') {
      this.$store.commit('setSnackbar', {
        show: this.$moment().unix(),
        time: 2000,
        message: 'دسترسی غیر مجاز',
        color: 'error'
      })
      this.$router.push({
        name: 'LandingPage'
      })
      return false
    }

    if (this.$route.query.page) {
      this.page = parseInt(this.$route.query.page)
    }
  },
  watch: {
    page() {
      this.$router.push({
        name: 'SearchDoctors',
        query: {
          page: this.page
        }
      })
      this.getDoctors()
    }
  }
}
</script>

<style scoped>
</style>