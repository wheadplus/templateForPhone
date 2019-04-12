# 目录结构

# 初始化配置
- vue-router
- vuex
- less
- normal.css + reset.css
- 移动端适配 

# 移动端适配

[记得原文](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

# 使用方法

1. 安装插件
```js
npm install cssnano cssnano-preset-advanced postcss-aspect-ratio-mini postcss-cssnext postcss-import postcss-px-to-viewport postcss-url postcss-viewport-units postcss-write-svg -D
```
2. 配置postcss
根据设计稿宽高，填写对应的 viewportWidth 和 viewportHeight
```
"postcss": {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      "utf8": false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      "viewportWidth": 375,
      "viewportHeight": 667,
      "unitPrecision": 3,
      "viewportUnit": "vw",
      "selectorBlackList": [
        ".ignore",
        ".hairlines"
      ],
      "minPixelValue": 1,
      "mediaQuery": false
    },
    "postcss-viewport-units": {},
    "cssnano": {
      "preset": "advanced",
      "autoprefixer": false,
      "postcss-zindex": false
    }
  }
},
```

3. 兼容低端浏览器，在public/index.html 添加buggyfill
```
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
<script>
  window.onload = function () {
    window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks
    })
  }
</script> 
```

4. 开发
开发中 px 会编译为 vw.不需要转换的在 html 元素中添加 `.ignore` class。

css中如此操作即可
```
.ignore {
    margin: 10px;//带有.ignore类名，在这个类名写的`px`不会被转换
}
```
1px 问题
```
@svg 1px-border {
    height: 2px;
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 50%;
    }
}
.example {
    border: 1px solid transparent;
    border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
}
```
