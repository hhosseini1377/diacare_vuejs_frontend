<template>
  <v-card
      class="articlecard my-1"
      :height="slide?'auto':'100%'"
  >
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ datetime }}</v-card-subtitle>
    <v-card-text class="articlecard-desc">{{ desc }}</v-card-text>
    <v-card-actions class="articlecard-acts">
      <v-btn
          text
          color="primaryLight"
          :to="link"
          class="mr-4"
      >اطلاعات بیشتر</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    datetime: {
      type: String,
      default: ''
    },
    link: {
      type: [String, Object],
      default: ''
    },
    slide: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.articlecard{
  position: relative;
  padding-bottom: 68px;
}
.articlecard-desc{
  width: auto;
  color: #979797;
  font-width: 300;
}
.articlecard-acts{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 0;
}
</style>