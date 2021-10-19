import axios from 'axios'
import Vue from 'vue'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:3000',
})

Vue.prototype.$axios = instance

export default instance
