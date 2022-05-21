<template>
  <v-container class="fill-height" fluid>
    <div class="circular-bg isblue"></div>
    <div class="circular-bg isblue second"></div>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" sm="7" md="6" lg="5" xl="4">
        <box title="فراموشی گذرواژه بیماران">
          <template slot="content">
            <v-row no-gutters>
              <!--signin-->
              <v-col cols="12">
                <v-text-field
                    v-model="signinForm.username"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    :filled="$env.btn.filled"
                    label="موبایل یا نام کاربری"
                    class="mb-4"
                    dir="ltr"
                    hide-details
                >
                </v-text-field>
                <div
                    class="mt-6 d-flex align-center"
                >
                  <v-btn
                      large
                      color="primaryLight"
                      class="exclusive"
                      elevation="0"
                  >
                    بازیابی گذرواژه
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      small
                      :to="{
                      name: 'AuthPatient'
                    }"
                  >
                    بازگشت به صفحه ورود
                  </v-btn>
                </div>
              </v-col>
            </v-row>
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
      username: '',
      password: '',
      remember: ''
    },
    registerForm: {
      username: '',
      password: '',
      repassword: '',
      name: ''
    }
  }),
  computed: {},
  methods: {
    signin(){
      //show snackbar
      this.$store.commit('setSnackbar', {
        show: this.$moment().unix(),
        time: 2000,
        message: 'ورود موفق',
        color: 'green'
      })

      //redirect to dashboard
      this.$router.push({
        name: 'Dashboard',
        params: {
          locale: this.$route.params.locale
        }
      })
    }
  }
}
</script>

<style scoped>
</style>