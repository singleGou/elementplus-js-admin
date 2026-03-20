<script setup>
import { defineOptions, ref } from 'vue'

defineOptions({
  name: 'Menu',
})

const count = ref(0)
const addCount = () => {
  count.value++
}
</script>

<template>
  <div>
    <h1>菜单管理</h1>
    <el-button @click="addCount">{{ count }}</el-button>
  </div>
</template>
