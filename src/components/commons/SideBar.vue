<template>
  <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
    <section class="menu-toolbar">
      <img src="" class="logo" alt="" />
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="() => (collapsed = !collapsed)"
      />
    </section>
    <a-menu theme="dark" mode="inline" :default-selected-keys="[menus[0].id]">
      <a-menu-item v-for="menu in menus" :key="menu.id">
        <a-icon :type="menu.icon" />
        <span>{{ menu.title }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      menus: [
        {
          id: 1,
          icon: 'unordered-list',
          route: '/graph/list',
          title: '数据集列表',
        },
        {
          id: 2,
          icon: 'setting',
          route: '/modal/manage',
          title: '模型管理',
        },
      ]
    };
  },
  name: "Sidebar",
  
};
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 10px;
  cursor: pointer;
  transition: color 0.3s;
  color: #fff;
  font-size: 26px;
}
.menu-toolbar {
  display: flex;
  justify-content: space-between;
}
.ant-menu-item {
  text-align: left;
}
</style>
