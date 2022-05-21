import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import '../plugins/moment'

Vue.use(VueRouter)

//routes
const routes = [
    {
        path: '/',
        name: 'LandingPage',
        meta: {
            layout: 'Main'
        },
        component: () => import(
            /* webpackChunkName: "LandingPage" */
            '@/views/LandingPage.vue'
            )
    },
    {
        path: '/articles',
        name: 'ArticlesArchive',
        meta: {
            layout: 'Main'
        },
        component: () => import(
            /* webpackChunkName: "ArticlesArchive" */
            '@/views/ArticlesArchive.vue'
            )
    },
    {
        path: '/article/:id',
        name: 'ArticlesShow',
        meta: {
            layout: 'Main'
        },
        component: () => import(
            /* webpackChunkName: "ArticlesShow" */
            '@/views/ArticlesShow.vue'
            )
    },
    {
        path: '/get-free-plan',
        name: 'FreePlan',
        meta: {
            layout: 'Main'
        },
        component: () => import(
            /* webpackChunkName: "FreePlan" */
            '@/views/FreePlan.vue'
            )
    },
    {
        path: '/doctors',
        name: 'SearchDoctors',
        meta: {
            layout: 'Main'
        },
        component: () => import(
            /* webpackChunkName: "SearchDoctors" */
            '@/views/SearchDoctors.vue'
            )
    },
    //Patient
    {
        path: '/auth',
        name: 'AuthPatient',
        meta: {
            title: 'ورود/عضویت بیماران',
            layout: 'Blank',
        },
        component: () => import(
            /* webpackChunkName: "Auth" */
            '@/views/patient/Auth.vue'
            )
    },
    {
        path: '/lost-password',
        name: 'LostPassPatient',
        meta: {
            title: 'فراموشی گذرواژه بیماران',
            layout: 'Blank'
        },
        component: () => import(
            /* webpackChunkName: "LostPass" */
            '@/views/patient/LostPass.vue'
            )
    },
    {
        path: '/dashboard',
        name: 'DashboardPatient',
        meta: {
            title: 'داشبورد',
            layout: 'Dashboard',
            protected: true,
            role: 'patient'
        },
        component: () => import(
            /* webpackChunkName: "DashboardPatient" */
            '@/views/patient/Dashboard.vue'
            )
    },
    {
        path: '/visit-detail/:id',
        name: 'VisitDetail',
        meta: {
            title: 'جزئیات رزرو',
            layout: 'Dashboard',
            protected: true,
            role: 'patient'
        },
        component: () => import(
            /* webpackChunkName: "VisitDetail" */
            '@/views/patient/VisitDetail.vue'
            )
    },
    {
        path: '/free-plan/:id',
        name: 'FreePlanDetail',
        meta: {
            title: 'جزئیات برنامه غذایی',
            layout: 'Dashboard',
            protected: true,
            role: 'patient'
        },
        component: () => import(
            /* webpackChunkName: "FreePlanDetail" */
            '@/views/patient/FreePlanDetail.vue'
            )
    },
    {
        path: '/doctor-times/:id/:date',
        name: 'DoctorsShow',
        meta: {
            layout: 'Main',
            protected: true,
            role: 'patient'
        },
        component: () => import(
            /* webpackChunkName: "DoctorsShow" */
            '@/views/DoctorsShow.vue'
            )
    },
    //Doctor
    {
        path: '/doctor/auth',
        name: 'AuthDoctor',
        meta: {
            title: 'ورود/عضویت پزشکان',
            layout: 'Blank'
        },
        component: () => import(
            /* webpackChunkName: "AuthDoctor" */
            '@/views/doctor/Auth.vue'
            )
    },
    {
        path: '/doctor/lost-password',
        name: 'LostPassDoctor',
        meta: {
            title: 'فراموشی گذرواژه پزشکان',
            layout: 'Blank'
        },
        component: () => import(
            /* webpackChunkName: "LostPassDoctor" */
            '@/views/doctor/LostPass.vue'
            )
    },
    {
        path: '/doctor/dashboard',
        name: 'DashboardDoctor',
        meta: {
            title: 'داشبورد',
            layout: 'Dashboard',
            protected: true,
            role: 'expert'
        },
        component: () => import(
            /* webpackChunkName: "DashboardDoctor" */
            '@/views/doctor/Dashboard.vue'
            )
    },
    {
        path: '/doctor/visit-detail/:id',
        name: 'VisitDetailDoctor',
        meta: {
            title: 'جزئیات رزرو',
            layout: 'Dashboard',
            protected: true,
            role: 'expert'
        },
        component: () => import(
            /* webpackChunkName: "VisitDetailDoctor" */
            '@/views/doctor/VisitDetail.vue'
            )
    },
    {
        path: '/doctor/add-article',
        name: 'AddArticle',
        meta: {
            title: 'افزودن مقاله',
            layout: 'Dashboard',
            protected: true,
            role: 'expert'
        },
        component: () => import(
            /* webpackChunkName: "AddArticle" */
            '@/views/doctor/AddArticle.vue'
            )
    },
    {
        path: '/doctor/add-prescription/:id',
        name: 'AddPrescription',
        meta: {
            title: 'افزودن رژیم',
            layout: 'Dashboard',
            protected: true,
            role: 'expert'
        },
        component: () => import(
            /* webpackChunkName: "AddPrescription" */
            '@/views/doctor/AddPrescription.vue'
            )
    },
]

const router = new VueRouter({
    mode: 'history', base: '/', //for hosting on sub-directory => '/'
    linkExactActiveClass: 'currentLink', linkActiveClass: 'activeLink', routes
})

//use beforeEach route
router.beforeEach((to, from, next) => {
    //authentication
    let user = store.state.user

    if (!user) {
        let refToken = localStorage.getItem('refresh_token')
        let userLocal = localStorage.getItem('user')
        let accToken = localStorage.getItem('access_token')
        let time = localStorage.getItem('access_token_time')
        let remember = localStorage.getItem('remember')

        if (refToken != null && userLocal != null && accToken != null && time != null) {
            userLocal=JSON.parse(userLocal)
            if (time > Vue.moment().unix()) {
                store.commit("setUser", userLocal)
                user = userLocal
            } else if (remember != null) {
                store.getters.api({
                    method: 'post', url: 'api/token/refresh/', data: {
                        "refresh": refToken
                    }, loader: false
                }).then((r) => {
                    localStorage.setItem('access_token', r.data.access)
                    user = userLocal
                }).catch((e) => {
                    if (e.response.status == 401) {
                        store.commit('setSnackbar', {
                            show: Vue.moment().unix(), time: 2000, message: 'توکن نامعتبر یا منقضی شده است', color: 'error'
                        })
                        router.push({
                            name: 'LandingPage'
                        })
                    }
                })
            }
        }
    }

    //authorization
    if (to.meta.protected) {
        if (!user || user.role != to.meta.role) {
            store.commit('setSnackbar', {
                show: Vue.moment().unix(), time: 2000, message: 'دسترسی غیر مجاز', color: 'error'
            })
            router.push({
                name: 'LandingPage'
            })
        }
    }

    next()

})

//use afterEach route to set title and scroll to top
router.afterEach((to) => {
    //scroll to top
    window.scrollTo(0, 0)

    Vue.nextTick(() => {
        // title
        let prefix = 'دیاکِر'
        let title = (to.meta.title === undefined) ? false : to.meta.title
        document.title = title === false ? prefix : prefix + ' | ' + title
    });
});

export default router
