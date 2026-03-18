<template>
  <div class="filter-section">
    <div class="filter-grid">
      <div class="filter-item">
        <label>搜索病例</label>
        <input 
          type="text" 
          class="input" 
          placeholder="输入病例ID或关键词"
          v-model="searchText"
        >
      </div>
      <div class="filter-item">
        <label>器官筛选</label>
        <select class="select" v-model="organFilter">
          <option value="">全部器官</option>
          <option value="bone">骨骼</option>
          <option value="lung">肺</option>
          <option value="kidney">肾</option>
          <option value="liver">肝</option>
          <option value="heart">心脏</option>
          <option value="brain">脑部</option>
        </select>
      </div>
      <div class="filter-item">
        <label>状态筛选</label>
        <select class="select" v-model="statusFilter">
          <option value="">全部状态</option>
          <option value="completed">已完成</option>
          <option value="processing">处理中</option>
          <option value="pending">待处理</option>
        </select>
      </div>
      <div class="filter-item">
        <label>时间筛选</label>
        <select class="select" v-model="timeFilter">
          <option value="">全部时间</option>
          <option value="today">今天</option>
          <option value="week">最近7天</option>
          <option value="month">最近30天</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['filter-change'])

const searchText = ref('')
const organFilter = ref('')
const statusFilter = ref('')
const timeFilter = ref('')

const emitFilterChange = () => {
  emit('filter-change', {
    search: searchText.value,
    organ: organFilter.value,
    status: statusFilter.value,
    time: timeFilter.value
  })
}

watch([searchText, organFilter, statusFilter, timeFilter], emitFilterChange)
</script>

<style scoped>
.filter-section {
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  gap: var(--space-lg);
}

.filter-item label {
  display: block;
  font-size: var(--text-sm);
  color: var(--text-sub);
  margin-bottom: 6px;
}

@media (max-width: 768px) {
  .filter-section {
    padding: var(--space-lg);
  }
  
  .filter-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}
</style>
