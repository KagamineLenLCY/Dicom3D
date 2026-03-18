<template>
  <div class="statusbar">
    <span>状态: {{ status }}</span>
    <span>病例ID: {{ caseId }}</span>
    <span>当前切片: {{ currentSlice }}/{{ totalSlices }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const status = ref('就绪')
const caseId = ref('P20240315-001')
const currentSlice = ref(64)
const totalSlices = ref(128)
</script>

<style scoped>
.statusbar {
  min-height: 2rem;
  background-color: var(--bg-panel);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 0 var(--space-2xl);
  font-size: var(--text-xs);
  color: var(--text-sub);
  gap: var(--space-2xl);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .statusbar {
    padding: var(--space-sm) var(--space-lg);
    gap: var(--space-lg);
  }
}
</style>
