<template>
  <div>
    <dashboard-title></dashboard-title>

    <dashboard-box>
      <template slot="content">
        <v-tabs
            v-model="tab"
            background-color="transparent"
            class="mt-2"
            color="accent"
        >
          <v-tabs-slider color="accent"></v-tabs-slider>
          <v-tab :ripple="false" class="no-bg">رزروهای پیش رو</v-tab>
          <v-tab :ripple="false" class="no-bg">تاریخچه رزروها</v-tab>
          <v-tab :ripple="false" class="no-bg">افزودن نوبت</v-tab>
        </v-tabs>

        <v-divider class="border"></v-divider>

        <v-tabs-items
            v-model="tab"
            touchless
        >
          <!--upcomings-->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pa-0">
                <dashboard-table
                    :data="futureVisits"
                    name="upcomings"
                >
                  <template slot="rows">
                    <template v-if="futureVisits.rows.length>0">
                      <tr
                          v-for="(row, i) in futureVisits.rows"
                          :key="`tr-upcomings-${i}`"
                      >
                        <td
                            v-for="(col, j) in futureVisits.cols"
                            :key="`td-upcomings-${j}`"
                            class="rounded-t-0"
                        >
                          <template v-if="['name'].includes(col.key)">
                            <div style="min-width: 200px">
                              <v-avatar
                                  v-if="row[col.key]!='-'"
                                  :color="colors[Math.floor(Math.random()*colors.length)]"
                                  size="36"
                              >
                            <span
                                class="white--text text-body-2"
                                style="letter-spacing: 2px"
                            >{{ row[col.key][0] }}</span>
                              </v-avatar>
                              <v-icon v-else color="success">event_available</v-icon>
                              {{ row[col.key] != '-' ? row[col.key] : 'رزرو نشده' }}
                            </div>
                          </template>
                          <template v-else-if="['actions'].includes(col.key)">
                            <div
                                class="text-left"
                                style="min-width: 90px"
                            >
                              <v-btn
                                  :to="{
                                  name: 'VisitDetailDoctor',
                                  params: {
                                    id: row.id
                                  }
                                }"
                                  icon small
                              >
                                <v-icon small>visibility</v-icon>
                              </v-btn>
                            </div>
                          </template>
                          <template v-else>
                            <div style="min-width: 150px">
                              {{ row[col.key] }}
                            </div>
                          </template>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="5">رکوردی یافت نشد.</td>
                      </tr>
                    </template>
                  </template>
                </dashboard-table>
                <v-pagination
                    v-if="futureVisits.rows.length>0 && total_f>10"
                    v-model="page_f"
                    :length="(total_f%10==0)?Math.floor(total_f/10):Math.floor(total_f/10)+1"
                    :total-visible="5"
                    circle
                    class="my-8"
                    color="accent"
                ></v-pagination>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--history-->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pa-0">
                <dashboard-table
                    :data="historyVisits"
                    name="history"
                >
                  <template slot="rows">
                    <template v-if="historyVisits.rows.length>0">
                      <tr
                          v-for="(row, i) in historyVisits.rows"
                          :key="`tr-history-${i}`"
                      >
                        <td
                            v-for="(col, j) in historyVisits.cols"
                            :key="`td-history-${j}`"
                            class="rounded-t-0"
                        >
                          <template v-if="['name'].includes(col.key)">
                            <div style="min-width: 200px">
                              <v-avatar
                                  v-if="row[col.key]!='-'"
                                  :color="colors[Math.floor(Math.random()*colors.length)]"
                                  size="36"
                              >
                            <span
                                class="white--text text-body-2"
                                style="letter-spacing: 2px"
                            >{{ row[col.key][0] }}</span>
                              </v-avatar>
                              <v-icon v-else color="success">event_available</v-icon>
                              {{ row[col.key] != '-' ? row[col.key] : 'رزرو نشده' }}
                            </div>
                          </template>
                          <template v-else-if="['actions'].includes(col.key)">
                            <div class="text-left" style="min-width: 90px">
                              <v-btn
                                  :to="{
                                  name: 'VisitDetailDoctor',
                                  params: {
                                    id: row.id
                                  }
                                }"
                                  icon small
                              >
                                <v-icon small>visibility</v-icon>
                              </v-btn>
                            </div>
                          </template>
                          <template v-else>
                            <div style="min-width: 150px">
                              {{ row[col.key] }}
                            </div>
                          </template>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="5">رکوردی یافت نشد.</td>
                      </tr>
                    </template>
                  </template>
                </dashboard-table>
                <v-pagination
                    v-if="historyVisits.rows.length>0 && total_h>10"
                    v-model="page_h"
                    :length="(total_h%10==0)?Math.floor(total_h/10):Math.floor(total_h/10)+1"
                    :total-visible="5"
                    circle
                    class="my-8"
                    color="accent"
                ></v-pagination>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--visit time form-->
          <v-tab-item>
            <v-row justify="center" no-gutters>
              <v-col cols="12" lg="8" md="9" sm="10" xl="6">
                <v-row class="my-6 mx-4" no-gutters>
                  <v-col class="pl-sm-2" cols="12" sm="6">
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
                        @click="showDatePicker=true"
                    ></v-text-field>
                  </v-col>
                  <v-col class="pr-sm-2" cols="12" sm="6">
                    <!--تعداد-->
                    <v-text-field
                        :error-messages="errors.count?errors.count[0]:''"
                        :filled="$env.btn.filled"
                        :hide-details="!errors.count"
                        :outlined="$env.btn.outlined"
                        :solo="$env.btn.solo"
                        v-model="form.count"
                        class="mb-4"
                        dir="rtl"
                        label="تعداد"
                        placeholder=""
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col class="pl-sm-2" cols="12" sm="6">
                    <!--زمان شروع-->
                    <v-text-field
                        :error-messages="errors.startdate?errors.startdate[0]:''"
                        :filled="$env.btn.filled"
                        :hide-details="errors.startdate?false:true"
                        :outlined="$env.btn.outlined"
                        :solo="$env.btn.solo"
                        :value="form.start!=null?$moment(new Date(form.start)).format('HH:mm'):''"
                        class="mb-4"
                        dir="rtl"
                        label="زمان شروع"
                        placeholder=""
                        readonly
                        @click="showStartTimePicker=true"
                    ></v-text-field>
                  </v-col>
                  <v-col class="pr-sm-2" cols="12" sm="6">
                    <!--زمان پایان-->
                    <v-text-field
                        :error-messages="errors.enddate?errors.enddate[0]:''"
                        :filled="$env.btn.filled"
                        :hide-details="errors.enddate?false:true"
                        :outlined="$env.btn.outlined"
                        :solo="$env.btn.solo"
                        :value="form.end!=null?$moment(new Date(form.end)).format('HH:mm'):''"
                        class="mb-4"
                        dir="rtl"
                        label="زمان پایان"
                        placeholder=""
                        readonly
                        @click="showEndTimePicker=true"
                    ></v-text-field>
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
          </v-tab-item>
        </v-tabs-items>
        <viradate-picker
            v-model="form.date"
            :auto-submit="true"
            :inline="false"
            :min="$moment().locale('en').format('YYYY-MM-DD')"
            :range="false"
            :show="showDatePicker"
            element="dateone"
            format="YYYY-MM-DD"
            type="date"
            @close="showDatePicker = false"
        ></viradate-picker>
        <viradate-picker
            v-model="form.start"
            :inline="false"
            :show="showStartTimePicker"
            element="timepone"
            format="YYYY-MM-DD HH:mm"
            input-format="YYYY-MM-DD HH:mm"
            type="time"
            @close="showStartTimePicker = false"
        ></viradate-picker>
        <viradate-picker
            v-model="form.end"
            :inline="false"
            :show="showEndTimePicker"
            element="timetwo"
            format="YYYY-MM-DD HH:mm"
            input-format="YYYY-MM-DD HH:mm"
            type="time"
            @close="showEndTimePicker = false"
        ></viradate-picker>
      </template>
    </dashboard-box>
  </div>
</template>

<script>
import DashboardTitle from "../../components/parts/DashboardTitle";
import DashboardBox from "../../components/parts/DashboardBox";
import DashboardTable from "../../components/parts/DashboardTable";

export default {
  name: "Dashboard",
  components: {DashboardTable, DashboardBox, DashboardTitle},
  data: () => ({
    tab: 0,
    colors: [
      'red',
      'pink darken-1',
      'purple darken-1',
      'deep-purple',
      'indigo',
      'blue accent-4',
      'teal accent-4',
      'green',
      'light-green darken-1',
      'amber darken-3',
      'orange accent-4',
      'deep-orange',
      'brown',
      'blue-grey',
    ],
    page_h: 1,
    page_f: 1,
    total_h: false,
    total_f: false,
    errors: false,
    showDatePicker: false,
    showStartTimePicker: false,
    showEndTimePicker: false,
    form: {
      date: null,
      start: null,
      end: null,
      count: null,
    },
    futureVisits: {
      cols: [
        {
          title: 'نام بیمار',
          key: 'name'
        },
        {
          title: 'تاریخ شروع',
          key: 'start'
        },
        {
          title: 'تاریخ پایان',
          key: 'end'
        },
        {
          title: 'وضعیت',
          key: 'status'
        },
        {
          title: '',
          key: 'actions'
        }
      ],
      rows: []
    },
    historyVisits: {
      cols: [
        {
          title: 'نام بیمار',
          key: 'name'
        },
        {
          title: 'تاریخ شروع',
          key: 'start'
        },
        {
          title: 'تاریخ پایان',
          key: 'end'
        },
        {
          title: 'وضعیت',
          key: 'status'
        },
        {
          title: '',
          key: 'actions'
        }
      ],
      rows: []
    },
  }),
  computed: {},
  methods: {
    getHistoryVisits() {
      this.historyVisits.rows = []
      this.$store.getters.api({
        method: 'get',
        url: `api/v1/dashboard/doctor/doctorvisitshistory/?limit=10&offset=${this.page_h == 1 ? 0 : (this.page_h - 1) * 10}`,
        data: false,
        loader: true
      }).then((r) => {
        if (r.data.results != null && r.data.results.length > 0) {
          this.total_h = r.data.count;
          r.data.results.forEach((item) => {
            this.historyVisits.rows.push({
              id: item.id,
              name: (item.patient_first_name != null) ? `${item.patient_first_name} ${item.patient_last_name}` : `-`,
              start: this.$moment(new Date(item.start_date)).format('jYYYY/jMM/jDD ساعت HH:mm'),
              end: this.$moment(new Date(item.end_date)).format('jYYYY/jMM/jDD ساعت HH:mm'),
              status: (item.is_passed) ? 'گذشته' : 'آینده',
            })
          })
        }
      })
    },
    getFutureVisits() {
      this.futureVisits.rows = []
      this.$store.getters.api({
        method: 'get',
        url: `api/v1/dashboard/doctor/doctoraheadvisits/?limit=10&offset=${this.page_f == 1 ? 0 : (this.page_f - 1) * 10}`,
        data: false,
        loader: true
      }).then((r) => {
        if (r.data.results != null && r.data.results.length > 0) {
          this.total_f = r.data.count;
          r.data.results.forEach((item) => {
            this.futureVisits.rows.push({
              id: item.id,
              name: (item.patient_first_name != null) ? `${item.patient_first_name} ${item.patient_last_name}` : `-`,
              start: this.$moment(new Date(item.start_date)).format('jYYYY/jMM/jDD ساعت HH:mm'),
              end: this.$moment(new Date(item.end_date)).format('jYYYY/jMM/jDD ساعت HH:mm'),
              status: (item.is_passed) ? 'گذشته' : 'آینده',
            })
          })
        }
      })
    },
    submit() {
      this.errors = false

      if ([null, ''].includes(this.form.date) || [null, ''].includes(this.form.start) || [null, ''].includes(this.form.end) || [null, ''].includes(this.form.count)) {
        if ([null, ''].includes(this.form.date)) {
          this.errors = {
            ...this.errors,
            ...{
              date: ['انتخاب تاریخ الزامی است.']
            }
          }
        }
        if ([null, ''].includes(this.form.start)) {
          this.errors = {
            ...this.errors,
            ...{
              startdate: ['انتخاب زمان شروع الزامی است.']
            }
          }
        }
        if ([null, ''].includes(this.form.end)) {
          this.errors = {
            ...this.errors,
            ...{
              enddate: ['انتخاب زمان پایان الزامی است.']
            }
          }
        }
        if ([null, ''].includes(this.form.count)) {
          this.errors = {
            ...this.errors,
            ...{
              count: ['انتخاب تعداد الزامی است.']
            }
          }
        }
        return false
      }

      var start = this.$moment(new Date(`${this.form.date} ${this.$moment(new Date(this.form.start)).format('HH:mm')}`)).locale('en').format()
      var end = this.$moment(new Date(`${this.form.date} ${this.$moment(new Date(this.form.end)).format('HH:mm')}`)).locale('en').format()
      this.$store.getters.api({
        method: 'post',
        url: `api/v1/dashboard/doctor/addreservetime/`,
        data: {
          "start_date": start,
          "end_date": end,
          "count" : this.form.count
        },
        loader: true
      }).then((r) => {
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: r.data.message,
          color: 'success'
        })
        this.getHistoryVisits()
        this.getFutureVisits()
        this.form = {
          date: null,
          start: null,
          end: null,
          count: null,
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
  created() {
    if (this.$route.query.page_h) {
      this.page_h = parseInt(this.$route.query.page_h)
    }
    if (this.$route.query.page_f) {
      this.page_f = parseInt(this.$route.query.page_f)
    }
    this.getHistoryVisits()
    this.getFutureVisits()
  },
  watch: {
    page_h() {
      this.$router.push({
        name: 'DashboardDoctor',
        query: {
          page_h: this.page_h,
          page_f: this.page_f
        }
      })
      this.getHistoryVisits()
    }
    ,
    page_f() {
      this.$router.push({
        name: 'DashboardDoctor',
        query: {
          page_f: this.page_f,
          page_h: this.page_h
        }
      })
      this.getFutureVisits()
    }
  }
}
</script>

<style scoped>
</style>