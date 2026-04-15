<template>
  <AppLayout>
    <div class="workbench-container">
      <WorkspaceToolbar
        :library-active="activeLeftPanel === 'library'"
        @tool-click="handleToolClick"
      />

      <div class="workbench-main">
        <CaseTree
          v-if="activeLeftPanel === 'caseTree'"
          @item-select="handleItemSelect"
        />

        <LibrarySidebar
          v-else
          @close="closeLibrarySidebar"
          @item-select="handleItemSelect"
        />

        <DicomViewerPanel />
        <ModelViewerPanel />
      </div>

      <StatusBar />
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import WorkspaceToolbar from '../components/workspace/WorkspaceToolbar.vue'
import CaseTree from '../components/workspace/CaseTree.vue'
import LibrarySidebar from '../components/workspace/LibrarySidebar.vue'
import DicomViewerPanel from '../components/workspace/DicomViewerPanel.vue'
import ModelViewerPanel from '../components/workspace/ModelViewerPanel.vue'
import StatusBar from '../components/workspace/StatusBar.vue'

const activeLeftPanel = ref('caseTree') // caseTree | library
const currentSeriesId = ref('')
const dicomImages = ref([])
const modelUrl = ref('')

const handleToolClick = async (tool) => {
  switch (tool) {
    case 'library':
      activeLeftPanel.value =
        activeLeftPanel.value === 'library' ? 'caseTree' : 'library'
      break

    case 'zoom':
      console.log('zoom')
      break

    case 'pan':
      console.log('pan')
      break

    case 'reset':
      console.log('reset')
      break

    case 'upload':
      console.log('upload')
      break

    case 'segment':
      console.log('segment')
      break
  }
}

const handleItemSelect = (item) => {
  currentSeriesId.value = item.id
  console.log('Item selected:', item)
}

const closeLibrarySidebar = () => {
  activeLeftPanel.value = 'caseTree'
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
