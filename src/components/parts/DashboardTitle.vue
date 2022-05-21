<template>
  <v-toolbar color="transparent" flat class="dashboard-title">
    <v-icon class="ml-2" size="30">{{ icon }}</v-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: "DashboardTitle",
  props: {
    title: {
      type: String,
      default: 'داشبورد'
    },
    icon: {
      type: String,
      default: 'dashboard'
    }
  }
}
</script>

<style>
.dashboard-title .v-toolbar__content{
  padding-right: 0;
  padding-left: 0;
}
</style>