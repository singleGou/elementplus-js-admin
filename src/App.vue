<script setup>
import { useCounterStore } from '@/store'
const counterStore = useCounterStore()
</script>

<template>
  <el-button>click me</el-button>

  <!-- 图标组件 -->
  <i-ep-search />
  <!-- 图标按钮 -->
  <el-button type="primary" @click="counterStore.increment"><i-ep-CirclePlus class="el-icon--left" />爸爸点我</el-button>
  <HelloWorld />
</template>
