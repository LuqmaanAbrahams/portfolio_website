<script setup lang="ts">
defineProps<{ value: string; label: string }>();
</script>

<template>
  <div>
    <p class="font-display text-stat tracking-heading">{{ value }}</p>
    <p class="mt-1 text-meta text-accent-purple-200">{{ label }}</p>
  </div>
</template>
