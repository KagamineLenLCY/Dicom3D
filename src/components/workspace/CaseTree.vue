<template>
  <aside class="sidebar-left">
    <div class="sidebar-header">病例 / 序列树</div>

    <div class="case-tree">
      <div v-for="item in treeData" :key="item.id">
        <div
          class="tree-item"
          :class="{ selected: selectedId === item.id }"
          @click="selectItem(item.id, item.type)"
        >
          <component
            :is="item.type === 'folder' ? FolderOpen : Image"
            class="tree-icon"
          />
          <span class="tree-label">{{ item.name }}</span>
        </div>

        <div v-if="item.children" class="tree-children">
          <div
            v-for="child in item.children"
            :key="child.id"
            class="tree-item nested"
            :class="{ selected: selectedId === child.id }"
            @click="selectItem(child.id, child.type)"
          >
            <Image class="tree-icon" />
            <span class="tree-label">{{ child.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { FolderOpen, Image } from 'lucide-vue-next'
import { caseTree } from '../../utils/mockData'

const treeData = caseTree
const selectedId = ref('S001')

const emit = defineEmits(['item-select'])

const selectItem = (id, type) => {
  selectedId.value = id
  emit('item-select', { id, type })
}
</script>

<style scoped>
.sidebar-left {
  flex: 0 0 20%;
  min-width: 15rem;
  max-width: 20rem;
  background-color: var(--bg-panel);
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
}

.sidebar-header {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  position: sticky;
  top: 0;
  background-color: var(--bg-panel);
  z-index: 10;
  color: var(--text-main);
}

.case-tree {
  padding: var(--space-xs);
}

.tree-item {
  padding: var(--space-sm) var(--space-md);
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-size: var(--text-md);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-bottom: 2px;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-main);
}

.tree-item:hover {
  background-color: var(--bg-hover);
}

.tree-item.selected {
  background-color: var(--bg-active);
  color: var(--primary-color);
}

.tree-item.nested {
  padding-left: 2rem;
}

.tree-children {
  margin-left: var(--space-lg);
}

.tree-icon {
  width: 15px;
  height: 15px;
  stroke-width: 1.8;
  flex-shrink: 0;
}

.tree-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1024px) {
  .sidebar-left {
    flex: 0 0 18rem;
    min-width: 14rem;
  }
}

@media (max-width: 768px) {
  .sidebar-left {
    flex: 0 0 14rem;
    min-width: 12rem;
  }
}
</style>