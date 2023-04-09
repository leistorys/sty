<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <tag></tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>

import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
import Tag from '@/components/Tag.vue'

export default {
  name: 'MainC',
  data() {
    return {
    }
  },
  components: {
    Aside,
    Header,
    Tag
  },
  methods: {
  },
  created() {
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  color: #333;
}
</style>
