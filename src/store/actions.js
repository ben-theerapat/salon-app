import axios from 'axios'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  signout ({commit}, payload) {
    commit('isLogin', false)
    LocalStorage.clear('userId')
    LocalStorage.clear('name')
    LocalStorage.clear('email')
    LocalStorage.clear('image')
    LocalStorage.clear('phone')
    LocalStorage.clear('address')
    LocalStorage.clear('key')
    router.push('/')
  },
  pullCourse ({commit, state}) {
    if (state.course.length == 0) {
      // axios.get('http://172.104.189.169:4000/api/getcourse/popular')
      // .then (res => {
      //   let result = res.data
      //   commit('addCoursePopular', result)
      //   commit('addCourse', result)
      // })
      axios.get('http://172.104.189.169:4000/api/getcourse/last')
      .then (res => {
        let result = res.data
        // commit('addCourseLast', result)
        commit('addCourse', result)
      })
      // axios.get('http://172.104.189.169:4000/api/getcourse/price')
      // .then (res => {
      //   let result = res.data
      //   commit('addCoursePrice', result)
      //   commit('addCourse', result)
      // })
    }
  },
  refreshCourse ({commit, state}) {
    state.course = []
    // axios.get('http://172.104.189.169:4000/api/getcourse/popular')
    // .then (res => {
    //   let result = res.data
    //   commit('addCoursePopular', result)
    //   commit('addCourse', result)
    // })
    axios.get('http://172.104.189.169:4000/api/getcourse/last')
    .then (res => {
      let result = res.data
      // commit('addCourseLast', result)
      commit('addCourse', result)
    })
    // axios.get('http://172.104.189.169:4000/api/getcourse/price')
    // .then (res => {
    //   let result = res.data
    //   commit('addCoursePrice', result)
    //   commit('addCourse', result)
    // })

  },
  purchaseCourse ({commit, state, getters}, payload) {
    payload.tstamp = Vue.moment().format('YYYY-MM-DD HH:mm:ss')
    console.log('payload ' + JSON.stringify(payload))
    axios.post('http://172.104.189.169:4000/api/purchase', payload)
    commit('addPurchaseCourse', getters.course_from_course_id(payload.course_id))
  },
  pullLesson ({commit, state}, courseId) {
    console.log('pullLesson')
    axios.get('http://172.104.189.169:4000/api/getlesson/' + courseId)
    .then (res => {
      let result = res.data
      console.log('pullLesson: ' + JSON.stringify(result))
      commit('addLesson', result)
    })
  },
  pullLessonRefresh ({commit, state}, courseId) {
    axios.get('http://172.104.189.169:4000/api/getlesson/' + courseId)
    .then (res => {
      let result = res.data
      commit('updateLesson', result)
    })
  },
  addFavorite ({commit, state}, lesson) {
    commit('addFavorite', [lesson])
    console.log(lesson)
    let data = {
      user_id: state.profile.user_id,
      lesson_id: lesson.lesson_id
    }
    state.favorite.map(c => c.lesson_id == lesson.lesson_id ? c.love += 1 : '')
    axios.post('http://172.104.189.169:4000/api/insertfavorite', data)
  },
  removeFavorite ({commit, state}, lessonId) {
    commit('removeFavorite', lessonId)
    let data = {
      user_id: state.profile.user_id,
      lesson_id: lessonId
    }
    state.favorite.map(c => c.lesson_id == lessonId ? c.love -= 1 : '')
    axios.post('http://172.104.189.169:4000/api/removeFavorite', data)
  },
  loadFavorite ({commit, state}, user_id) {
    if (state.favorite.length == 0 || state.favorite == undefined) {
      axios.get('http://172.104.189.169:4000/api/getfavorite/' + user_id)
      .then(res => {
        let result = res.data
        commit('addFavorite', result)
      })
    }
  },
  loadMyCourse ({commit, state}, user_id) {
    if (state.purchaseCourse.length == 0) {
      console.log('loadMyCourse2: ' + user_id)
      axios.get('http://172.104.189.169:4000/api/getuserpurchase/' + user_id)
      .then(res => {
        let result = res.data
        commit('addPurchaseCourse', result)
        console.log(result)
      })
    }
  },
  loadLessonFromLessonId ({commit}, lessonId) {
    axios.get('http://172.104.189.169:4000/api/getlesson_from_lesson_id/' + lessonId)
    .then(res => {
      let result = res.data
      commit('addLesson', result)
      console.log('loadLessonFromLessonId')
    })
  },
  addCourseView ({commit, state}, course_id) {
    console.log('course_id : ' + course_id)
    let data = {
      course_id: course_id
    }
    axios.post('http://172.104.189.169:4000/api/addCourseview', data)
    state.course.map(c => c.course_id == course_id ? c.view == null ? c.view = 1 : c.view += 1 : '')
  },
  addLessonView ({commit, state}, lesson_id) {
    console.log('lesson_id : ' + lesson_id)
    let data = {
      lesson_id: lesson_id
    }
    axios.post('http://172.104.189.169:4000/api/addlessonview', data)
    state.lesson.map(c => c.lesson_id == lesson_id ? c.view == null ? c.view = 1 : c.view += 1 : '')
  },
  sendMessage ({commit}, payload) {
    console.log('payload: ' + JSON.stringify(payload))
    axios.post('http://172.104.189.169:4000/api/addchat', payload)
  },
  getLastChat ({commit}, user_id) {
    axios.get('http://172.104.189.169:4000/api/getlastuserchat/' + user_id)
    .then(res => {
      let result = res.data
      commit('addMessage', result)
    })
  },
  addUserRecommend ({commit}, user_id) {
    const data = {
      user_id: user_id,
      tstamp: Vue.moment().format('YYYY-MM-DD HH:mm:ss')
    }
    console.log(data);
    axios.post('http://localhost:4000/api/addrecommend', data)
  }
}
