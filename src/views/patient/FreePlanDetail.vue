<template>
  <div v-if="planDetail">
    <dashboard-title
        :title="`${planDetail.details.goal}`"
        icon="fastfood"
    />

    <dashboard-box>
      <template slot="content">
        <v-row class="mb-4" no-gutters>
          <!--نام رژیم-->
          <v-col cols="12" md="4" sm="6">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ planDetail.details.name }}</v-list-item-title>
                <v-list-item-subtitle><small>نام</small></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <!--دوره رژیم-->
          <v-col cols="12" md="4" sm="6">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ planDetail.details.duration }}</v-list-item-title>
                <v-list-item-subtitle><small>دوره</small></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <!--زمان دریافت-->
          <v-col cols="12" md="4" sm="6">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ planDetail.details.time }}</v-list-item-title>
                <v-list-item-subtitle><small>زمان دریافت</small></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>

        <dashboard-table
            :data="planDetail"
            class="mt-0"
            name="plan"
            transparent
        >
          <template slot="rows">
            <tr
                v-for="(row, i) in planDetail.rows"
                :key="`tr-plan-${i}`"
            >
              <td
                  v-for="(col, j) in planDetail.cols"
                  :key="`td-plan-${j}`"
                  :style="col.key != 'day' ? 'min-width: 200px' : ''"
                  class="rounded-t-0 py-4"
              >
                {{ row[col.key] }}
              </td>
            </tr>
          </template>
        </dashboard-table>
      </template>
    </dashboard-box>
  </div>
</template>

<script>
import DashboardTable from "../../components/parts/DashboardTable";
import DashboardBox from "../../components/parts/DashboardBox";
import DashboardTitle from "../../components/parts/DashboardTitle";

export default {
  name: "FreePlan",
  components: {DashboardTitle, DashboardBox, DashboardTable},
  data: () => ({
    planDetail: false,
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
  computed: {},
  methods: {},
  created() {
    var id = this.$route.params.id

    //get free diet
    this.$store.getters.api({
      method: 'get',
      url: `api/v1/dashboard/patient/free_diets/${id}`,
      data: false,
      loader: true
    }).then((r) => {
      this.planDetail = {
        details: {
          id: id,
          name: r.data.name,
          goal: this.goalOpts[r.data.kind],
          duration: this.duringOpts[r.data.duration],
          time: this.$moment(new Date(r.data.started_at)).format('jYYYY/jMM/jDD')
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
      r.data.context.forEach((item) => {
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
        this.planDetail.rows[i][item.meal]=item.context
      })
    })
  }
}
</script>

<style scoped>
</style>