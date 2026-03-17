<template>
  <el-main class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </el-main>
</template>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  padding: 24px;
  overflow: hidden;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
  transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
