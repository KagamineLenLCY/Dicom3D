<template>
  <div class="timeline">
    <div v-for="(item, index) in historyData" :key="index" class="timeline-item">
      <div class="timeline-icon" :class="getIconBgClass(item.type)">
        <component :is="getIconComponent(item.type)" class="timeline-svg-icon" />
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
import { Eye, Upload, ScanSearch, Download, FileText } from 'lucide-vue-next'
import { historyData } from '../../utils/mockData'

const getIconComponent = (type) => {
  const map = {
    view: Eye,
    upload: Upload,
    segment: ScanSearch,
    export: Download
  }
  return map[type] || FileText
}

const getIconBgClass = (type) => {
  const map = {
    view: 'timeline-icon-view',
    upload: 'timeline-icon-upload',
    segment: 'timeline-icon-segment',
    export: 'timeline-icon-export'
  }
  return map[type] || 'timeline-icon-default'
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

.timeline-icon-view {
  background-color: var(--bg-active);
}

.timeline-icon-upload {
  background-color: rgba(16, 185, 129, 0.1);
}

.timeline-icon-segment {
  background-color: rgba(245, 158, 11, 0.1);
}

.timeline-icon-export {
  background-color: var(--bg-active);
}

.timeline-icon-default {
  background-color: var(--bg-hover);
}

.timeline-svg-icon {
  width: 18px;
  height: 18px;
  stroke-width: 1.8;
  color: var(--primary-color);
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
  color: var(--text-main);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  margin-bottom: 4px;
}

.timeline-desc {
  font-size: var(--text-sm);
  color: var(--text-sub);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .timeline-item {
    gap: var(--space-md);
  }

  .timeline-icon {
    width: 2rem;
    height: 2rem;
  }

  .timeline-svg-icon {
    width: 16px;
    height: 16px;
  }

  .timeline-content {
    font-size: var(--text-sm);
  }
}
</style>