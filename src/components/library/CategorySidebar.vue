<template>
  <aside class="category-sidebar">
    <h3 class="sidebar-title">分类</h3>
    <div
      v-for="folder in folderList"
      :key="folder.id"
      class="category-item"
      :class="{ active: selectedFolder === folder.id }"
      @click="selectFolder(folder.id)"
    >
      <span class="category-name">{{ folder.name }}</span>
      <span class="category-count">{{ folder.count }}</span>
    </div>
  </aside>
</template>

<script setup>
import { computed, ref } from 'vue'
import { folders, libraryData } from '../../utils/mockData'

const emit = defineEmits(['category-select'])
const selectedFolder = ref('all')

const folderList = computed(() => {
  return folders.map(folder => {
    let count = 0

    if (folder.id === 'all') {
      count = libraryData.length
    } else if (folder.id === 'uncategorized') {
      count = libraryData.filter(item => !item.tags || item.tags.length === 0 || item.tags.includes('uncategorized')).length
    } else {
      count = libraryData.filter(item => item.tags?.includes(folder.id)).length
    }

    return {
      ...folder,
      count
    }
  })
})

const selectFolder = (id) => {
  selectedFolder.value = id
  emit('category-select', id)
}
</script>

<style scoped>
.category-sidebar {
  flex: 0 0 12.5rem;
  min-width: 10rem;
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
}

.sidebar-title {
  color: var(--text-main);
  font-size: var(--text-md);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-md);
}

.category-item {
  padding: 10px 12px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-size: var(--text-base);
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  white-space: nowrap;
  gap: var(--space-sm);
}

.category-item:hover {
  background-color: var(--bg-hover);
}

.category-item.active {
  background-color: var(--bg-active);
  color: var(--primary-color);
}

.category-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-count {
  font-size: var(--text-sm);
  color: var(--text-sub);
  flex-shrink: 0;
}

.category-item.active .category-count {
  color: inherit;
}

@media (max-width: 768px) {
  .category-sidebar {
    flex: 0 0 10rem;
    min-width: 8rem;
  }
}
</style>