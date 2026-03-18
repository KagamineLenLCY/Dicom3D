<template>
  <div class="stats-bar">
    <div v-for="stat in stats" :key="stat.key" class="stat-card">
      <div class="stat-value">{{ stat.value }}</div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { statsData } from '../../utils/mockData'

const stats = [
  { key: 'total', value: statsData.total, label: '总病例数' },
  { key: 'completed', value: statsData.completed, label: '已完成' },
  { key: 'processing', value: statsData.processing, label: '处理中' },
  { key: 'pending', value: statsData.pending, label: '待处理' }
]
</script>

<style scoped>
.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 8rem), 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.stat-card {
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-lg) var(--space-xl);
  text-align: center;
}

.stat-value {
  font-size: clamp(1.5rem, 3vw, 1.75rem);
  font-weight: var(--font-bold);
  margin-bottom: 4px;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-sub);
}

@media (max-width: 768px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }
}
</style>
