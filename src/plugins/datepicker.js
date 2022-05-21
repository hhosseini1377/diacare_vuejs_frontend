import Vue from "vue"

import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

Vue.use(VuePersianDatetimePicker, {
    name: 'viradate-picker',
    props: {
        format: 'jYYYY/jMM/jDD',
        //displayFormat: 'jDD jMMMM jYYYY',
        inline: true,
        editable: false,
        autoSubmit: false,
        wrapperSubmit: false,
        color: '#0AC5FF'
    }
})
