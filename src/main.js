// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import {store} from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSocketio from 'vue-socket.io'
import toolbar from './components/toolbar.vue'
import tabs from './components/tabs.vue'
import vuefire from 'vuefire'
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(vuetify)

Vue.use(VueSocketio, 'https://agile-citadel-43436.herokuapp.com/')
// Vue.use(VueSocketio, 'http://localhost:3000/')
Vue.use(VueAxios, axios)
Vue.use(vuefire)
Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

Vue.component('mToolbar', toolbar)
Vue.component('tabs', tabs)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    router,
    render: h => h(require('./App'))
  })
})
