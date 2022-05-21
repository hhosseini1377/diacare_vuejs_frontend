<template>
  <div :class="`text-center ${bordered?'bordered py-10 py-md-0':''}`">
    <div class="stat-number px-4" dir="ltr">{{ num }}</div>
    <div class="stat-desc px-4">{{ desc }}</div>
  </div>
</template>

<script>
export default {
  name: "StatisticCard",
  props: {
    num: {
      type: [String,Number],
      default: '+1700'
    },
    desc: {
      type: String,
      default: 'بیمار معالجه شده'
    },
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.stat-number{
  color: #08C4FF;
  font-size: 50px;
  line-height: 50px;
  font-weight: 700;
}
.stat-desc{
  color: #B3B3B3;
  font-size: 30px;
  line-height: 30px;
  font-weight: 700;
}
.bordered{
  border-radius: 0 !important;
  border: 5px solid rgba(201, 201, 201, 0.4);
  border-top: none;
  border-bottom: none;
}
@media screen and (max-width: 1263px) {
  .stat-desc{
    font-size: 20px;
    line-height: 20px;
  }
}
@media screen and (max-width: 960px) {
  .bordered{
    border: none;
  }
}
</style>