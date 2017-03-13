// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import MintUI from 'mint-ui'
import 'element-ui/lib/theme-default/index.css'
import 'mint-ui/lib/style.min.css'
import vueResource from 'vue-resource'
import vueFinger from 'vue-finger'
import vueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(vueResource)
Vue.use(vueFinger)
Vue.use(vueAwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data () {
    return {
      BaseURI: 'http://localhost:8888/server/',
      StartStation: '',
      EndStation: ''
    }
  },
  methods: {
    addHistory: function () {
      window.history.replaceState(null, '', '#' + this.$route.fullPath)
    }
  },
  template: '<App/>',
  components: {App}
})

