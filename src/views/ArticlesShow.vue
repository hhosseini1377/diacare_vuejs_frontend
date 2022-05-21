<template>
  <v-row justify="center" no-gutters v-if="article">
    <v-col cols="11">
      <h1 class="pt-10 mb-4">{{ article.title }}</h1>
      <!--      <p>{{ article.desc }}</p>
            <div class="v-card__subtitle px-0 pt-0">{{ article.datetime }}</div>-->
      <v-card
          class="px-6 py-4"
          v-html="article.content"
      ></v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ArticlesShow",
  data: () => ({
    article: false
  }),
  computed: {},
  created() {
    var id = this.$route.params.id
    //get articles
    this.$store.getters.api({
      method: 'get',
      url: `api/v1/article/show/${id}/`,
      data: false,
      loader: true
    }).then((r) => {
      this.article = {
        title: r.data.subject,
        content: r.data.context,
        id: id
      }
    }).catch((e)=>{
      if (e.response.status==404){
        this.$store.commit('setSnackbar', {
          show: this.$moment().unix(),
          time: 2000,
          message: e.response.data.detail,
          color: 'error'
        })
        this.$router.push({
          name: 'LandingPage'
        })
      }
    })
  }
}
</script>

<style scoped>
</style>