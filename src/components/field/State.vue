<template>
  <div>
    <v-select
        v-model="data"
        outlined
        :menu-props="{ auto: true, contentClass: 'ml-4', nudgeWidth: -16, offsetY: true }"
        :items="items"
        :label="label"
        :hint="hint"
        :error-messages="errorMessages ? errorMessages : ''"
        :hide-details="!errorMessages && [false, null, '', undefined].includes(hint)"
        :persistent-hint="![false, null, '', undefined].includes(hint)"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "State",
  props: {
    label: {
      type: String,
      default: 'استان'
    },
    hint: {
      type: String,
      default: ''
    },
    errorMessages: {
      type: [String, Boolean],
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    resetValue: {
      type: Number,
      default: 0
    },
    initial: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    data: null
  }),
  computed: {
    items(){
      let items = [
        {
          "value":0,
          "text":"آذربایجان شرقی"
        },
        {
          "value":1,
          "text":"آذربایجان غربی"
        },
        {
          "value":2,
          "text":"اردبیل"
        },
        {
          "value":3,
          "text":"اصفهان"
        },
        {
          "value":4,
          "text":"البرز"
        },
        {
          "value":5,
          "text":"ایلام"
        },
        {
          "value":6,
          "text":"بوشهر"
        },
        {
          "value":7,
          "text":"تهران"
        },
        {
          "value":8,
          "text":"خراسان جنوبی"
        },
        {
          "value":9,
          "text":"خراسان رضوی"
        },
        {
          "value":10,
          "text":"خراسان شمالی"
        },
        {
          "value":11,
          "text":"خوزستان"
        },
        {
          "value":12,
          "text":"زنجان"
        },
        {
          "value":13,
          "text":"سمنان"
        },
        {
          "value":14,
          "text":"سیستان و بلوچستان"
        },
        {
          "value":15,
          "text":"فارس"
        },
        {
          "value":16,
          "text":"قزوین"
        },
        {
          "value":17,
          "text":"قم"
        },
        {
          "value":18,
          "text":"لرستان"
        },
        {
          "value":19,
          "text":"مازندران"
        },
        {
          "value":20,
          "text":"مرکزی"
        },
        {
          "value":21,
          "text":"هرمزگان"
        },
        {
          "value":22,
          "text":"همدان"
        },
        {
          "value":23,
          "text":"چهارمحال و بختیاری"
        },
        {
          "value":24,
          "text":"کردستان"
        },
        {
          "value":25,
          "text":"کرمان"
        },
        {
          "value":26,
          "text":"کرمانشاه"
        },
        {
          "value":27,
          "text":"کهگلویه و بویراحمد"
        },
        {
          "value":28,
          "text":"گلستان"
        },
        {
          "value":29,
          "text":"گیلان"
        },
        {
          "value":30,
          "text":"یزد"
        }
      ]

      return items
    },
  },
  created(){
    if(!['', null, undefined].includes(this.initial)){
      this.data = this.initial;
    }
  },
  watch: {
    data(val){
      this.$emit("update", val);
    },
    resetValue(){
      this.data = null;
    }
  }
}
</script>

<style>
.theme--dark .vpd-content{
  background: #1E1E1E !important;
}
</style>
