<script setup></script>

<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="aside">
      <el-menu default-active="dashboard" class="el-menu-vertical-demo" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF" router>
        <div class="logo">Admin System</div>
        <el-menu-item index="/dashboard">
          <el-icon><menu /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <!-- 更多菜单项 -->
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部Header -->
      <el-header class="header">
        <div class="header-content">
          <span>管理员</span>
        </div>
      </el-header>

      <!-- 主要内容区 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}
.aside {
  background-color: #304156;
  color: white;
}
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #1f2d3d;
}
.header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.main {
  background-color: #f0f2f5;
  padding: 20px;
}
.el-menu {
  border-right: none;
}
</style>
