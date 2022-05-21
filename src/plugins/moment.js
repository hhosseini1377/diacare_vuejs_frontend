import Vue from 'vue'
import tz from 'moment-timezone'

Vue.use(require('vue-jalali-moment'), {
    tz
})

Vue.moment.locale('fa')

Vue.moment.tz.setDefault("Asia/Tehran")
