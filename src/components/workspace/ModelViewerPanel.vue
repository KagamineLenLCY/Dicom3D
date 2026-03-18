<template>
  <div class="model-viewer">
    <div class="viewer-header">3D Model Viewer</div>
    <div class="viewer-content">
      <div class="viewer-placeholder">[3D 模型渲染区域]</div>
    </div>
    <div class="model-info">
      <h3 class="info-title">模型信息</h3>
      <div class="info-row">
        <span class="info-label">器官类型</span>
        <span class="info-value">{{ modelInfo.organType }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">体积</span>
        <span class="info-value">{{ modelInfo.volume }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">分割状态</span>
        <span class="info-value" :style="{ color: 'var(--success)' }">{{ modelInfo.status }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">三角面数</span>
        <span class="info-value">{{ modelInfo.triangles }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { modelInfo } from '../../utils/mockData'
</script>

<style scoped>
.model-viewer {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.viewer-header {
  min-height: 3rem;
  background-color: var(--bg-panel);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--text-md);
  font-weight: var(--font-medium);
  position: sticky;
  top: 0;
  z-index: 10;
}

.viewer-content {
  flex: 1;
  min-height: 0;
  background-color: var(--bg-viewer);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  aspect-ratio: 1;
}

.viewer-placeholder {
  color: var(--text-sub);
  font-size: var(--text-md);
}

.model-info {
  padding: var(--space-lg);
  background-color: var(--bg-card);
  border-top: 1px solid var(--border-color);
}

.info-title {
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--border-color);
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: var(--text-sm);
  border-bottom: 1px solid var(--border-color);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  color: var(--text-sub);
}

.info-value {
  font-weight: var(--font-medium);
}
</style>
