<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <h3>{{ isCollapse ? '后台' : '后台管理系统' }}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="i in item.children" :key=i.path>
        <el-menu-item @click="clickMenu(i)" :index="i.path">{{ i.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import Cookie from 'js-cookie'
export default {
  name: 'AsideC',
  data() {
    return {
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    clickMenu(items) {
      // console.log(item)
      // 当页面的路由与跳转的路由不一致才允许跳转
      // $route表示当前路由的页面，$router表示router实例
      if (this.$route.path !== items.path && !(this.$route.path === '/home' && (items.path === '/'))) {
        this.$router.push(items.path)
      }
      this.$store.commit('selectMenu', items)
    }
  },
  computed: {
    noChildren() {
      // 没有子菜单
      return this.menuData.filter(item => !item.children)
    },
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menuData() {
      // 判断当前数据，如果缓存中没有，则从当前的store中获取
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    }
  },
  created() { },
  mounted() { }
}
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  border-right: none;

  h3 {
    color: white;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
