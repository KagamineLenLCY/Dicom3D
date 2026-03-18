<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>病例ID</th>
          <th>器官类型</th>
          <th>状态</th>
          <th>上传时间</th>
          <th>切片数</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.organ }}</td>
          <td>
            <span :class="getStatusClass(item.status)">{{ getStatusText(item.status) }}</span>
          </td>
          <td>{{ item.uploadTime }}</td>
          <td>{{ item.slices }}</td>
          <td>
            <div class="action-buttons">
              <button class="btn btn-sm btn-primary" @click="handleView(item.id)">查看</button>
              <button class="btn btn-sm btn-secondary" @click="handleExport(item.id)">导出</button>
              <button class="btn btn-sm btn-secondary" @click="handleDelete(item.id)">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { libraryData } from '../../utils/mockData'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  },
  category: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['view', 'export', 'delete'])

const filteredData = computed(() => {
  let data = [...libraryData]
  
  // 分类筛选
  if (props.category !== 'all') {
    const organMap = {
      bone: '骨骼',
      lung: '肺',
      kidney: '肾',
      liver: '肝',
      heart: '心脏',
      brain: '脑部',
      other: '其他'
    }
    data = data.filter(item => item.organ === organMap[props.category])
  }
  
  // 状态筛选
  if (props.filters.status) {
    data = data.filter(item => item.status === props.filters.status)
  }
  
  // 器官筛选
  if (props.filters.organ) {
    const organMap = {
      bone: '骨骼',
      lung: '肺',
      kidney: '肾',
      liver: '肝',
      heart: '心脏',
      brain: '脑部'
    }
    data = data.filter(item => item.organ === organMap[props.filters.organ])
  }
  
  // 搜索筛选
  if (props.filters.search) {
    const search = props.filters.search.toLowerCase()
    data = data.filter(item => 
      item.id.toLowerCase().includes(search) ||
      item.organ.toLowerCase().includes(search)
    )
  }
  
  return data
})

const getStatusText = (status) => {
  const map = {
    completed: '已完成',
    processing: '处理中',
    pending: '待处理'
  }
  return map[status] || status
}

const getStatusClass = (status) => {
  return `status-badge status-${status}`
}

const handleView = (id) => {
  emit('view', id)
}

const handleExport = (id) => {
  emit('export', id)
}

const handleDelete = (id) => {
  if (confirm('确定要删除这个病例吗？')) {
    emit('delete', id)
  }
}
</script>

<style scoped>
.table-container {
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow-x: auto;
  overflow-y: hidden;
}

table {
  width: 100%;
  min-width: 40rem;
  border-collapse: collapse;
}

thead {
  background-color: var(--bg-card);
}

th {
  padding: 14px var(--space-lg);
  text-align: left;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-sub);
  border-bottom: 1px solid var(--border-color);
  white-space: nowrap;
}

td {
  padding: 14px var(--space-lg);
  font-size: var(--text-base);
  border-bottom: 1px solid var(--border-color);
  white-space: nowrap;
}

tr:hover {
  background-color: var(--bg-hover);
}

.action-buttons {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: nowrap;
}

@media (max-width: 768px) {
  th, td {
    padding: 12px var(--space-md);
    font-size: var(--text-sm);
  }
}
</style>
