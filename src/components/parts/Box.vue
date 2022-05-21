<template>
  <div class="auth-card-border">
    <v-card
        flat
        width="100%"
        class="pa-4 py-md-6 px-md-8 py-lg-10 px-lg-12 auth-card"
    >
      <!--title-->
      <v-card-title
          v-if="title"
          class="text-sm-h6 text-lg-h5 font-weight-bold"
      >{{ title }}</v-card-title>

      <!--content-->
      <v-card-text v-if="$slots['content']">
        <slot name="content"></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    title: {
      type: [String, Boolean],
      default: false
    },
  }
}
</script>

<style scoped>

</style>