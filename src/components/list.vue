<template>
  <div class="box">
    <div class="list-view" ref="listView">
      <ul v-if="classes">
        <li v-for="group in classes" class="list-group" :key="group.id" ref="listGroup">
          <div v-if="group.items.length > 0">
            <div class="list-group-title">{{ group.title }}</div>
            <ul>
              <li v-for="item in group.items" class="list-group-item" :key="item.id">
                <img :url="item.avatar" class="avatar" />
                <div class="item-info">
                  <div>{{item.name}}</div>
                  <div v-if="item.loaction" class="item-loaction">
                    <svg style="fill:green;"  class="icon" aria-hidden="true">
                      <use xlink:href="#icon-location" />
                    </svg>
                    {{item.loaction}}
                    </div>
                </div>
                <div class="item-right">
                  <div v-if="item.qrCode">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-qrcode" />
                    </svg>
                  </div>
                  <div v-else>{{group.title == '当前' ? `[${item.nums}]` : `(${item.nums})`}}</div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="list-shortcut">
        <ul>
          <li
            v-for="(item, index) in shortcutList"
            class="item"
            :data-index="index"
            :key="item.id"
            @touchstart="onShortcutStart"
            @touchmove.stop.prevent="onShortcutMove"
            :class="{'current': currentIndex === index}"
          >{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    classes: Array,
  },
  data() {
    return {
     
      scrollY: 0,
      currentIndex: 0
    };
  },
  created() {
    this.touch = {};
    // 初始化 better-scroll 必须要等 dom 加载完毕
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.listView, {
        probeType: 3,
        click: true
      });
      this.calculateHeight();
    });
  },
  methods: {
    onShortcutStart(e) {
      // 获取到绑定的 index
      let index = e.target.getAttribute("data-index");
      // 使用 better-scroll 的 scrollToElement 方法实现跳转
      this.scrollToElement(index);
      // 记录一下点击时候的 Y坐标 和 index
      let firstTouch = e.touches[0].pageY;
      this.touch.y1 = firstTouch;
      this.touch.anchorIndex = index;
    },
    onShortcutMove(e) {
      // 再记录一下移动时候的 Y坐标，然后计算出移动了几个索引
      let touchMove = e.touches[0].pageY;
      this.touch.y2 = touchMove;
      // 这里的 18 是索引元素的高度
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / 18);
      // 计算最后的位置
      // * 1 是因为 this.touch.anchorIndex 是字符串，用 * 1 偷懒的转化一下
      let index = this.touch.anchorIndex * 1 + delta;
      this.scrollToElement(index);
    },
    scrollToElement(index) {
      // 处理边界情况
      // 因为 index 通过滑动距离计算出来的
      // 所以向上滑超过索引框框的时候就会 < 0，向上就会超过最大值
      if (index < 0) {
        return;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
   
      this.$refs.listGroup[index] &&
        this.scroll.scrollToElement(this.$refs.listGroup[index]);
    },
    calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },

  computed: {
    // 右边选择表
    shortcutList() {
      return this.classes.map(group => {
        return group.title;
      });
    }
  }
};
</script>

<style lang="less">
.box {
  position: fixed;
  width: 100%;
  height: 100%;
}
.list-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .list-group {
    padding-top: 10px;

    .list-group-title {
      line-height: 12px;
      padding: 4px 0;
      box-sizing: border-box;

      padding-left: 10px;
      font-size: 12px;
      color: #777;
      background: #eee;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 5px 5px 5px 10px;
      position: relative;
      &:not(:last-of-type)::after {
        position: absolute;
        content: "";
        background-color: #e5e5e5;
        display: block;
        width: 100%;
        height: 1px; /*no*/
        transform: scale(1, 0.5);
        bottom: 0;
        left: 0;
      }
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 5%;
      }
      .item-info {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-left: 10px;
        color: black;
        font-size: 16px;
        font-weight: 600;
        > div {
          &.item-loaction {
            font-size: 12px;
            color: deepskyblue;
            overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
width: 240px;
          }
        }
      }

      .item-right {
        width: 50px;
      }
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 10px;
    width: 30px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    // background: rgba(167, 167, 167, 0.5);
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: black;
      font-size: 11px;
      // &.current {
      //   color: #c20c0c;
      //   // font-weight: bold;
      // }
    }
  }
}
</style>