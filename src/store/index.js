import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage, Toast } from 'quasar'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
      page2: false,
      isLogin: LocalStorage.get.item('isLogin'),
      profile: {
        user_id: LocalStorage.get.item('user_id'),
        fname: LocalStorage.get.item('fname'),
        lname: LocalStorage.get.item('lname'),
        email: LocalStorage.get.item('email'),
        avatar: 'https://www.shareicon.net/download/2016/05/29/772558_user_512x512.png',
        address: LocalStorage.get.item('address'),
        phone: LocalStorage.get.item('phone'),
        age: LocalStorage.get.item('age')
      },
      purchaseCourse: [],
      // coursepopular: LocalStorage.get.item('coursepopular'),
      // courselast: LocalStorage.get.item('courselast'),
      // courseprice: LocalStorage.get.item('courseprice'),
      lesson: [],
      favorite: [],
      creditCard: LocalStorage.get.item('creditCard'),
      course: [],
      message: LocalStorage.get.item('message') == undefined ? [] : LocalStorage.get.item('message')
    },
    getters,
    mutations,
    actions
  })
