<script setup lang="ts">
import { onMounted, ref } from 'vue'
import jsonp from './lib'

const data = ref<string>('')

onMounted(async () => {
  try {
    interface Response {
      userId: number
      id: number
      title: string
      completed: boolean
    }
    const res = await jsonp<Response>('https://jsonplaceholder.typicode.com/todos/1', {
      params: {
        test: 'a'
      }
    })
    data.value = JSON.stringify(res)
  } catch (error) {
    data.value = error as string
  }
})
</script>

<template>
  <main>{{ data }}</main>
</template>
