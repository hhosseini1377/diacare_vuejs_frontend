<template>
  <v-container class="fill-height" fluid>
    <div class="circular-bg isgreen"></div>
    <div class="circular-bg isgreen second"></div>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" lg="7" md="8" sm="7" xl="6">
        <box v-if="step == 1" title="ورود/عضویت پزشکان">
          <template slot="content">
            <v-row no-gutters>
              <!--signin-->
              <v-col class="pl-md-12 pl-lg-14" cols="12" md="6">
                <v-card-subtitle class="px-0 text-body-1 text-md-h6">ورود به حساب</v-card-subtitle>
                <v-text-field
                    v-model="signinForm.email"
                    :filled="$env.btn.filled"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    color="secondary"
                    dir="ltr"
                    hide-details
                    label="ایمیل"
                >
                </v-text-field>
                <v-text-field
                    v-model="signinForm.password"
                    :filled="$env.btn.filled"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    color="secondary"
                    dir="ltr"
                    hide-details
                    label="گذرواژه"
                    type="password"
                >
                </v-text-field>
                <v-btn
                    :to="{
                      name: 'LostPassDoctor'
                    }"
                    color="secondary"
                    small
                    text
                >
                  گذرواژه خود را فراموش کرده اید؟
                </v-btn>
                <v-btn
                    class="d-block mt-6 exclusive"
                    color="secondaryLight"
                    elevation="0"
                    large
                    @click="signin"
                >
                  ورود
                </v-btn>
                <v-checkbox
                    :ripple="false"
                    class="pt-0 mt-6"
                    color="secondary"
                    hide-details
                >
                  <template v-slot:label>
                    <div class="text-justify text-body-2">
                      مرا به خاطر بسپار
                    </div>
                  </template>
                </v-checkbox>
                <v-divider class="hidden-md-and-up mt-10 mb-8"></v-divider>
              </v-col>
              <v-divider class="hidden-sm-and-down" vertical></v-divider>
              <!--signup-->
              <v-col class="pr-md-12 pr-lg-14" cols="12" md="6">
                <v-card-subtitle class="px-0 text-body-1 text-md-h6">ایجاد حساب جدید</v-card-subtitle>
                <v-text-field
                    v-model="registerForm.firstname"
                    :error-messages="signup_errors.first_name?signup_errors.first_name[0]:''"
                    :filled="$env.btn.filled"
                    :hide-details="!signup_errors.first_name"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    color="secondary"
                    label="نام"
                ></v-text-field>
                <v-text-field
                    v-model="registerForm.lastname"
                    :error-messages="signup_errors.last_name?signup_errors.last_name[0]:''"
                    :filled="$env.btn.filled"
                    :hide-details="!signup_errors.last_name"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    color="secondary"
                    label="نام خانوادگی"
                ></v-text-field>
                <v-text-field
                    v-model="registerForm.mobile"
                    :error-messages="signup_errors.phone?signup_errors.phone[0]:''"
                    :filled="$env.btn.filled"
                    :hide-details="!signup_errors.phone"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    color="secondary"
                    dir="ltr"
                    label="موبایل"
                >
                </v-text-field>
                <v-text-field
                    v-model="registerForm.email"
                    :error-messages="signup_errors.email?signup_errors.email[0]:''"
                    :filled="$env.btn.filled"
                    :hide-details="!signup_errors.email"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    color="secondary"
                    dir="ltr"
                    label="ایمیل"
                >
                </v-text-field>
                <v-text-field
                    v-model="registerForm.password"
                    :error-count="signup_errors.password?signup_errors.password.length:0"
                    :error-messages="signup_errors.password?signup_errors.password:''"
                    :filled="$env.btn.filled"
                    :hide-details="!signup_errors.password"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    color="secondary"
                    dir="ltr"
                    label="گذرواژه انتخابی"
                    type="password"
                >
                </v-text-field>
                <v-text-field
                    v-model="registerForm.repassword"
                    :error-messages="signup_errors.password2?signup_errors.password2[0]:''"
                    :filled="$env.btn.filled"
                    :hide-details="!signup_errors.password2"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    color="secondary"
                    dir="ltr"
                    label="تکرار گذرواژه انتخابی"
                    type="password"
                >
                </v-text-field>
                <v-btn
                    class="d-block mt-6 exclusive"
                    color="secondaryLight"
                    elevation="0"
                    large
                    @click="signup"
                >
                  عضویت
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </box>
        <box v-else-if="step == 2" title="تکمیل عضویت">
          <template slot="content">
            <div class="text-center">
              <v-icon
                  class="my-4"
                  color="success"
                  size="68"
              >check_circle
              </v-icon>
              <p>{{ resp }}</p>
            </div>
          </template>
        </box>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Box from "../../components/parts/Box";

export default {
  name: "AuthPatient",
  components: {Box},
  data: () => ({
    step: 1,
    signinForm: {
      email: '',
      password: '',
      remember: ''
    },
    registerForm: {
      username: '',
      email: '',
      mobile: '',
      password: '',
      repassword: '',
      lastname: '',
      firstname: '',
    },
    resp: false,
    signin_errors: {},
    signup_errors: {}
  }),
  computed: {},
  methods: {
    signin() {
      this.signin_errors = {}

      var data = new FormData()
      data.append('email', this.signinForm.email)
      data.append('password', this.signinForm.password)

      this.$store.getters.api({
        method: 'post',
        url: 'api/v1/account/login/',
        data: data,
        loader: true
      }).then((r) => {
        localStorage.setItem('access_token', r.data.access_token)
        localStorage.setItem('refresh_token', r.data.refresh_token)
        localStorage.setItem('user', JSON.stringify(r.data))
        if (this.signinForm.remember)
          localStorage.setItem('remember', this.signinForm.remember)
        localStorage.setItem('access_token_time', this.$moment().add(3,'hours').unix())

        this.$store.commit('setUser', r.data)

        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: 'ورود موفقیت آمیز',
          color: 'success'
        })

        //redirect to dashboard
        this.$router.push({
          name: 'DashboardDoctor'
        })
      }).catch((e) => {
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: e.response.data.message,
          color: 'error'
        })
      })
    },
    signup() {
      this.signup_errors = {}

      var data = new FormData()
      data.append('first_name', this.registerForm.firstname)
      data.append('last_name', this.registerForm.lastname)
      data.append('email', this.registerForm.email)
      data.append('phone', this.registerForm.mobile)
      data.append('password', this.registerForm.password)
      data.append('password2', this.registerForm.repassword)
      data.append('role', 'expert')

      this.$store.getters.api({
        method: 'post',
        url: 'api/v1/account/register/',
        data: data,
        loader: true
      }).then((r) => {
        this.resp = r.data.resp
        this.step = 2
      }).catch((e) => {
        this.signup_errors = e.response.data
      })
    }
  },
}
</script>

<style scoped>
</style>