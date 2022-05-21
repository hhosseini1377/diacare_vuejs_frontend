<template>
  <v-card
      class="pa-0 dashboard-box"
  >
    <slot name="content"></slot>
  </v-card>
</template>

<script>
export default {
  name: "DashboardBox"
}
</script>

<style>
.dashboard-box{
  box-shadow: 0px 12px 26px rgba(16, 30, 115, 0.06) !important;
  border-radius: 8px !important;
}
</style>