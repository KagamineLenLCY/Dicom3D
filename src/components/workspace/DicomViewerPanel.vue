<template>
  <div class="viewer-container">
    <div class="viewer-header">DICOM Viewer - {{ seriesName }}</div>
    <div class="viewer-content">
      <div class="viewer-placeholder">[DICOM 影像显示区域]</div>
      <div class="viewer-info">
        Slice: {{ currentSlice }}/{{ totalSlices }}<br>
        Zoom: {{ zoom }}%<br>
        WW: {{ windowWidth }}<br>
        WL: {{ windowLevel }}
      </div>
    </div>
    <div class="viewer-controls">
      <span style="font-size: 12px;">Slice: {{ currentSlice }}/{{ totalSlices }}</span>
      <div class="slider">
        <div 
          class="slider-thumb" 
          :style="{ left: `${(currentSlice / totalSlices) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const seriesName = ref('Series 1 Axial CT')
const currentSlice = ref(64)
const totalSlices = ref(128)
const zoom = ref(100)
const windowWidth = ref(400)
const windowLevel = ref(40)
</script>

<style scoped>
.viewer-container {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-main);
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

.viewer-info {
  position: absolute;
  top: var(--space-lg);
  left: var(--space-lg);
  font-size: var(--text-xs);
  color: var(--text-sub);
  line-height: 1.6;
  background-color: rgba(0, 0, 0, 0.5);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
}

.viewer-controls {
  min-height: 3.5rem;
  background-color: var(--bg-panel);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-lg);
  gap: var(--space-lg);
}

.slider {
  flex: 1;
  height: 4px;
  background-color: var(--border-color);
  border-radius: 2px;
  position: relative;
}

.slider-thumb {
  width: 12px;
  height: 12px;
  background-color: var(--primary-color);
  border-radius: 50%;
  position: absolute;
  top: -4px;
  cursor: pointer;
}
</style>
