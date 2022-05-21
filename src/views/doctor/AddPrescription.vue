<template>
  <div>
    <dashboard-title icon="edit_calendar" title="افزودن رژیم"></dashboard-title>

    <dashboard-box>
      <template slot="content">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row class="my-6 mx-4" no-gutters>
              <v-col class="pl-sm-2" cols="12" sm="12">
                <!--نام رژیم-->
                <v-text-field
                    v-model="form.name"
                    :error-messages="errors.name?errors.name[0]:''"
                    :filled="$env.btn.filled"
                    :hide-details="errors.name?false:true"
                    :outlined="$env.btn.outlined"
                    :solo="$env.btn.solo"
                    class="mb-4"
                    dir="rtl"
                    label="نام رژیم"
                    placeholder=""
                ></v-text-field>
              </v-col>
              <v-col class="pl-sm-2" cols="12" sm="12">
                <!--رژیم-->
                <template>
                  <v-simple-table class="dashboard-table">
                    <template v-slot:default>
                      <thead>
                      <tr style="background-color: rgba(0,0,0,0.028)">
                        <th>روز هفته</th>
                        <th
                            v-for="(col, i) in meals"
                            :key="`th-meal-${i}`"
                        >{{ col }}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr
                          v-for="(col, i) in days"
                          :key="`tr-day-${i}`"
                      >
                        <td
                            :key="`td-plan-${i}`"
                            class="rounded-t-0 py-4"
                            style=""
                        >
                          {{ col }}
                        </td>
                        <td
                            :key="`td-plan-b-${i}`"
                            class="rounded-t-0 py-4"
                            style="min-width: 200px"
                        >
                          <v-text-field
                              v-model="form.diet[(3*i)+0].محتوا"
                              :error-messages="errors.diet[(3*i)+0] ? errors.diet[(3*i)+0][0] : ''"
                              :filled="$env.btn.filled"
                              :hide-details="!errors.diet[(3*i)+0]"
                              :outlined="$env.btn.outlined"
                              :solo="$env.btn.solo"
                              dir="rtl"
                              type="text"
                          ></v-text-field>
                        </td>
                        <td
                            :key="`td-plan-l-${i}`"
                            class="rounded-t-0 py-4"
                            style="min-width: 200px"
                        >
                          <v-text-field
                              v-model="form.diet[(3*i)+1].محتوا"
                              :error-messages="errors.diet[(3*i)+1] ? errors.diet[(3*i)+1][0] : ''"
                              :filled="$env.btn.filled"
                              :hide-details="!errors.diet[(3*i)+1]"
                              :outlined="$env.btn.outlined"
                              :solo="$env.btn.solo"
                              dir="rtl"
                              type="text"
                          ></v-text-field>
                        </td>
                        <td
                            :key="`td-plan-d-${i}`"
                            class="rounded-t-0 py-4"
                            style="min-width: 200px"
                        >
                          <v-text-field
                              v-model="form.diet[(3*i)+2].محتوا"
                              :error-messages="errors.diet[(3*i)+2] ? errors.diet[(3*i)+2][0] : ''"
                              :filled="$env.btn.filled"
                              :hide-details="!errors.diet[(3*i)+2]"
                              :outlined="$env.btn.outlined"
                              :solo="$env.btn.solo"
                              dir="rtl"
                              type="text"
                          ></v-text-field>
                        </td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </v-col>
              <v-btn
                  :ripple="false"
                  class="my-4 mr-4"
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
  name: "AddPrescription",
  components: {DashboardBox, DashboardTitle},
  data: () => ({
    errors: {
      diet: [],
      name: false
    },
    days: [
      'شنبه',
      'یکشنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنجشنبه',
      'جمعه',
    ],
    meals: [
      'صبحانه',
      'ناهار',
      'شام',
    ],
    form: {
      name: null,
      diet: [
        //saturday
        {
          'وعده': 'breakfast',
          'روز': 'saturday',
          'محتوا': null,
        },
        {
          'وعده': 'lunch',
          'روز': 'saturday',
          'محتوا': null,
        },
        {
          'وعده': 'dinner',
          'روز': 'saturday',
          'محتوا': null,
        },
        //sunday
        {
          'وعده': 'breakfast',
          'روز': 'sunday',
          'محتوا': null,
        },
        {
          'وعده': 'lunch',
          'روز': 'sunday',
          'محتوا': null,
        },
        {
          'وعده': 'dinner',
          'روز': 'sunday',
          'محتوا': null,
        },
        //monday
        {
          'وعده': 'breakfast',
          'روز': 'monday',
          'محتوا': null,
        },
        {
          'وعده': 'lunch',
          'روز': 'monday',
          'محتوا': null,
        },
        {
          'وعده': 'dinner',
          'روز': 'monday',
          'محتوا': null,
        },
        //tuesday
        {
          'وعده': 'breakfast',
          'روز': 'tuesday',
          'محتوا': null,
        },
        {
          'وعده': 'lunch',
          'روز': 'tuesday',
          'محتوا': null,
        },
        {
          'وعده': 'dinner',
          'روز': 'tuesday',
          'محتوا': null,
        },
        //wednesday
        {
          'وعده': 'breakfast',
          'روز': 'wednesday',
          'محتوا': null,
        },
        {
          'وعده': 'lunch',
          'روز': 'wednesday',
          'محتوا': null,
        },
        {
          'وعده': 'dinner',
          'روز': 'wednesday',
          'محتوا': null,
        },
        //thursday
        {
          'وعده': 'breakfast',
          'روز': 'thursday',
          'محتوا': null,
        },
        {
          'وعده': 'lunch',
          'روز': 'thursday',
          'محتوا': null,
        },
        {
          'وعده': 'dinner',
          'روز': 'thursday',
          'محتوا': null,
        },
        //friday
        {
          'وعده': 'breakfast',
          'روز': 'friday',
          'محتوا': null,
        },
        {
          'وعده': 'lunch',
          'روز': 'friday',
          'محتوا': null,
        },
        {
          'وعده': 'dinner',
          'روز': 'friday',
          'محتوا': null,
        },
      ],
      id: null
    },
  }),
  computed: {},
  methods: {
    submit() {
      this.errors = {
        diet: [],
        name: false
      }
      var dietIsEmpty = false

      this.form.diet.forEach((item, i) => {
        if ([null, ''].includes(item.محتوا)) {
          this.errors.diet[i] = [
            'این مقدار نمی‌تواند خالی باشد.'
          ]
          dietIsEmpty = true
        }
      })

      if ([null, ''].includes(this.form.name) || dietIsEmpty) {
        if ([null, ''].includes(this.form.name)) {
          this.errors = {
            ...this.errors,
            ...{
              name: ['وارد کردن نام رژیم الزامی است.']
            }
          }
        }
        return false
      }

      this.$store.getters.api({
        method: 'post',
        url: `api/v1/diabetes_control/visits/add_diet/`,
        data: {
          "نام رژیم": this.form.name,
          "محتوی رژیم": this.form.diet,
          "visit": this.form.id
        },
        loader: true
      }).then((r) => {
        r.message = 'رژیم با موفقیت ثبت شد.'
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: r.message,
          color: 'success'
        })
        this.form.name = null
        this.form.diet = [
          //saturday
          {
            'وعده': 'breakfast',
            'روز': 'saturday',
            'محتوا': null,
          },
          {
            'وعده': 'lunch',
            'روز': 'saturday',
            'محتوا': null,
          },
          {
            'وعده': 'dinner',
            'روز': 'saturday',
            'محتوا': null,
          },
          //sunday
          {
            'وعده': 'breakfast',
            'روز': 'sunday',
            'محتوا': null,
          },
          {
            'وعده': 'lunch',
            'روز': 'sunday',
            'محتوا': null,
          },
          {
            'وعده': 'dinner',
            'روز': 'sunday',
            'محتوا': null,
          },
          //monday
          {
            'وعده': 'breakfast',
            'روز': 'monday',
            'محتوا': null,
          },
          {
            'وعده': 'lunch',
            'روز': 'monday',
            'محتوا': null,
          },
          {
            'وعده': 'dinner',
            'روز': 'monday',
            'محتوا': null,
          },
          //tuesday
          {
            'وعده': 'breakfast',
            'روز': 'tuesday',
            'محتوا': null,
          },
          {
            'وعده': 'lunch',
            'روز': 'tuesday',
            'محتوا': null,
          },
          {
            'وعده': 'dinner',
            'روز': 'tuesday',
            'محتوا': null,
          },
          //wednesday
          {
            'وعده': 'breakfast',
            'روز': 'wednesday',
            'محتوا': null,
          },
          {
            'وعده': 'lunch',
            'روز': 'wednesday',
            'محتوا': null,
          },
          {
            'وعده': 'dinner',
            'روز': 'wednesday',
            'محتوا': null,
          },
          //thursday
          {
            'وعده': 'breakfast',
            'روز': 'thursday',
            'محتوا': null,
          },
          {
            'وعده': 'lunch',
            'روز': 'thursday',
            'محتوا': null,
          },
          {
            'وعده': 'dinner',
            'روز': 'thursday',
            'محتوا': null,
          },
          //friday
          {
            'وعده': 'breakfast',
            'روز': 'friday',
            'محتوا': null,
          },
          {
            'وعده': 'lunch',
            'روز': 'friday',
            'محتوا': null,
          },
          {
            'وعده': 'dinner',
            'روز': 'friday',
            'محتوا': null,
          },
        ]
        this.$router.push({
          name: 'VisitDetailDoctor',
          params: {
            id: this.form.id
          }
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
            name: 'AuthDoctor'
          })
        } else if (e.response.status == 404) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: e.response.data.detail,
            color: 'error'
          })
        } else if (e.response.status == 400) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: 'امکان ثبت مجدد رژیم وجود ندارد.',
            color: 'error'
          })
        }
      })
    }
  },
  created() {
    if (this.$route.params.id) {
      this.form.id = parseInt(this.$route.params.id)
    }
  },
}
</script>

<style scoped>
</style>