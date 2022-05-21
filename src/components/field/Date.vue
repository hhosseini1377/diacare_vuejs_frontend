<template>
  <div>
    <v-text-field
        v-model="date"
        readonly
        :label="label"
        :hint="hint"
        :error-messages="errorMessages ? errorMessages : ''"
        :hide-details="!errorMessages && [false, null, '', undefined].includes(hint)"
        :persistent-hint="![false, null, '', undefined].includes(hint)"
        outlined
        dir="ltr"
        @click="showPicker = true"
    >
      <template slot="append">
        <v-icon @click="date = ''" v-show="date != '' && clearable">mdi-close</v-icon>
        <v-icon @click="showPicker = true">mdi-calendar-month</v-icon>
      </template>
    </v-text-field>
    <viradate-picker
        v-model="date"
        type="date"
        element="id"
        :inline="false"
        :show="showPicker"
        :range="false"
        :auto-submit="true"
        :locale="$route.params.locale"
        @close="showPicker = false"
    >
      <template v-slot:close-btn="">
        <v-icon size="18">mdi-chevron-left</v-icon>
      </template>
      <template v-slot:submit-btn="{ submit }">
        <v-btn
            color="secondary"
            @click="submit"
        >
          تایید
        </v-btn>
      </template>
      <template v-slot:now-btn="{ goToday }">
        <v-btn
            text
            @click="goToday"
        >
          اکنون
        </v-btn>
      </template>
    </viradate-picker>
  </div>
</template>

<script>
export default {
  name: "Date",
  props: {
    label: {
      type: String,
      default: 'تاریخ'
    },
    hint: {
      type: String,
      default: 'لطفا تاریخ را انتخاب کنید.'
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
    showPicker: false,
    date: ''
  }),
  created(){
    if(!['', null, undefined].includes(this.initial)){
      this.date = this.initial;
    }
  },
  watch: {
    date(val){
      this.$emit("update", val);
    },
    resetValue(){
      this.date = '';
    }
  }
}
</script>

<style>
.theme--dark .vpd-content{
  background: #1E1E1E !important;
}
</style>
