<script setup lang="ts">
import { onMounted, ref } from "vue";
import jsonp from "./lib";

const data = ref<string>("");

onMounted(() => {
  jsonp<{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }>("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => {
      data.value = JSON.stringify(res);
    })
    .catch((err) => {
      data.value = err;
    });
});
</script>

<template>
  <main>{{ data }}</main>
</template>
