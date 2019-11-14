<template>
  <div>
    <transition name="move">
      <div v-show="showFlag" class="food" ref="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image"/>
            <div class="back" @click="hide">
              <span class="icon-arrow_lift"></span>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
            </div>
            <div class="cartcontroller-wrapper">
              <cartcontrol @cartAdd="cartAdd" :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div  class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">
                加入购物车
              </div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split v-show="food.info"></split>
          <div class="rating" v-show="food.ratings">
            <h1 class="title">商品评价</h1>
            <ratingselect @select="ratingtypeSelect" @toggle="contentToggle"  :desc="desc" :selectType="selectType"
                          :onlyContent="onlyContent" :ratings="food.ratings"></ratingselect>

            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                    class="rating-item border-1px">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar"></img>

                  </div>
                  <div class="time">{{rating.rateTime | formatDate()}}</div>
                  <div class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}">

                    </span>
                    {{rating.text}}
                  </div>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import Vue from 'vue';
  import cartcontrol from '../../components/carcontroller/carcontroller';
  import split from '../../components/split/split';
  import {formatDate} from '../../common/js/date';
  import ratingselect from '../../components/ratingselect/ratingselect';

  const POSTTIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL,
          this.onlyContent = false,
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.food, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          })
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
        this.$parent.cartAdd(event.target);
      },
      needShow(rateType, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return rateType === this.selectType
        }
      },
      ratingtypeSelect(type){
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      contentToggle(){
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      cartAdd(target){
        this.$parent.cartAdd(target);
      }
    },

    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    background: #fff
    width: 100%
    transform: translate3d(0, 0, 0)
    //动画过程
    &.move-enter-active, &.move-leave-active
      transition: all .5s linear
    //进入跟离开时状态
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px
      .title
        font-weight: 700px
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 151, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700px
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontroller-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          opacity: 0
        &.fade-enter, &.fade-leave-active
          transition: all 0.2s

    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            display: inline-block
            line-height: 12px
            font-size: 0
            .name
              margin-right: 6px
              display: inline-block
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
              margin-right: 6px
            .avatar
              border-radius: 50%

          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            margin-bottom: 6px
            line-height: 16px
            font-size: 12px
            font-weight: 700
            color: rgb(1, 17, 27)
            .icon-thumb_up, icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
