import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    rtl: true,
    icons: {
        iconfont: 'md'
    },
    theme: {
        dark: false,
        //themes
        themes: {
            light: {
                primary: '#03A3D4',
                primaryLight: '#0AC5FF',
                secondary: '#048A44',
                secondaryLight: '#11E174',
                accent: '#336cfb',
                info: colors.blue.darken1,
                warning: colors.amber.darken3,
                error: colors.red.darken1,
                success: colors.green.base,
                dashboardBg: '#F6F8FB',
                redBtn: '#FF0A0A',
            },
        },
    }
});
