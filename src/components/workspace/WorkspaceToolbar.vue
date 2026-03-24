<template>
  <div class="toolbar">
    <button
      v-for="tool in tools"
      :key="tool.key"
      class="tool-btn"
      @click="handleToolClick(tool.key)"
    >
      <component :is="tool.icon" class="tool-icon" />
      <span>{{ tool.label }}</span>
    </button>
  </div>
</template>

<script setup>
import {
  Upload,
  ZoomIn,
  Move,
  ScanSearch,
  RotateCcw
} from 'lucide-vue-next'

const tools = [
  { key: 'upload', label: 'Upload', icon: Upload },
  { key: 'zoom', label: 'Zoom', icon: ZoomIn },
  { key: 'pan', label: 'Pan', icon: Move },
  { key: 'segment', label: 'Segment', icon: ScanSearch },
  { key: 'reset', label: 'Reset', icon: RotateCcw }
]

const emit = defineEmits(['tool-click'])

const handleToolClick = (key) => {
  emit('tool-click', key)
}
</script>

<style scoped>
.toolbar {
  min-height: 3.5rem;
  background-color: var(--bg-panel);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: var(--space-md) var(--space-2xl);
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.tool-btn {
  padding: 8px 14px;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-main);
  cursor: pointer;
  font-size: var(--text-md);
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  transition: all 0.2s;
  white-space: nowrap;
}

.tool-btn:hover {
  border-color: var(--primary-color);
  background-color: var(--bg-active);
}

.tool-icon {
  width: 16px;
  height: 16px;
  stroke-width: 1.9;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .toolbar {
    padding: var(--space-sm) var(--space-lg);
    gap: var(--space-xs);
  }

  .tool-btn {
    padding: 6px 10px;
    font-size: var(--text-sm);
  }

  .tool-icon {
    width: 15px;
    height: 15px;
  }
}
</style>