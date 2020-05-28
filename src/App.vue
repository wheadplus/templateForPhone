<template>
  <div id="app">
    <header>
      <div class="actions">
        <div class="actions-left" @click="goback">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Left" />
          </svg>
          智物扫一扫
        </div>
        <div class="actions-right" >
          <svg class="icon" aria-hidden="true" @click="handleActions('search')">
            <use xlink:href="#icon-search" />
          </svg>
          <svg class="icon" aria-hidden="true" @click="handleActions('qrcode')">
            <use xlink:href="#icon-saoma" />
          </svg>
          <svg class="icon" aria-hidden="true" @click="handleActions('add')">
            <use xlink:href="#icon-weibiao45142" />
          </svg>
        </div>
      </div>
    </header>
    <div class="tab setOnePx">
      <div
        class="tab-item"
        :class="currentTabItem == item ? 'active': ''"
        v-for="item in tabs"
        :key="item"
        @click="selectTabItem(item)"
      >
        {{item}}
        <div class="activedLine" v-if="currentTabItem == item"></div>
      </div>
      <div class="select">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibiaoti25" />
        </svg>
      </div>
    </div>
    <div class="tab-panel" v-if="tabs[0] === currentTabItem">常用</div>
    <div class="tab-panel" v-if="tabs[1] === currentTabItem">
      <div class="select-box" @click="handleSelectClass">
        {{selectName}}
        <div class="arrow"></div>
      </div>
      <div class="scroll-wrapper">
        <ClassList :classes="classes"></ClassList>
      </div>
    </div>
    <div class="tab-panel" v-if="tabs[2] === currentTabItem">我的商品</div>

    <van-action-sheet
      v-model="showSheet"
      :actions="actions"
      cancel-text="取消"
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import ClassList from "./components/list";
import Alphabet from "./components/Alphabet";
export default {
  components: { ClassList, Alphabet },
  data() {
    return {
      tabs: ["常用", "我的物品", "我的商品"],
      currentTabItem: "我的物品",
      selectName: "分类智物",
      showSheet: false,
      actions: [{ name: "分类智物" }, { name: "选项1" }, { name: "选项2" }],
      classes: [
        {
          title: "当前",
          items: [
            {
              id: 6452,
              name: "红江农场燕子的个人物品（我）",
              loaction: "珠海市香洲区狮山路339路[刚刚]",
              nums: 4,
              qrCode: "ss",
              avatar:
                "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.getMockData();
  },
  methods: {
    handleSelectClass() {
      this.showSheet = !this.showSheet;
    },
    onCancel() {
      this.showSheet = false;
    },
    onSelect(item) {
      this.showSheet = false;
      this.selectName = item.name;
      Toast(item.name);
    },
    selectTabItem(item) {
      this.currentTabItem = item;
    },
    goback() {
      Toast('返回')
    },
    handleActions(action) {
      Toast(action)
    },
    getMockData() {
      axios
        .get("www.baidu.com")
        .then(res => {})
        .catch(e => {
          this.classes = [
            {
              title: "当前",
              items: [
                {
                  id: 6452,
                  name: "红江农场燕子的个人物品（我）",
                  loaction: "珠海市香洲区狮山路339路[刚刚]",
                  nums: 4,
                  qrCode: "ss",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                },

                {
                  id: 6460,
                  name: "新登记的物品",
                  loaction: "",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                },
                {
                  id: 6461,
                  name: "分享回来的物品",
                  loaction: "",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                },
                {
                  id: 6462,
                  name: "要卖的物品",
                  loaction: "",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                }
              ]
            },
            {
              title: "置顶",
              items: [
                {
                  id: 6463,
                  name: "红江农场燕子的个人物品（我）",
                  loaction: "珠海市香洲区狮山路339路[刚刚]",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                },

                {
                  id: 6464,
                  name: "美食供应商分享店仓库",
                  loaction: "珠海市香洲区狮山路339路[刚刚]",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                }
              ]
            },
            {
              title: "A",
              items: [
                {
                  id: 6464,
                  name: "美食供应商分享店仓库",
                  loaction: "珠海市香洲区狮山路339路自己拍卖公司搜索",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                }
              ]
            },
            {
              title: "B",
              items: [
                {
                  id: 6463,
                  name: "红江农场燕子的个人物品（我）",
                  loaction: "珠海市香洲区狮山路339路[刚刚]",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                },

                {
                  id: 6464,
                  name: "美食供应商分享店仓库",
                  loaction: "珠海市香洲区狮山路339路[刚刚]",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                }
              ]
            },
            {
              title: "C",
              items: [
                {
                  id: 6473,
                  name: "红江农场燕子的个人物品（我）",
                  loaction: "珠海市香洲区狮山路339路[刚刚]",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                },

                {
                  id: 6474,
                  name: "美食供应商分享店仓库",
                  loaction: "珠海市香洲区狮山路339路[刚刚]",
                  nums: 4,
                  qrCode: "",
                  avatar:
                    "http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg"
                }
              ]
            },
            {
              title: "D",
              items: []
            },
            {
              title: "E",
              items: []
            },
            {
              title: "F",
              items: []
            },
            {
              title: "G",
              items: []
            },
            {
              title: "H",
              items: []
            },
            {
              title: "I",
              items: []
            },
            {
              title: "J",
              items: []
            },
            {
              title: "K",
              items: []
            },
            {
              title: "L",
              items: []
            },
            {
              title: "M",
              items: []
            },
            {
              title: "N",
              items: []
            },
            {
              title: "O",
              items: []
            },
            {
              title: "P",
              items: []
            },
            {
              title: "Q",
              items: []
            },
            {
              title: "S",
              items: []
            },
            {
              title: "Y",
              items: []
            },
            {
              title: "Z",
              items: []
            },
            {
              title: "U",
              items: []
            },
            {
              title: "V",
              items: []
            },
            {
              title: "W",
              items: []
            },
            {
              title: "X",
              items: []
            },
            {
              title: "Y",
              items: []
            },
            {
              title: "Z",
              items: []
            },
            {
              title: "#",
              items: []
            }
          ];
        });
    }
  }
};
</script>

<style lang="less">
.setOnePx {
  position: relative;
  &::after {
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
}

header {
  background-color: deepskyblue;
}
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: #fff;
  &-left {
    margin-left: 10px;
  }
  &-right {
    svg {
      margin: 10px;
    }
  }
}

.tab {
  display: flex;
  align-items: center;

  .select {
    margin-left: auto;
    margin-right: 10px;
  }
  .tab-item {
    line-height: 40px;
    height: 40px;
    padding: 0 10px;
    position: relative;
    font-weight: bold;
    color: #777;

    &.active {
      color: black;
    }
    .activedLine {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 100%;
      background-color: deepskyblue;
    }
  }
}
.select-box {
  line-height: 40px;
  font-weight: bold;
  padding-left: 10px;

  position: relative;
  .arrow {
    content: "";
    width: 0px;
    height: 0px;
    border: 6px solid;
    border-color: black transparent transparent;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
}
</style>
