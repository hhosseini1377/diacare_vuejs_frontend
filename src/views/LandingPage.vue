<template>
  <div>
    <!--hero-->
    <horizontal-banner>
      <template slot="content">
        <h1 class="heading">سرویس پیشگیری و کنترل دیابت</h1>
        <p class="my-4 my-md-7">از میان متخصصین دیابت، زمانی را برای ملاقات رزرو کنید تا با مراجعه حضوری و بررسی وضعیت شما متخصصین ما برنامه غذایی متناسب برای شما را ایجاد نمایند و با تغییر سبک زندگیتان شما را در مسیر پیش گیری یا کنترل دیابت همراهی نمایند.</p>
        <v-btn
            :to="{
              name: 'SearchDoctors'
            }"
            class="exclusive"
            color="primaryLight"
            elevation="0"
            x-large
        >بیشتر بدانید...
        </v-btn>
      </template>
    </horizontal-banner>

    <!--statistics-->
    <v-row v-if="info" class="py-10 py-md-16" justify="center" no-gutters>
      <v-col cols="9">
        <v-card
            class="pa-10"
            elevation="0"
        >
          <v-row no-gutters>
            <v-col cols="12" md="4">
              <statistic-card
                  :num="info.patients_count>0?'+'+info.patients_count:info.patients_count"
                  desc="بیمار تحت درمان"
              />
            </v-col>
            <v-col cols="12" md="4">
              <statistic-card
                  :num="info.experts_count>0?'+'+info.experts_count:info.experts_count"
                  bordered
                  desc="پزشک فعال"
              />
            </v-col>
            <v-col cols="12" md="4">
              <statistic-card
                  :num="info.done_visits_count>0?'+'+info.done_visits_count:info.done_visits_count"
                  desc="ویزیت انجام شده"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!--whats diabet-->
    <horizontal-banner
        :img="require(`@/assets/media/img/dibet.webp`)"
        inverse
    >
      <template slot="content">
        <h2 class="heading">دیابت چیست؟</h2>
        <p class="my-4 my-md-7">دیابت یک بیماری مزمن است. میزان قند خون شما توسط انسولین، هورمونی که توسط پانکراس تولید می شود کنترل می شود. وقتی غذا می خورید، غذا تجزیه شده و گلوکز وارد جریان خون شما می شود. انسولین، گلوکز را از جریان خون گرفته و آن را وارد سلول هایی می کند که در آنجا تجزیه شده تا به سوخت تبدیل شوند. اگر به دیابت دچار باشید، این یعنی یا انسولین کافی ندارید و یا انسولین برای دریافت گلوکز از خون و ورود به سلولهای شما عملکرد صحیح ندارد. این موضوع نشان دهنده قند خون بیش از حد نرمال خواهد بود.</p>
      </template>
    </horizontal-banner>

    <!--latest articles-->
    <v-row v-if="articles && articles.length>0" class="py-10 py-md-16" justify="center" no-gutters>
      <v-col cols="11">
        <section-head title="آخرین مقالات"/>

        <card-slider
            :autoplay="true"
            :interval="3000"
            :loop="false"
            :navigation="true"
            :pagination="false"
            :speed="400"
            :start="cardSliderStarter"
            lg-view="4"
            md-view="3"
            name="articles"
            pagination-color="dark"
            sm-view="2"
            xl-view="5"
            xs-view="1"
        >
          <template slot="slides">
            <article-card
                v-for="(item, i) in articles"
                :key="`article-${i}`"
                :desc="item.desc"
                :link="{
                  name: 'ArticlesShow',
                  params: {
                    id: item.id
                  }
                }"
                :title="item.title"
                class="swiper-slide"
                slide
            />
          </template>
        </card-slider>
      </v-col>
    </v-row>

    <!--free plan-->
    <horizontal-banner
        :img="require(`@/assets/media/img/freeplan.webp`)"
    >
      <template slot="content">
        <h2 class="heading primaryLight--text">برنامه غذایی خودت رو رایگان بگیر!!!</h2>
        <p class="my-4 my-md-7">درصورتی که نیاز به برنامه برای کاهش وزن، کنترل وزن و یا افزایش وزنتان دارید در این بخش می‌توانید با وارد کردن مشخصات بدنیتان وضعیتتان را مشاهده نمایید و با توجه به گزارش برنامه مورد نظرتان را رایگان دریافت کنید!</p>
        <v-btn
            :to="{
              name: 'FreePlan'
            }"
            class="exclusive"
            color="primaryLight"
            elevation="0"
            x-large
        >بیشتر بدانید...
        </v-btn>
      </template>
    </horizontal-banner>
  </div>
</template>

<script>
import HorizontalBanner from "../components/parts/HorizontalBanner";
import StatisticCard from "../components/cards/StatisticCard";
import ArticleCard from "../components/cards/ArticleCard";
import CardSlider from "../components/parts/CardSlider";
import SectionHead from "../components/parts/SectionHead";

export default {
  name: "LandingPage",
  components: {SectionHead, CardSlider, ArticleCard, StatisticCard, HorizontalBanner},
  data: () => ({
    cardSliderStarter: 0,
    info: false,
    articles: false
  }),
  computed: {},
  mounted() {
  },
  created() {
    //get info
    this.$store.getters.api({
      method: 'get',
      url: `api/v1/diacare_history/`,
      data: false,
      loader: true
    }).then((r) => {
      this.info = {
        "patients_count": r.data.patients_count,
        "experts_count": r.data.experts_count,
        "done_visits_count": r.data.done_visits_count
      }
    })

    //get articles
    this.$store.getters.api({
      method: 'get',
      url: `api/v1/article/retrieve/?limit=10&offset=0`,
      data: false,
      loader: true
    }).then((r) => {
      this.articles = []
      r.data.results.forEach((item) => {
        var desc = item.context.slice(1, 255).split(' ')
        desc.pop()
        this.articles.push({
          title: item.subject,
          desc: desc.join(' ') + '...',
          id: item.id
        })
        setTimeout(() => {
          this.cardSliderStarter = this.cardSliderStarter + 1
        }, 200)
      })
    })


  }
}
</script>

<style scoped>
</style>