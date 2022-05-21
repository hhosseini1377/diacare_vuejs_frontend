<template>
  <div class="d-flex align-center mb-4">
    <div class="section-head ml-2">{{ title }}</div>
    <div class="ml-2 circles">
      <v-icon
          size="16"
          color="primaryLight"
      >circle</v-icon>
      <v-icon
          size="16"
          color="primaryLight"
      >circle</v-icon>
      <v-icon
          size="16"
          color="primaryLight"
      >circle</v-icon>
    </div>
    <div class="flex-fill">
      <v-divider class="primaryLight" style="border-width: 2px 0 0 0;"></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionHead",
  props: {
    title: String
  }
}
</script>

<style scoped>
.section-head{
  font-weight: 500;
  font-size: 26px;
}
.circles i{
  margin: 0 0 0 2px;
}
.circles i:last-child{
  margin: 0;
}
</style>