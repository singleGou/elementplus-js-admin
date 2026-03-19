<script setup>
import { usePermissionStore } from '@/store'
import SideBarItem from './components/SideBarItem.vue'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const permissionStore = usePermissionStore()
</script>

<template>
  <div class="sidebar-container">
    <div class="logo-container" :class="{ collapsed: isCollapse }">
      <div class="logo-box">
        <i-ep-element-plus class="logo-icon" />
      </div>
      <span class="logo-text" v-show="!isCollapse">Admin Elite</span>
    </div>

    <el-scrollbar>
      <el-menu :default-active="$route.path" :collapse="isCollapse" unique-opened router class="el-menu-vertical">
        <el-menu-item index="/index">
          <el-icon><i-ep-home-filled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <SideBarItem v-for="item in permissionStore.menuList" :key="item.id" :item="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  overflow: hidden;
  .logo-container {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 60px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    background-color: #ffffff;
    transition: all 0.3s;

    .logo-box {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--el-color-primary);
      border-radius: 8px;
      margin-right: 10px;
      color: #fff;
      font-size: 20px;
      transition: all 0.3s;
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
    }

    .logo-text {
      font-weight: 600;
      font-size: 18px;
      color: var(--el-text-color-primary);
      white-space: nowrap;
    }

    &.collapsed {
      .logo-box {
        margin-right: 0;
      }

      .logo-text {
        display: none;
      }
    }
  }

  .el-menu-vertical {
    border-right: none;
    :deep(.el-menu-item) {
      &.is-active {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
        border-right: 3px solid var(--el-color-primary);
      }

      &:hover {
        background-color: var(--el-fill-color-light);
      }
    }

    :deep(.el-sub-menu__title:hover) {
      background-color: var(--el-fill-color-light);
    }
  }
}
</style>
