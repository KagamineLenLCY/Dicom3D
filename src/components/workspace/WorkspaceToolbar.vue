<template>
  <div class="toolbar">
    <button v-for="tool in tools" :key="tool.key" class="tool-btn" @click="handleToolClick(tool.key)">
      <i :class="tool.icon"></i>
      {{ tool.label }}
    </button>
  </div>
</template>

<script setup>
const tools = [
  { key: 'upload', label: 'Upload', icon: 'icon-upload' },
  { key: 'zoom', label: 'Zoom', icon: 'icon-zoom' },
  { key: 'pan', label: 'Pan', icon: 'icon-pan' },
  { key: 'segment', label: 'Segment', icon: 'icon-scissors' },
  { key: 'reset', label: 'Reset', icon: 'icon-reset' }
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
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-main);
  cursor: pointer;
  font-size: var(--text-md);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  transition: all 0.2s;
  white-space: nowrap;
}

.tool-btn:hover {
  border-color: var(--primary-color);
  background-color: var(--bg-active);
}

.icon {
  display: inline-block;
  width: 1rem;
  height: 1rem;
}

.icon-upload::before { content: "⬆️"; }
.icon-zoom::before { content: "🔍"; }
.icon-pan::before { content: "✋"; }
.icon-scissors::before { content: "✂️"; }
.icon-reset::before { content: "🔄"; }

@media (max-width: 768px) {
  .toolbar {
    padding: var(--space-sm) var(--space-lg);
    gap: var(--space-xs);
  }
  
  .tool-btn {
    padding: 6px 12px;
    font-size: var(--text-sm);
  }
}
</style>
