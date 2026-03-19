<script setup>
import { provide, ref } from 'vue'
import AppMain from './components/AppMain/index.vue'
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import TagsView from './components/TagsView/index.vue'

// 侧边栏折叠控制
const isCollapse = ref(false)
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

// 标签导航栏显示控制
const showTagsView = ref(true)

// 内容区刷新控制
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  // nextTick 会在 DOM 更新后执行
  import('vue').then(({ nextTick }) => {
    nextTick(() => {
      isRouterAlive.value = true
    })
  })
}

provide('reload', reload)
</script>

<template>
  <el-container class="app-wrapper" :class="{ 'sidebar-collapse': isCollapse }">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="sidebar-container">
      <SideBar :is-collapse="isCollapse" />
    </el-aside>

    <!-- 主容器 -->
    <div class="main-container" :class="{ 'sidebar-collapse': isCollapse }">
      <!-- 顶部导航栏 -->
      <NavBar :is-collapse="isCollapse" :toggle-sidebar="toggleSidebar" />

      <!-- 标签导航栏 -->
      <TagsView v-if="showTagsView" />

      <!-- 内容区 -->
      <AppMain v-if="isRouterAlive" />
    </div>
  </el-container>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.main-container {
  flex: 1;
  min-width: 0;
  min-height: 100vh;
  background-color: var(--app-bg-color);
  display: flex;
  flex-direction: column;
}

.sidebar-container {
  z-index: 1001;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
