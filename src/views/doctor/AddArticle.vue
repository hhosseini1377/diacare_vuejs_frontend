<template>
  <div>
    <dashboard-title title="افزودن مقاله" icon="note_add"></dashboard-title>

    <dashboard-box>
      <template slot="content">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row class="my-6 mx-4" no-gutters>
              <v-col class="pl-sm-2" cols="12" sm="12">
                <!--عنوان-->
                <v-text-field
                    :error-messages="errors.title?errors.title[0]:''"
                    :filled="$env.btn.filled"
                    :hide-details="errors.title?false:true"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    v-model="form.title"
                    class="mb-4"
                    dir="rtl"
                    label="عنوان"
                    placeholder=""
                ></v-text-field>
              </v-col>
              <v-col class="pl-sm-2" cols="12" sm="12">
                <!--محتوا-->
                <v-textarea
                    :error-messages="errors.content?errors.content[0]:''"
                    :filled="$env.btn.filled"
                    :hide-details="errors.content?false:true"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    v-model="form.content"
                    class="mb-4"
                    dir="rtl"
                    label="محتوا"
                    placeholder=""
                ></v-textarea>
              </v-col>
              <v-btn
                  color="accent"
                  elevation="0"
                  large
                  @click="submit"
              >ثبت
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </template>
    </dashboard-box>
  </div>
</template>

<script>
import DashboardTitle from "../../components/parts/DashboardTitle";
import DashboardBox from "../../components/parts/DashboardBox";

export default {
  name: "AddArticle",
  components: {DashboardBox, DashboardTitle},
  data: () => ({
    errors: false,
    form: {
      title: null,
      content: null,
    },
  }),
  computed: {},
  methods: {
    submit() {
      this.errors = false

      if ([null, ''].includes(this.form.title) || [null, ''].includes(this.form.content)) {
        if ([null, ''].includes(this.form.title)) {
          this.errors = {
            ...this.errors,
            ...{
              title: ['وارد کردن عنوان مقاله الزامی است.']
            }
          }
        }
        if ([null, ''].includes(this.form.content)) {
          this.errors = {
            ...this.errors,
            ...{
              content: ['وارد کردن محتوای مقاله الزامی است.']
            }
          }
        }
        return false
      }

      this.$store.getters.api({
        method: 'post',
        url: `api/v1/dashboard/doctor/addarticle/`,
        data: {
          "context": this.form.content,
          "subject": this.form.title
        },
        loader: true
      }).then((r) => {
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: r.data.message,
          color: 'success'
        })
        this.form = {
          title: null,
          content: null
        }
      }).catch((e) => {
        if (e.response.status == 401) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: 'توکن نامعتبر یا منقضی شده است',
            color: 'error'
          })
          this.$router.push({
            name: 'AuthDoctor'
          })
        }
      })
    }
  },
  created() {},
  watch: {}
}
</script>

<style scoped>
</style>