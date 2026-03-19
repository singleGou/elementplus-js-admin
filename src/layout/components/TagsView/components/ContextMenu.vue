<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  disableCloseCurrent: {
    type: Boolean,
    default: false,
  },
  disableCloseOthers: {
    type: Boolean,
    default: false,
  },
  disableCloseAll: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['action'])

const menuStyle = computed(() => ({
  left: `${props.x}px`,
  top: `${props.y}px`,
}))

const handleSelect = (index) => {
  emit('action', index)
}
</script>

<template>
  <el-menu v-if="visible" :style="menuStyle" @select="handleSelect" @click.stop class="context-menu">
    <el-menu-item index="refresh">
      <el-icon><i-ep-refresh-right /></el-icon>
      <div>刷新页面</div>
    </el-menu-item>
    <el-menu-item index="closeCurrent" :disabled="disableCloseCurrent">
      <el-icon><i-ep-close /></el-icon>
      <span>关闭当前</span>
    </el-menu-item>
    <el-menu-item index="closeOthers" :disabled="disableCloseOthers">
      <el-icon><i-ep-circle-close /></el-icon>
      <span>关闭其他</span>
    </el-menu-item>
    <el-menu-item index="closeAll" :disabled="disableCloseAll">
      <el-icon><i-ep-brush /></el-icon>
      <span>关闭所有</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  z-index: 3000;
  min-width: 120px;
  padding: 4px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.16);
  background-color: #fff;
  :deep(.el-menu-item) {
    display: flex;
    height: 32px;
    padding: 0 4px !important;
    line-height: 32px;
    border-radius: 6px;
  }
}
</style>
