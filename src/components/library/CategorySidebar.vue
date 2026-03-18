<template>
  <aside class="category-sidebar">
    <h3 class="sidebar-title">分类</h3>
    <div 
      v-for="category in categories" 
      :key="category.id"
      class="category-item"
      :class="{ active: selectedCategory === category.id }"
      @click="selectCategory(category.id)"
    >
      <span>{{ category.name }}</span>
      <span class="category-count">{{ category.count }}</span>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { categories } from '../../utils/mockData'

const emit = defineEmits(['category-select'])

const selectedCategory = ref('all')

const selectCategory = (id) => {
  selectedCategory.value = id
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
}

.category-item:hover {
  background-color: var(--bg-hover);
}

.category-item.active {
  background-color: var(--bg-active);
  color: var(--primary-color);
}

.category-count {
  font-size: var(--text-sm);
  color: var(--text-sub);
}

@media (max-width: 768px) {
  .category-sidebar {
    flex: 0 0 10rem;
    min-width: 8rem;
  }
}
</style>
