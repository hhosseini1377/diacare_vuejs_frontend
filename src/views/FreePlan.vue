<template>
  <div>
    <!--hero-->
    <horizontal-banner
        :img="require(`@/assets/media/img/freeplan-hiro.webp`)"
    >
      <template slot="content">
        <h1 class="heading">ارائه برنامه غذایی رایگان</h1>
        <h2 class="heading">رژیم مناسب برای بیماران دیابتی</h2>
        <p class="my-7">درصورتی که نیاز به برنامه برای کاهش وزن، کنترل وزن و یا افزایش وزنتان دارید در این بخش می‌توانید با وارد کردن مشخصات بدنیتان وضعیتتان را مشاهده نمایید و با توجه به گزارش برنامه مورد نظرتان را رایگان دریافت کنید!</p>
      </template>
    </horizontal-banner>

    <!--form-->
    <v-row v-if="step == 1" justify="center" no-gutters>
      <v-col cols="11" lg="7" md="9" sm="10">
        <box title="">
          <template slot="content">
            <div class="title">برای دریافت برنامه لطفا فرم زیر را تکمیل و ارسال نمایید:</div>
            <v-row class="my-6" no-gutters>
              <v-col class="pl-sm-2" cols="12" sm="6">
                <!--وزن-->
                <v-text-field
                    v-model="form.weight"
                    :filled="$env.btn.filled"
                    :max="150"
                    :min="5"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    dir="ltr"
                    hide-details
                    label="وزن"
                    placeholder="مثال: 75"
                    suffix="کیلوگرم"
                    type="number"
                ></v-text-field>
                <!--جنسیت-->
                <v-select
                    v-model="form.gender"
                    :filled="$env.btn.filled"
                    :items="duringOpts"
                    :menu-props="{ auto: true, contentClass: 'ml-4', nudgeWidth: -16, offsetY: true }"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    hide-details
                    label="دوره رژیم"
                ></v-select>
              </v-col>
              <v-col class="pr-sm-2 pt-4 pt-sm-0" cols="12" sm="6">
                <!--قد-->
                <v-text-field
                    v-model="form.height"
                    :filled="$env.btn.filled"
                    :max="220"
                    :min="15"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    dir="ltr"
                    hide-details
                    label="قد"
                    placeholder="مثال: 172"
                    suffix="سانتی متر"
                    type="number"
                ></v-text-field>
                <!--نوع رژیم-->
                <v-select
                    v-model="form.goal"
                    :filled="$env.btn.filled"
                    :items="goalOpts"
                    :menu-props="{ auto: true, contentClass: 'ml-4', nudgeWidth: -16, offsetY: true }"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    hide-details
                    label="نوع رژیم"
                ></v-select>
              </v-col>
            </v-row>

            <v-btn
                class="exclusive"
                color="primaryLight"
                elevation="0"
                x-large
                @click="submit"
            >دریافت برنامه
            </v-btn>
            <v-btn
                :class="`${filled?'':'exclusive'} mr-1`"
                :disabled="filled"
                color="redBtn"
                elevation="0"
                x-large
                @click="clearForm"
            >پاک کردن<span class="hidden-xs-only"> اطلاعات</span></v-btn>
          </template>
        </box>
      </v-col>
    </v-row>

    <!--plan-->
    <v-row v-if="step == 2" justify="center" no-gutters>
      <v-col cols="11" lg="7" md="9" sm="10">
        <box :title="plainPlan['نام رژیم']">
          <template slot="content">
            <dashboard-table
                :data="plan"
                class="mb-6"
                name="plan"
                transparent
            >
              <template slot="rows">
                <tr
                    v-for="(row, i) in plan.rows"
                    :key="`tr-plan-${i}`"
                >
                  <td
                      v-for="(col, j) in plan.cols"
                      :key="`td-plan-${j}`"
                      :style="col.key != 'day' ? 'min-width: 200px' : ''"
                      class="rounded-t-0 py-4"
                  >
                    {{ row[col.key] }}
                  </td>
                </tr>
              </template>
            </dashboard-table>

            <v-btn
                class="exclusive"
                color="primaryLight"
                elevation="0"
                x-large
                @click="savePlan"
            >ذخیره&nbsp;<span class="hidden-xs-only">برنامه</span></v-btn>
            <v-btn
                class="mr-1" color="primaryLight"
                elevation="0"
                outlined
                x-large
                @click="back"
            ><span class="hidden-xs-only">دریافت&nbsp;</span>برنامه جدید
            </v-btn>
          </template>
        </box>
      </v-col>
    </v-row>

    <!--dialog-->
    <v-dialog
        v-model="dialog"
        content-class="rounded-lg"
        max-width="310px"
        overlay-color="white"
        persistent
        scrollable
    >
      <v-card rounded="lg">
        <v-card-title>وضعیت بدنی شما</v-card-title>
        <v-card-text>
          <div class="d-flex">
            <v-img
                :src="bmiDetails.img"
                contain
                max-height="150px"
                position="right center"
            ></v-img>
            <div class="flex-fill pr-4">
              <div class="text-body-2 grey--text">شاخص توده بدنی (BMI):</div>
              <div
                  :style="`color: ${bmiDetails.color}`"
                  class="text-body-1 font-weight-bold text-left"
              >
                {{ bmi }}
              </div>
              <div class="text-body-2 grey--text">وضعیت:</div>
              <div
                  :style="`color: ${bmiDetails.color}`"
                  class="text-body-1 font-weight-bold text-left"
              >
                {{ bmiDetails.title }}
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              @click="dialog = false"
          >
            بازگشت
          </v-btn>
          <v-btn
              class="exclusive"
              color="primaryLight"
              elevation="0"
              @click="showPlan"
          >
            مشاهده رژیم
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import HorizontalBanner from "../components/parts/HorizontalBanner";
import Box from "../components/parts/Box";
import DashboardTable from "../components/parts/DashboardTable";

export default {
  name: "FreePlan",
  components: {DashboardTable, Box, HorizontalBanner},
  data: () => ({
    form: {
      name: null,
      weight: null,
      height: null,
      age: null,
      gender: null,
      goal: null,
    },
    defaults: {
      name: null,
      weight: null,
      height: null,
      age: null,
      gender: null,
      goal: null,
    },
    duringOpts: [
      {
        text: 'یک ماهه',
        value: 'onemonth'
      },
      {
        text: 'دو ماهه',
        value: 'twomonth'
      },
      {
        text: 'سه ماهه',
        value: 'threemonth'
      },
    ],
    goalOpts: [
      {
        text: 'رژیم کاهش وزن',
        value: 'weightloss'
      },
      {
        text: 'رژیم افزایش وزن',
        value: 'weightgain'
      },
      {
        text: 'تثبیت',
        value: 'stablizeweight'
      }
    ],
    step: 1,
    plainPlan: false,
    dialog: false,
    planDetail: false,
  }),
  computed: {
    plan() {
      return this.planDetail
    },
    filled() {
      return JSON.stringify(this.form) === JSON.stringify(this.defaults)
    },
    bmi() {
      let bmi = 0

      if (this.form.height != null && this.form.weight != null) {
        bmi = this.form.weight / (Math.pow((this.form.height / 100), 2))
      }

      return Math.round(bmi * 100) / 100
    },
    bmiDetails() {
      let obj = {
        title: 'کمبود وزن',
        img: require(`@/assets/media/img/bmi/1.png`),
        color: '#93b5d7'
      }

      switch (true) {
        case this.bmi >= 18.5 && this.bmi < 25:
          obj = {
            title: 'نرمال',
            img: require(`@/assets/media/img/bmi/2.png`),
            color: '#8fc79f'
          }
          break
        case this.bmi >= 25 && this.bmi < 30:
          obj = {
            title: 'اضافه وزن',
            img: require(`@/assets/media/img/bmi/3.png`),
            color: '#f9d748'
          }
          break
        case this.bmi >= 30 && this.bmi < 35:
          obj = {
            title: 'چاق',
            img: require(`@/assets/media/img/bmi/4.png`),
            color: '#e5995e'
          }
          break
        case this.bmi >= 35:
          obj = {
            title: 'خیلی چاق',
            img: require(`@/assets/media/img/bmi/5.png`),
            color: '#d75c5a'
          }
          break
      }

      return obj
    }
  },
  methods: {
    clearForm() {
      //show snackbar
      this.$store.commit('setSnackbar', {
        show: this.$moment().unix(),
        time: 2000,
        message: 'اطلاعات فرم با موفقیت حذف شد.',
        color: 'green'
      })

      this.form = {
        name: null,
        weight: null,
        height: null,
        age: null,
        gender: null,
        goal: null,
      }
    },
    submit() {
      if(!this.$store.state.user){
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: 'برای دریافت برنامه غذایی رایگان به حساب کاربری خود وارد شوید.',
          color: 'warning'
        })
        this.$router.push({
          name: 'AuthPatient'
        })
        return false
      }

      this.$store.getters.api({
        method: 'post',
        url: 'api/v1/freediet/getfreediet/',
        data: {
          "kind": this.form.goal,
          "period": this.form.gender,
          "weight": this.form.weight,
          "height": this.form.height
        },
        loader: true
      }).then((r) => {
        this.plainPlan=r.data
        this.dialog = true
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
        }
      })
    },
    showPlan() {
      this.planDetail = {
        cols: [
          {
            title: 'روز هفته',
            key: 'day'
          },
          {
            title: 'صبحانه',
            key: 'breakfast'
          },
          {
            title: 'ناهار',
            key: 'lunch'
          },
          {
            title: 'شام',
            key: 'dinner'
          }
        ],
        rows: [
          {
            'day': 'شنبه',
            'breakfast': '',
            'lunch': '',
            'dinner': '',
          },
          {
            'day': 'یکشنبه',
            'breakfast': '',
            'lunch': '',
            'dinner': '',
          },
          {
            'day': 'دوشنبه',
            'breakfast': '',
            'lunch': '',
            'dinner': '',
          },
          {
            'day': 'سه‌شنبه',
            'breakfast': '',
            'lunch': '',
            'dinner': '',
          },
          {
            'day': 'چهارشنبه',
            'breakfast': '',
            'lunch': '',
            'dinner': '',
          },
          {
            'day': 'پنجشنبه',
            'breakfast': '',
            'lunch': '',
            'dinner': '',
          },
          {
            'day': 'جمعه',
            'breakfast': '',
            'lunch': '',
            'dinner': '',
          },
        ]
      }
      this.plainPlan['محتوی رژیم'].forEach((item) => {
        let i = 0;
        switch (true) {
          case item.روز == 'sunday':
            i = 1
            break
          case item.روز == 'monday':
            i = 2
            break
          case item.روز == 'tuesday':
            i = 3
            break
          case item.روز == 'wednesday':
            i = 4
            break
          case item.روز == 'thursday':
            i = 5
            break
          case item.روز == 'friday':
            i = 6
            break
        }
        this.planDetail.rows[i][item.وعده]=item.محتوا
      })
      this.dialog = false
      this.step = 2
    },
    savePlan() {
      var data = new FormData()
      data.append('free_diet', this.plainPlan['id'])

      this.$store.getters.api({
        method: 'post',
        url: 'api/v1/freediet/addfreediet/',
        data: data,
        loader: true
      }).then((r) => {
        this.step = 1

        //show snackbar
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: r.data.resp,
          color: 'success'
        })
      }).catch((e) => {
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
    },
    back() {
      this.step = 1
    }
  }
}
</script>

<style scoped>
</style>