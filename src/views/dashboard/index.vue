<script setup>
import { getUserList } from '@/api/user'

const getData = async () => {
  const res = await getUserList()
  console.log(res)
}

getData()
</script>

<template>
  <h1>dashbaord</h1>
</template>
