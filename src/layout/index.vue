<script setup>
import { useUserStore } from '@/store'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 侧边栏折叠控制
const isCollapse = ref(false)
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

// 当前激活菜单
const activeMenu = computed(() => route.path)

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
  // userStore.resetToken()
  router.push('/login')
}

// 下拉菜单指令处理
const handleCommand = (command) => {
  if (command === 'logout') {
    handleLogout()
  }
}
</script>

<template>
  <el-container class="app-wrapper">
    <!-- 侧边栏 -->
    <transition name="sidebar-resize">
      <el-aside :width="isCollapse ? '64px' : '220px'" class="sidebar-container">
        <div class="logo-container" :class="{ collapsed: isCollapse }">
          <div class="logo-box">
            <i-ep-element-plus class="logo-icon" />
          </div>
          <span class="logo-text" v-show="!isCollapse">Admin Elite</span>
        </div>

        <el-scrollbar>
          <el-menu :default-active="activeMenu" :collapse="isCollapse" :collapse-transition="false" unique-opened router class="el-menu-vertical">
            <el-menu-item index="/dashboard">
              <el-icon><i-ep-odometer /></el-icon>
              <template #title>仪表盘</template>
            </el-menu-item>

            <el-sub-menu index="/user">
              <template #title>
                <el-icon><i-ep-user /></el-icon>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user/list">用户列表</el-menu-item>
              <el-menu-item index="/user/role">角色权限</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/settings">
              <el-icon><i-ep-setting /></el-icon>
              <template #title>系统设置</template>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
    </transition>

    <!-- 主容器 -->
    <el-container class="main-container">
      <!-- 顶部导航栏 -->
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

      <!-- 内容区 -->
      <el-main class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
}

/* Sidebar Styling - Light Theme */
.sidebar-container {
  background-color: #ffffff;
  border-right: 1px solid var(--el-border-color-light);
  transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  z-index: 1001;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

  .logo-container {
    height: 60px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-bottom: 1px solid var(--el-border-color-lighter);
    background-color: #ffffff;
    transition: all 0.3s;
    overflow: hidden;

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
    }

    .logo-text {
      font-weight: 600;
      font-size: 18px;
      color: var(--el-text-color-primary);
      white-space: nowrap;
      font-family: 'Inter', sans-serif;
    }

    &.collapsed {
      .logo-box {
        margin-right: 0;
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
  }
}

/* Navbar Styling */
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
    transition: color 0.3s;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .breadcrumb {
    font-size: 14px;
    line-height: 50px;

    .no-redirect {
      color: var(--el-text-color-primary);
      cursor: text;
      font-weight: 600;
    }

    a {
      color: var(--el-text-color-regular);
      cursor: pointer;
      font-weight: normal;

      &:hover {
        color: var(--el-color-primary);
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
      padding: 0 8px;
      transition: background 0.3s;
      border-radius: 4px;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }

      .user-name {
        margin: 0 8px;
        font-size: 14px;
        color: var(--el-text-color-regular);
      }
    }
  }
}

/* Main Content Styling */
.main-container {
  min-height: 100vh;
  transition: margin-left 0.28s;
  background-color: var(--app-bg-color);
}

.app-main {
  padding: 20px;
  overflow-x: hidden;
}

/* Transitions */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
