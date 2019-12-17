<template>
  <div class="carcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <transition name="inner">
          <i v-show="food.count>0" class="inner icon-remove_circle_outline"></i>
        </transition>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cartAdd', event.target);
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
        // this.$emit('decreaseCart',event.target);
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus">
  .carcontrol
    font-size: 0

    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)

      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear

      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)

      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transform: rotate(0)

        &.inner-enter-active, &.inner-leave-active
          transition: all 0.4s linear

        &.inner-enter, &.inner-leave-active
          opacity: 0
          transform: translate3d(24px, 0, 0)
          transform: rotate(180deg)

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px;
      height: 24px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)

    .cart-add
      display: inline-block
      padding: 6px
      height: 24px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
