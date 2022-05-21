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
            show-arrows
        >
          <v-tabs-slider color="accent"></v-tabs-slider>
          <v-tab :ripple="false" class="no-bg">رزروهای پیش رو</v-tab>
          <v-tab :ripple="false" class="no-bg">تاریخچه رزروها</v-tab>
          <v-tab :ripple="false" class="no-bg">رژیم‌های رایگان</v-tab>
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
                    :data="upcomings"
                    name="upcomings"
                >
                  <template slot="rows">
                    <template v-if="upcomings.rows.length>0">
                      <tr

                          v-for="(row, i) in upcomings.rows"
                          :key="`tr-upcomings-${i}`"
                      >
                        <td
                            v-for="(col, j) in upcomings.cols"
                            :key="`td-upcomings-${j}`"
                            class="rounded-t-0"
                        >
                          <template v-if="['name'].includes(col.key)">
                            <div style="min-width: 200px">
                              <v-avatar
                                  :color="colors[Math.floor(Math.random()*colors.length)]"
                                  size="36"
                              >
                            <span
                                class="white--text text-body-2"
                                style="letter-spacing: 2px"
                            >{{ row[col.key][0] + '&zwnj;' + row[col.key].split(' ')[1][0] }}</span>
                              </v-avatar>
                              {{ row[col.key] }}
                            </div>
                          </template>
                          <template v-else-if="['actions'].includes(col.key)">
                            <div
                                class="text-left"
                                style="min-width: 90px"
                            >
                              <v-btn
                                  :to="{
                                  name: 'VisitDetail',
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
                        <td colspan="3">رکوردی یافت نشد.</td>
                      </tr>
                    </template>
                  </template>
                </dashboard-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--history-->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pa-0">
                <dashboard-table
                    :data="history"
                    name="history"
                >
                  <template slot="rows">
                    <template v-if="history.rows.length>0">
                      <tr
                          v-for="(row, i) in history.rows"
                          :key="`tr-history-${i}`"
                      >
                        <td
                            v-for="(col, j) in history.cols"
                            :key="`td-history-${j}`"
                            class="rounded-t-0"
                        >
                          <template v-if="['name'].includes(col.key)">
                            <div style="min-width: 200px">
                              <v-avatar
                                  :color="colors[Math.floor(Math.random()*colors.length)]"
                                  size="36"
                              >
                            <span
                                class="white--text text-body-2"
                                style="letter-spacing: 2px"
                            >{{ row[col.key][0] + '&zwnj;' + row[col.key].split(' ')[1][0] }}</span>
                              </v-avatar>
                              {{ row[col.key] }}
                            </div>
                          </template>
                          <template v-else-if="['actions'].includes(col.key)">
                            <div class="text-left" style="min-width: 90px">
                              <v-btn
                                  :to="{
                                  name: 'VisitDetail',
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
                        <td colspan="4">رکوردی یافت نشد.</td>
                      </tr>
                    </template>
                  </template>
                </dashboard-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!--freeplans-->
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pa-0">
                <dashboard-table
                    :data="freeplans"
                    name="freeplans"
                >
                  <template slot="rows">
                    <template v-if="freeplans.rows.length>0">
                      <tr
                          v-for="(row, i) in freeplans.rows"
                          :key="`tr-freeplans-${i}`"
                      >
                        <td
                            v-for="(col, j) in freeplans.cols"
                            :key="`td-freeplans-${j}`"
                            class="rounded-t-0"
                        >
                          <template v-if="['actions'].includes(col.key)">
                            <div class="text-left" style="min-width: 60px">
                              <v-btn
                                  :to="{
                                  name: 'FreePlanDetail',
                                  params: {
                                    id: row.id
                                  }
                                }" icon
                                  small
                              >
                                <v-icon small>visibility</v-icon>
                              </v-btn>
                            </div>
                          </template>
                          <template v-else-if="['goal','time'].includes(col.key)">
                            <div style="min-width: 150px">
                              {{ row[col.key] }}
                            </div>
                          </template>
                          <template v-else>
                            {{ row[col.key] }}
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
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
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
    futureVisits: {
      cols: [
        {
          title: 'نام پزشک',
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
          title: '',
          key: 'actions'
        }
      ],
      rows: []
    },
    historyVisits: {
      cols: [
        {
          title: 'نام پزشک',
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
          title: '',
          key: 'actions'
        }
      ],
      rows: []
    },
    freeDiets: {
      cols: [
        {
          title: 'نام رژیم',
          key: 'name'
        },
        {
          title: 'نوع رژیم',
          key: 'kind'
        },
        {
          title: 'دوره رژیم',
          key: 'duration'
        },
        {
          title: 'تاریخ شروع',
          key: 'start'
        },
        {
          title: '',
          key: 'actions'
        }
      ],
      rows: []
    },
    duringOpts: {
      'onemonth': 'یک ماهه',
      'twomonth': 'دو ماهه',
      'threemonth': 'سه ماهه'
    },
    goalOpts: {
      'weightloss': 'رژیم کاهش وزن',
      'weightgain': 'رژیم افزایش وزن',
      'stablizeweight': 'تثبیت'
    }
  }),
  computed: {
    upcomings() {
      return this.futureVisits
    },
    history() {
      return this.historyVisits
    },
    freeplans() {
      return this.freeDiets
    }
  },
  created() {
    //get future visits
    this.$store.getters.api({
      method: 'get',
      url: 'api/v1/dashboard/patient/visits/future',
      data: false,
      loader: true
    }).then((r) => {
      r.data.results.forEach((item) => {
        var startDate = new Date(item.start_date)
        var endDate = new Date(item.end_date)
        this.futureVisits.rows.push({
          id: item.id,
          name: `${item.doctor_first_name} ${item.doctor_last_name}`,
          start: this.$moment(startDate).format('jYYYY/jMM/jDD ساعت HH:mm'),
          end: this.$moment(endDate).format('jYYYY/jMM/jDD ساعت HH:mm')
        })
      })
    })

    //get visits history
    this.$store.getters.api({
      method: 'get',
      url: 'api/v1/dashboard/patient/visits/history',
      data: false,
      loader: true
    }).then((r) => {
      r.data.results.forEach((item) => {
        var startDate = new Date(item.start_date)
        var endDate = new Date(item.end_date)
        this.historyVisits.rows.push({
          id: item.id,
          name: `${item.doctor_first_name} ${item.doctor_last_name}`,
          start: this.$moment(startDate).format('jYYYY/jMM/jDD ساعت HH:mm'),
          end: this.$moment(endDate).format('jYYYY/jMM/jDD ساعت HH:mm'),
          prescription: item.prescription,
          specialized_diet: `${item.specialized_diet}`,
        })
      })
    })

    //get free diets
    this.$store.getters.api({
      method: 'get',
      url: 'api/v1/dashboard/patient/free_diets',
      data: false,
      loader: true
    }).then((r) => {
      r.data.results.forEach((item) => {
        var startDate = new Date(item.started_at)
        this.freeDiets.rows.push({
          id: item.id,
          name: `${item.name}`,
          duration: this.duringOpts[item.duration],
          kind: this.goalOpts[item.kind],
          start: this.$moment(startDate).format('jYYYY/jMM/jDD')
        })
      })
    })
  },
}
</script>

<style scoped>
</style>