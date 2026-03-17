<script setup>
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
</script>

<template>
  <el-sub-menu v-if="hasSubMenu(props.item)" :index="props.item.path">
    <template #title>
      <!-- <component :is="props.item.icon" /> -->
      <el-icon><SvgIcon :name="props.item.icon" /></el-icon>
      <span>{{ props.item.title }}</span>
    </template>
    <SideBarItem v-for="subItem in props.item.children" :key="subItem.id" :item="subItem" />
  </el-sub-menu>
  <el-menu-item v-if="hasMenu(props.item)" :index="props.item.path">
    <!-- <component :is="props.item.icon" /> -->
    <el-icon><SvgIcon :name="props.item.icon" /></el-icon>
    <span>{{ props.item.title }}</span>
  </el-menu-item>
</template>
