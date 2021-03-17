<template>
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
       <router-link to="/graph/list"></router-link>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>

export default {
  data() {
    return {
    };
  },
  components: { Sidebar, Header },
};
</script>
<style scoped>
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
