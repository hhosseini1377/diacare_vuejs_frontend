<template>
  <v-row v-if="articles" justify="center" no-gutters>
    <v-col cols="11">
      <h1 class="px-4 pt-10">آرشیو مقالات</h1>
      <v-row v-if="articles.length>0" no-gutters>
        <v-col
            v-for="(item, i) in articles" :key="`article-${i}`"
            class="px-4 py-3"
            cols="12"
            md="6"
        >
          <article-card
              :datetime="item.datetime"
              :desc="item.desc"
              :link="{
          name: 'ArticlesShow',
          params: {
            id: item.id
          }
        }"
              :title="item.title"
          />
        </v-col>
      </v-row>
      <v-pagination
          v-if="articles.length>0 && total>10"
          v-model="page"
          :length="(total%10==0)?Math.floor(total/10):Math.floor(total/10)+1"
          :total-visible="5"
          circle
          class="mt-8"
          color="primaryLight"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script>
import ArticleCard from "../components/cards/ArticleCard";

export default {
  name: "ArticlesArchive",
  components: {ArticleCard},
  data: () => ({
    page: 1,
    total: false,
    articles: false
  }),
  computed: {},
  methods: {
    getArticles() {
      this.$store.getters.api({
        method: 'get',
        url: `api/v1/article/retrieve/?limit=10&offset=${this.page == 1 ? 0 : (this.page - 1) * 10}`,
        data: false,
        loader: true
      }).then((r) => {
        this.articles = []
        this.total = r.data.count
        r.data.results.forEach((item) => {
          if (item.context.length > 255) {
            var desc = item.context.slice(0, 255).split(' ')
            desc.pop()
            item.context = desc.join(' ') + '...'
          }
          this.articles.push({
            title: item.subject,
            desc: item.context,
            id: item.id
          })

        })
      }).catch((e) => {
        if (e.response.status == 404) {
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: 'مقاله ای یافت نشد.',
            color: 'error'
          })
        }
      })
    }
  },
  created() {
    if (this.$route.query.page) {
      this.page = parseInt(this.$route.query.page)
    }
    //get articles
    this.getArticles()
  },
  watch: {
    page() {
      this.$router.push({
        name: 'ArticlesArchive',
        query: {
          page: this.page
        }
      })
      this.getArticles()
    }
  }
}
</script>

<style scoped>
</style>