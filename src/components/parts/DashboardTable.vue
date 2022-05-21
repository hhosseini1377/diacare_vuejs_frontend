<template>
  <v-simple-table v-if="data" class="dashboard-table">
    <template v-slot:default>
      <thead>
        <tr style="background-color: rgba(0,0,0,0.028)">
          <th
              v-for="(col, i) in data.cols"
              :key="`th-${name}-${i}`"
          >{{ col.title }}</th>
        </tr>
      </thead>
      <tbody>
        <slot name="rows"></slot>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "DashboardTable",
  props: {
    data: {
      type: [Object, Boolean],
      default: false
    },
    name: {
      type: String,
      default: 'table'
    }
  }
}
</script>

<style>
.dashboard-table.v-data-table{
  background-color: transparent !important;
}
</style>