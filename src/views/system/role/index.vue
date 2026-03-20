<script setup>
import { defineOptions, ref } from 'vue'

defineOptions({
  name: 'Role',
})

const count = ref(0)
const addCount = () => {
  count.value++
}
</script>

<template>
  <div>
    <h1>角色管理</h1>
    <el-button @click="addCount">{{ count }}</el-button>
  </div>
</template>
