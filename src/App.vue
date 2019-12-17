<template>
  <div>
    <v-header :seller="sellerList"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'seller'}">商家</router-link>
      </div>
    </div>
    <keep-alive>
    <router-view :seller="sellerList"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParts} from "./common/js/util";
  import header from './components/header/header.vue';
  import seller from '../data.json';

  export default {
    data() {
      return {
        sellerList: {
          id:(() => {
            let queryParam = urlParts();
            return queryParam.id;
          })()
        }
      }
    },
    created() {
      this.sellerList = seller.seller
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" type="text/stylus">
  /*@import "./common/stylus/index.styl";*/
  @import "./common/stylus/mixin.styl";
  @import "./common/stylus/base.styl";

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    //border-bottom:1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)

</style>
