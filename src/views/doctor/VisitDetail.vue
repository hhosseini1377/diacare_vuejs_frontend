<template>
  <div v-if="visitDetail">
    <dashboard-title
        :title="`جزئیات رزرو`"
        icon="visibility"
    />
    <dashboard-box>
      <template slot="content">
        <v-row class="mb-4" no-gutters>
          <!--نام پزشک-->
          <v-col cols="12" md="4" sm="6">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ visitDetail.details.patient }}</v-list-item-title>
                <v-list-item-subtitle><small>نام بیمار</small></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <!--تاریخ نوبت -->
          <v-col cols="12" md="4" sm="6">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ visitDetail.details.date }}</v-list-item-title>
                <v-list-item-subtitle><small>تاریخ</small></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <!--زمان نوبت-->
          <v-col cols="12" md="4" sm="6">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ visitDetail.details.start }} - {{
                    visitDetail.details.end
                  }}
                </v-list-item-title>
                <v-list-item-subtitle><small>زمان</small></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <!--نام رژیم-->
          <v-col cols="12" md="4" sm="6">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ visitDetail.details.planName }}</v-list-item-title>
                <v-list-item-subtitle><small>نام رژیم</small></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <dashboard-table
            :data="visitDetail"
            class="mt-0"
            name="plan"
            transparent
        >
          <template slot="rows">
            <tr
                v-for="(row, i) in visitDetail.rows"
                :key="`tr-plan-${i}`"
            >
              <td
                  v-for="(col, j) in visitDetail.cols"
                  :key="`td-plan-${j}`"
                  :style="col.key != 'day' ? 'min-width: 200px' : ''"
                  class="rounded-t-0 py-4"
              >
                {{ row[col.key] }}
              </td>
            </tr>
          </template>
        </dashboard-table>
        <v-row no-gutters>
          <!--ثبت رژیم-->
          <v-col
              v-if="['-'].includes(visitDetail.details.planName) && visitDetail.details.isPassed && !['-'].includes(visitDetail.details.patient)"
              cols="12" md="4" sm="6">
            <v-btn
                :ripple="false"
                :to="{
                  name: 'AddPrescription',
                  params: {
                    id: visitDetail.details.id
                  }
                }"
                class="my-4 mr-4"
                color="accent"
                elevation="0"
                large
            >ثبت رژیم
            </v-btn>
          </v-col>
          <!--                  &lt;!&ndash;دارو/نسخه&ndash;&gt;
                            <v-col v-if="!['-'].includes(visitDetail.details.planName)" cols="12">
                              <v-list-item two-line>
                                <v-list-item-content>
                                  <v-list-item-title class="font-weight-bold">دارو/نسخه</v-list-item-title>
                                  <p>{{ visitDetail.details.prescription }}</p>
                                </v-list-item-content>
                              </v-list-item>
                            </v-col>-->
        </v-row>

      </template>
    </dashboard-box>
  </div>
</template>

<script>
import DashboardTable from "../../components/parts/DashboardTable";
import DashboardBox from "../../components/parts/DashboardBox";
import DashboardTitle from "../../components/parts/DashboardTitle";

export default {
  name: "VisitDetail",
  components: {DashboardTitle, DashboardBox, DashboardTable},
  data: () => ({
    visitDetail: false,
  }),
  computed: {},
  methods: {},
  created() {
    var id = this.$route.params.id

    //get free diet
    this.$store.getters.api({
      method: 'get',
      url: `api/v1/dashboard/doctor/visits/${id}`,
      data: false,
      loader: true
    }).then((r) => {
      this.visitDetail = {
        details: {
          id: id,
          prescription: [null, ''].includes(r.data.prescription) ? `-` : [null, ''].includes(r.data.prescription.context) ? `-` : r.data.prescription.context,
          patient: r.data.patient_first_name == null && r.data.patient_last_name == null ? `-` : `${r.data.patient_first_name} ${r.data.patient_last_name}`,
          date: this.$moment(new Date(r.data.start_date)).format('jYYYY/jMM/jDD'),
          start: this.$moment(new Date(r.data.start_date)).format('HH:mm'),
          isPassed: this.$moment(new Date(r.data.start_date)).isSameOrBefore(this.$moment()),
          end: this.$moment(new Date(r.data.end_date)).format('HH:mm'),
          planName: [null, ''].includes(r.data.specialized_diet) ? `-` : [null, ''].includes(r.data.specialized_diet.name) ? `-` : r.data.specialized_diet.name,
        },
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
            'breakfast': '-',
            'lunch': '-',
            'dinner': '-',
          },
          {
            'day': 'یکشنبه',
            'breakfast': '-',
            'lunch': '-',
            'dinner': '-',
          },
          {
            'day': 'دوشنبه',
            'breakfast': '-',
            'lunch': '-',
            'dinner': '-',
          },
          {
            'day': 'سه‌شنبه',
            'breakfast': '-',
            'lunch': '-',
            'dinner': '-',
          },
          {
            'day': 'چهارشنبه',
            'breakfast': '-',
            'lunch': '-',
            'dinner': '-',
          },
          {
            'day': 'پنجشنبه',
            'breakfast': '-',
            'lunch': '-',
            'dinner': '-',
          },
          {
            'day': 'جمعه',
            'breakfast': '-',
            'lunch': '-',
            'dinner': '-',
          },
        ]
      }
      if (r.data.specialized_diet != null && r.data.specialized_diet.diet_parts.length > 0)
        r.data.specialized_diet.diet_parts.forEach((item) => {
          let i = 0;
          switch (true) {
            case item.week_day == 'sunday':
              i = 1
              break
            case item.week_day == 'monday':
              i = 2
              break
            case item.week_day == 'tuesday':
              i = 3
              break
            case item.week_day == 'wednesday':
              i = 4
              break
            case item.week_day == 'thursday':
              i = 5
              break
            case item.week_day == 'friday':
              i = 6
              break
          }
          this.visitDetail.rows[i][item.meal] = [null, ''].includes(item.context) ? `-` : item.context
        })
    }).catch(e => {
      if (e.response.status == 401) {
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: 'توکن نامعتبر یا منقضی شده است',
          color: 'error'
        })
      }
      this.$router.push({
        name: 'AuthDoctor'
      })
    })

  }
}
</script>

<style scoped>
</style>