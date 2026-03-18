<template>
  <AppLayout>
    <div class="library-container">
      <LibraryFilters @filter-change="handleFilterChange" />
      
      <div class="library-main">
        <CategorySidebar @category-select="handleCategorySelect" />
        
        <div class="library-content">
          <StatsCards />
          <CaseTable 
            :filters="filters"
            :category="selectedCategory"
            @view="handleView"
            @export="handleExport"
            @delete="handleDelete"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import LibraryFilters from '../components/library/LibraryFilters.vue'
import CategorySidebar from '../components/library/CategorySidebar.vue'
import StatsCards from '../components/library/StatsCards.vue'
import CaseTable from '../components/library/CaseTable.vue'

const filters = ref({
  search: '',
  organ: '',
  status: '',
  time: ''
})

const selectedCategory = ref('all')

const handleFilterChange = (newFilters) => {
  filters.value = newFilters
}

const handleCategorySelect = (category) => {
  selectedCategory.value = category
}

const handleView = (id) => {
  console.log('查看病例:', id)
}

const handleExport = (id) => {
  console.log('导出病例:', id)
}

const handleDelete = (id) => {
  console.log('删除病例:', id)
}
</script>

<style scoped>
.library-container {
  padding: clamp(var(--space-lg), 3vw, var(--space-2xl));
  max-width: 90rem;
  margin: 0 auto;
  width: 100%;
}

.library-main {
  display: flex;
  gap: var(--space-2xl);
  min-height: 0;
}

.library-content {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .library-container {
    padding: var(--space-lg);
  }
  
  .library-main {
    flex-direction: column;
    gap: var(--space-lg);
  }
}
</style>
