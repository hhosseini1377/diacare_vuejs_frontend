<template>
  <v-row no-gutters justify="center" class="py-10 py-md-16">
    <v-col cols="11">
      <v-row no-gutters align="center">
        <v-col
            cols="12" md="7" lg="8"
            :class="inverse?'pr-md-8':'pl-md-8'"
            order="1"
            :order-md="inverse?2:0"
        >
          <slot name="content"></slot>
        </v-col>
        <v-col
            cols="12" md="5" lg="4"
            order="0"
            class="mb-6 mb-md-0"
        >
          <v-img
              max-width="100%"
              contain
              eager
              :src="img"
          ></v-img>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HorizontalBanner",
  props: {
    img: {
      type: String,
      default: require(`@/assets/media/img/hiro.webp`)
    },
    inverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>