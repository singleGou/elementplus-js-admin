<script setup>
import { getUserList } from '@/api/user'

const getData = async () => {
  try {
    const res = await getUserList()
    console.log(res)
  } catch {}
}

// getData()
</script>

<template>
  <h1>dashbaord</h1>
</template>
