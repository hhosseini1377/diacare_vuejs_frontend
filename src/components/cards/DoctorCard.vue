<template>
  <v-card
      class=" my-1 pa-4"
      :height="slide?'auto':'100%'"
  >
   <div class="text-center mb-4 mt-2">
     <v-avatar size="90" color="primaryLight" class="text-h4 white--text">
       {{name[0]}}
     </v-avatar>
   </div>
    <div class="text-center font-weight-bold mb-2">{{ name }}</div>
    <div class="text-center text-body-2 mb-4">{{ times }} نوبت قابل رزرو</div>
    <div class="text-center">
      <v-btn
          text
          color="primaryLight"
          :to="link"
          class="mr-4"
      >رزرو نوبت</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "DoctorCard",
  props: {
    name: {
      type: String,
      default: ''
    },
    times: {
      type: [String,Number],
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
</style>