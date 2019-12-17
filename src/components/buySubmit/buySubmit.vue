<template>
  <div class="buy-submit">
    <div class="header">
      <div class="back">
        <span class="icon-arrow_lift"></span>
      </div>
      <span class="title">提交订单</span>
    </div>
    <div class="submit-content">
      <div class="address-wrapper">
        <div class="address border-1px">
          <span class="text">
          选择收货地址
          </span>
          <span class="icon-keyboard_arrow_right"></span>

        </div>
        <div class="delivery-time">
          <span class="text">立即送出</span>
          <span class="time">大约30分钟后送到</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <div class="goods-wrapper">
        <div class="name">
          <span class="seller-name border-1px">{{sellerList.name}}</span>
          <span class="seller-run">商家自配</span>
        </div>
        <div class="goods">
          <ul class="good">
            <li v-for="food in selectFoods" class="select-food">
              <img :src="food.image" width="60px" height="60px" class="img">
              <span class="select-name">{{food.name}}</span>
              <span class="count">x{{food.count}}</span>
              <span class="price">￥{{food.price* food.count}}</span>
            </li>
          </ul>
          <span></span>
        </div>
      </div>
    </div>

  </div>


</template>

<script type="text/ecmascript-6">
  import seller from '../../../data.json';

  export default {
    data() {
      return {
        sellerList: object,
      };
    },
    created() {
      this.sellerList = seller.seller;
    },
    computed: {
      selectFoods() {
        return this.$route.query.selectFoods;
      }

    }
  };

</script>

<style lang="stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"
  .buy-submit
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    opacity: 1
    background: #fffa62

    .header
      position: relative
      width: 100%
      height: 40px
      background: #fffa62

      .back
        position: absolute
        top: 10px
        left: 10px

        .icon-arrow_lift
          display: block
          padding 2px
          font-size: 20px
          color: #071007

      .title
        display inline-block
        position absolute
        top: 10px
        left: 40%
        float: left
        color #2b243c
        padding: 4px 0
        font-size: 14px
        font-weight: 400px

    .submit-content
      .address-wrapper
        border-radius: 12px
        border: 1px solid rgba(7, 17, 27, 0.1)
        padding: 0 18px
        height: 80px
        margin 0 10px 0 10px
        width: 84%
        background: #fff

        .address
          height: 40px
          border-1px(rgba(7, 17, 27, 0.1))

          .text
            display inline-block
            margin: 13px 0 6px 5px
            width: 45%
            font-size: 18px

          .icon-keyboard_arrow_right
            display inline-block

        .delivery-time
          height: 40px

          .text
            display inline-block
            margin: 13px 0 6px 5px
            width: 50%
            font-size: 14px

          .time
            display inline-block
            margin: 13px 0 6px 5px

            font-size: 14px

          .icon-keyboard_arrow_right
            display inline-block

      .goods-wrapper
        border-radius: 12px
        padding: 0 18px
        border: 1px solid rgba(7, 17, 27, 0.1)
        height: 800px
        margin 10px 10px 0 10px
        width: 84%
        background: #fff

        .name
          padding 5px 0
          border-1px(rgba(7, 17, 27, 0.1))

          .seller-name
            display: inline-block
            padding: 10px 5px
            font-size: 14px
            font-weight: 400

          .seller-run
            display: inline-block
            font-size: 10px
            color: #07111b
            font-weight: 400
            margin-left: 100px
            padding: 1px
            border: 1px solid #07111b

        .goods
          .good
            .slelect-food
              position: relative

              .img
                position: absolute
                width: 60px
                height: 60px

              .select-name
                position: absolute
                left 60px
                top: 0px
                display: inline-block
                width: 100px

              .count
                position: absolute
                left 80px
                top: 50px

              .price
                position: absolute
                left: 300px
                top: 30px
</style>
