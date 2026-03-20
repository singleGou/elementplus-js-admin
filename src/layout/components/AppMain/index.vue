<script setup>
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const getRouteKey = (route) => {
  const k = appStore.refreshKeys?.[route.fullPath] || 0
  return `${route.fullPath}-${k}`
}
</script>

<template>
  <el-main class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="appStore.cachedViews">
          <component :is="Component" :key="getRouteKey(route)" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  padding: 24px;
  background-color: #f5f7fa;
}

/* Transitions */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
