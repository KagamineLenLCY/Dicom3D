<template>
  <AppLayout>
    <div class="history-container">
      <div class="history-header">
        <h1 class="page-title">历史记录</h1>
        <div class="history-filters">
          <select class="select" v-model="typeFilter" style="width: 150px;">
            <option value="">全部类型</option>
            <option value="upload">上传</option>
            <option value="segment">分割</option>
            <option value="view">查看</option>
            <option value="export">导出</option>
          </select>
          <select class="select" v-model="timeFilter" style="width: 150px;">
            <option value="">全部时间</option>
            <option value="today">今天</option>
            <option value="week">最近7天</option>
            <option value="month">最近30天</option>
          </select>
          <button class="btn btn-danger" @click="clearHistory">清空记录</button>
        </div>
      </div>
      
      <TimelineList />
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'
import TimelineList from '../components/history/TimelineList.vue'

const typeFilter = ref('')
const timeFilter = ref('')

const clearHistory = () => {
  if (confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
    console.log('清空历史记录')
  }
}
</script>

<style scoped>
.history-container {
  max-width: 62.5rem;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 2.5rem) clamp(var(--space-lg), 3vw, var(--space-2xl));
  width: 100%;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2xl);
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.page-title {
  font-size: clamp(var(--text-3xl), 5vw, var(--text-5xl));
  font-weight: var(--font-bold);
}

.history-filters {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.select {
  min-width: 9.375rem;
  width: auto;
  padding: 10px 12px;
  background-color: var(--bg-viewer);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-main);
  font-size: var(--text-base);
  cursor: pointer;
  outline: none;
  flex: 1;
}

.select:focus {
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .history-container {
    padding: var(--space-xl) var(--space-lg);
  }
  
  .history-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .history-filters {
    width: 100%;
  }
  
  .select {
    min-width: 7.5rem;
  }
}
</style>
