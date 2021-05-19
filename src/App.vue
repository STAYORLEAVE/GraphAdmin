<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout>
        <Sidebar></Sidebar>
        <Header></Header>

        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <Router-view></Router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sidebar from "./components/commons/SideBar.vue";
import Header from "./components/commons/Header.vue";

export default {
  name: "App",
  components: { Sidebar, Header },
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#components-layout-demo-custom-trigger {
  width: 100%;
  height: 100%;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
