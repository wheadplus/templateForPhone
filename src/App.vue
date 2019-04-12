<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <div class='box'>
      <div aspectratio class="">hahha</div>
    </div>
  </div>
</template>

<style lang="less">
[aspectratio] { position: relative; } [aspectratio]::before { content: ''; display: block; width: 1px; margin-left: -1px; height: 0; }著作权归作者所有。

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.box {
  background: #42b983;
  margin: 0 auto;
  width: 300px;
  height: 70px;
  
}
</style>
