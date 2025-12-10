<script setup>
import { ref } from 'vue'
const test = ref('hello')
console.log(test.value)
</script>

<template>
  <router-view></router-view>
</template>
