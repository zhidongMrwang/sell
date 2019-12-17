import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';
import buySubmit from '../components/buySubmit/buySubmit';



export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: '',
  data() {
    return {
        id:(() => {
          let queryParam = urlParts();
          return queryParam.id;
        })()
      }

  },
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods

    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller?id='+12345,
      name: 'seller',
      component: seller
    },
    {
      path:'/buySubmit',
      name:'buySubmit',
      component:buySubmit
    }
  ]
})
