<script setup>
import { Setting, Tickets, User } from '@element-plus/icons-vue'
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const hasSubMenu = (item) => {
  return !item?.meta?.status && item.menu_type === 1
}
const hasMenu = (item) => {
  return !item?.meta?.status && item.menu_type === 2
}

const getIconComponent = (iconName) => {
  if (!iconName) return null

  const iconMap = {
    'i-ep-setting': Setting,
    'i-ep-user': User,
    'i-ep-tickets': Tickets,
  }
  return iconMap[iconName]
}
</script>

<template>
  <el-sub-menu v-if="hasSubMenu(props.item)" :index="props.item.path">
    <template #title>
      <!-- 在 Vue3 中，component 动态组件的 is 属性必须绑定的是组件实例，使用字符串会导致组件无法渲染 -->
      <el-icon><component :is="getIconComponent(props.item.icon)" /></el-icon>
      <span>{{ props.item.title }}</span>
    </template>
    <SideBarItem v-for="subItem in props.item.children" :key="subItem.id" :item="subItem" />
  </el-sub-menu>
  <el-menu-item v-if="hasMenu(props.item)" :index="props.item.path">
    <el-icon><component :is="getIconComponent(props.item.icon)" /></el-icon>
    <span>{{ props.item.title }}</span>
  </el-menu-item>
</template>
