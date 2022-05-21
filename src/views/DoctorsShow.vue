<template>
  <v-row v-if="times.length>0" justify="center" no-gutters>
    <v-col cols="11">
      <h2 class="pt-10 mb-4">رزرو نوبت </h2>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-list-item class="px-0">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">{{ doctor }}</v-list-item-title>
              <v-list-item-subtitle>نام پزشک</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" md="6">
          <v-list-item class="px-0">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">{{ date }}</v-list-item-title>
              <v-list-item-subtitle>تاریخ</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <p class="mt-4">لطفا یکی از زمان‌های زیر را جهت رزرو انتخاب کنید:</p>
      <v-chip-group
          v-model="form.time"
          active-class="primary white--text"
          class="px-0 py-4"
          column
      >
        <v-chip
            v-for="item in times"
            :key="item.id"
            :ripple="false"
            :value="item.id"
            class="ml-2 px-8 mb-2"
            large
        >
          <b>{{ item.start }} - {{ item.end }}</b>
        </v-chip>
      </v-chip-group>
      <v-btn
          :ripple="false"
          class="mt-2 px-8 exclusive"
          color="primaryLight"
          elevation="0"
          x-large
          @click="submit"
      >ثبت نهایی
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DoctorsShow",
  data: () => ({
    times: [],
    doctor: false,
    date: false,
    form: {
      time: false
    }
  }),
  computed: {},
  methods: {
    submit() {

      if (!this.form.time) {
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: 'انتخاب زمان رزرو الزامی است.',
          color: 'error'
        })
        return false
      }

      var data = new FormData()
      data.append('patient', this.$store.state.user.id)

      //get articles
      this.$store.getters.api({
        method: 'patch',
        url: `api/v1/diabetes_control/visits/add_patient/${this.form.time}`,
        data: data,
        loader: true
      }).then(() => {
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: 'نوبت انتخاب شده برای شما با موفقیت رزرو شد.',
          color: 'success'
        })
        this.$router.push({
          name: 'DashboardPatient'
        })
      }).catch((e) => {
        if (e.response.status == 400) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: 'نوبت انتخاب شده توسط بیمار دیگری رزرو شده است.',
            color: 'error'
          })
          this.$router.push({
            name: 'SearchDoctors'
          })
        }
        if (e.response.status == 401) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: 'توکن نامعتبر یا منقضی شده است',
            color: 'error'
          })
          this.$router.push({
            name: 'AuthPatient'
          })
        }
      })

    }
  },
  created() {
    var id = this.$route.params.id
    var date = this.$route.params.date
    var data = new FormData()
    data.append('doctor_id', id)
    data.append('date', date)

    //get articles
    this.$store.getters.api({
      method: 'post',
      url: `api/v1/diabetes_control/visits/available/retrieve/`,
      data: data,
      loader: true
    }).then((r) => {
      this.doctor = r.data.results[0].doctor
      this.date = this.$moment(new Date(date)).format('jYYYY/jMM/jDD')
      r.data.results.forEach((item) => {
        this.times.push({
          doctor: item.doctor,
          start: this.$moment(new Date(item.start_date)).format('HH:mm'),
          end: this.$moment(new Date(item.end_date)).format('HH:mm'),
          id: item.id
        })
      })
    }).catch((e) => {
      if (e.response.status == 404) {
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: 'موردی یافت نشد',
          color: 'error'
        })
        this.$router.push({
          name: 'SearchDoctors'
        })
      }
    })
  }
}
</script>

<style scoped>
</style>