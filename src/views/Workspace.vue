<template>
  <AppLayout>
    <div class="workbench-container">
      <WorkspaceToolbar @tool-click="handleToolClick" />
      
      <div class="workbench-main">
        <CaseTree @item-select="handleItemSelect" />
        <DicomViewerPanel />
        <ModelViewerPanel />
      </div>
      
      <StatusBar />
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '../components/layout/AppLayout.vue'
import WorkspaceToolbar from '../components/workspace/WorkspaceToolbar.vue'
import CaseTree from '../components/workspace/CaseTree.vue'
import DicomViewerPanel from '../components/workspace/DicomViewerPanel.vue'
import ModelViewerPanel from '../components/workspace/ModelViewerPanel.vue'
import StatusBar from '../components/workspace/StatusBar.vue'

const handleToolClick = (tool) => {
  console.log('Tool clicked:', tool)
}

const handleItemSelect = (item) => {
  console.log('Item selected:', item)
}
</script>

<style scoped>
.workbench-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 4rem);
  height: 100%;
}

.workbench-main {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

@media (max-width: 768px) {
  .workbench-main {
    flex-direction: column;
  }
}
</style>
