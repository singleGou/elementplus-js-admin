<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/index')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="error-page">
    <el-result icon="error" title="404 Not Found" sub-title="抱歉，您访问的页面不存在">
      <template #icon>
        <div class="error-icon">
          <el-icon class="icon-404">
            <i-ep-warning />
          </el-icon>
        </div>
      </template>
      <template #extra>
        <div class="error-actions">
          <el-button type="primary" @click="goHome" size="large"> 返回首页 </el-button>
          <el-button @click="goBack" size="large"> 返回上一页 </el-button>
        </div>
      </template>
    </el-result>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.error-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.icon-404 {
  font-size: 80px;
  color: #409eff;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 20px;
}

:deep(.el-result__title) {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

:deep(.el-result__subtitle) {
  font-size: 16px;
  color: #606266;
  line-height: 1.5;
}
</style>
