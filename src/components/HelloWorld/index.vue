<script setup>
import { useCounterStore } from '@/store'
const counterStore = useCounterStore()
</script>

<template>
  <h2>我被点了：{{ counterStore.count }}</h2>
  <h2>加倍：{{ counterStore.double }}</h2>
</template>
