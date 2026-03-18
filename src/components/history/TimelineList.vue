<template>
  <div class="timeline">
    <div v-for="(item, index) in historyData" :key="index" class="timeline-item">
      <div 
        class="timeline-icon" 
        :style="{ backgroundColor: getIconBgColor(item.type) }"
      >
        <i :class="getIconClass(item.type)"></i>
      </div>
      <div class="timeline-content">
        <div class="timeline-time">{{ item.time }}</div>
        <div class="timeline-title">{{ item.title }}</div>
        <div class="timeline-desc">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { historyData } from '../../utils/mockData'

const getIconClass = (type) => {
  const map = {
    view: 'icon-eye',
    upload: 'icon-upload',
    segment: 'icon-scissors',
    export: 'icon-download'
  }
  return map[type] || 'icon-default'
}

const getIconBgColor = (type) => {
  const map = {
    view: 'var(--bg-active)',
    upload: 'rgba(16, 185, 129, 0.1)',
    segment: 'rgba(245, 158, 11, 0.1)',
    export: 'var(--bg-active)'
  }
  return map[type] || 'var(--bg-hover)'
}
</script>

<style scoped>
.timeline {
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: clamp(var(--space-lg), 3vw, var(--space-2xl));
}

.timeline-item {
  display: flex;
  gap: var(--space-lg);
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--border-color);
}

.timeline-item:last-child {
  border-bottom: none;
}

.timeline-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
  min-width: 0;
}

.timeline-time {
  font-size: var(--text-sm);
  color: var(--text-sub);
  margin-bottom: 4px;
}

.timeline-title {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  margin-bottom: 4px;
}

.timeline-desc {
  font-size: var(--text-sm);
  color: var(--text-sub);
  line-height: 1.5;
}

.icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
}

.icon-eye::before { content: "👁️"; }
.icon-upload::before { content: "⬆️"; }
.icon-scissors::before { content: "✂️"; }
.icon-download::before { content: "⬇️"; }
.icon-default::before { content: "📋"; }

@media (max-width: 768px) {
  .timeline-item {
    gap: var(--space-md);
  }
  
  .timeline-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .timeline-content {
    font-size: var(--text-sm);
  }
}
</style>
