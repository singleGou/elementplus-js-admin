<script setup>
import { useAppStore } from '@/store/modules/app'
import { nextTick, provide, ref } from 'vue'
import AppMain from './components/AppMain/index.vue'
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import TagsView from './components/TagsView/index.vue'

const appStore = useAppStore()

// 侧边栏折叠控制
const isCollapse = ref(false)
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

// 标签导航栏显示控制
const showTagsView = ref(true)

const reload = async ({ name, fullPath } = {}) => {
  if (name) {
    const idx = appStore.cachedViews.indexOf(name)
    if (idx !== -1) {
      appStore.cachedViews.splice(idx, 1)
      await nextTick()
      appStore.cachedViews.push(name)
    }
  }

  if (fullPath) {
    appStore.refreshKeys[fullPath] = (appStore.refreshKeys[fullPath] || 0) + 1
  }
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
      <AppMain />
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
