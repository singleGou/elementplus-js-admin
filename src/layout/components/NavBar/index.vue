<script setup>
import { useUserStore } from '@/store'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 侧边栏折叠控制
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
  toggleSidebar: {
    type: Function,
    required: true,
  },
})

// 面包屑数据生成
const breadcrumbs = computed(() => {
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]

  if (!first || first.path !== '/dashboard') {
    return [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)
  }
  return matched
})

// 退出登录
const handleLogout = () => {
  userStore.resetToken()
}

// 下拉菜单指令处理
const handleCommand = (command) => {
  if (command === 'logout') {
    handleLogout()
  }
}
</script>

<template>
  <el-header class="navbar">
    <div class="navbar-left">
      <div class="hamburger" @click="toggleSidebar">
        <el-icon size="20" :class="{ 'is-active': isCollapse }">
          <i-ep-fold v-if="!isCollapse" />
          <i-ep-expand v-else />
        </el-icon>
      </div>

      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
          <span v-if="index === breadcrumbs.length - 1" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else @click.prevent="router.push(item.path)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="navbar-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <el-avatar :size="32" :src="userStore.avatar" />
          <span class="user-name">{{ userStore.username }}</span>
          <el-icon class="el-icon--right"><i-ep-arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  backdrop-filter: saturate(50%) blur(4px);
  background-clip: padding-box;
  background-color: rgba(255, 255, 255, 0.8);

  .navbar-left {
    display: flex;
    align-items: center;
  }

  .hamburger {
    cursor: pointer;
    margin-right: 20px;
    display: flex;
    align-items: center;
    color: var(--el-text-color-regular);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 8px;
    border-radius: 6px;

    &:hover {
      color: var(--el-color-primary);
      background-color: var(--el-fill-color-light);
    }

    &.is-active {
      transform: rotate(180deg);
    }
  }

  .breadcrumb {
    font-size: 14px;
    line-height: 50px;

    :deep(.el-breadcrumb__item) {
      .el-breadcrumb__inner {
        color: var(--el-text-color-regular);
        font-weight: normal;
        transition: all 0.3s;

        &:hover {
          color: var(--el-color-primary);
        }
      }

      &.is-last .el-breadcrumb__inner {
        color: var(--el-text-color-primary);
        cursor: text;
        font-weight: 600;
      }

      .el-breadcrumb__separator {
        color: var(--el-text-color-secondary);
        margin: 0 8px;
      }
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;

    .avatar-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 6px 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 25px;
      background: transparent;

      &:hover {
        background: var(--el-fill-color-light);
        transform: translateY(-1px);
      }

      .user-name {
        margin: 0 8px;
        font-size: 14px;
        color: var(--el-text-color-regular);
        font-weight: 500;
      }

      .el-icon {
        transition: all 0.3s;
      }

      &:hover .el-icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
