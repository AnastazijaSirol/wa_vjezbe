<template>
    <span :class = "tagMapping[tag]" class = "text-xs px-2 py-1 rounded-md mx-1">{{ tag }}</span>
</template>

<script setup>
    defineProps({
        tag: Object,
    })

    let tagMapping = {
        "hitno": "bg-red-100 font-bold",
        "faks": "bg-blue-100",
        "pomalo": "bg-green-100",
    }
</script>