<template>
  <aside class="library-sidebar">
    <div class="library-topbar">
      <button class="icon-btn" @click="$emit('close')" title="返回">
        <ArrowLeft class="icon" />
      </button>

      <div class="search-box">
        <Search class="search-icon" />
        <input
          v-model="search"
          type="text"
          class="search-input"
          placeholder="搜索病例ID / 名称"
        />
      </div>

      <button class="icon-btn" @click="toggleFilter" title="筛选">
        <SlidersHorizontal class="icon" />
      </button>
    </div>

    <div v-if="showFilter" class="filter-panel">
      <select v-model="filters.organ" class="filter-select">
        <option value="">全部器官</option>
        <option value="lung">肺部</option>
        <option value="kidney">肾脏</option>
        <option value="bone">骨骼</option>
        <option value="liver">肝脏</option>
        <option value="heart">心脏</option>
        <option value="brain">脑部</option>
      </select>

      <select v-model="filters.status" class="filter-select">
        <option value="">全部状态</option>
        <option value="completed">已完成</option>
        <option value="processing">处理中</option>
        <option value="pending">待处理</option>
      </select>

      <select v-model="filters.time" class="filter-select">
        <option value="">全部时间</option>
        <option value="today">今天</option>
        <option value="week">最近7天</option>
        <option value="month">最近30天</option>
      </select>
    </div>

    <div class="sidebar-body">
      <div class="folder-list">
        <div
          v-for="folder in folderList"
          :key="folder.id"
          class="folder-item"
          :class="{ active: activeFolderId === folder.id }"
          @click="selectFolder(folder.id)"
        >
          <FolderOpen class="folder-icon" />
          <span class="folder-name">{{ folder.name }}</span>
          <span class="folder-count">{{ folder.count }}</span>
        </div>
      </div>

      <div class="case-list">
        <div class="case-list-title">病例</div>

        <div v-if="filteredCases.length === 0" class="empty-state">
          暂无匹配病例
        </div>

        <div
          v-for="item in filteredCases"
          :key="item.id"
          class="case-item"
          @click="selectCase(item)"
        >
          <FileText class="case-icon" />
          <div class="case-meta">
            <div class="case-id">{{ item.id }}</div>
            <div class="case-desc">{{ item.name }} · {{ item.organ }}</div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ArrowLeft, Search, SlidersHorizontal, FolderOpen, FileText } from 'lucide-vue-next'
import { folders, libraryData } from '../../utils/mockData'

const emit = defineEmits(['close', 'item-select'])

const activeFolderId = ref('all')
const search = ref('')
const showFilter = ref(false)

const filters = ref({
  organ: '',
  status: '',
  time: ''
})

const organMap = {
  bone: '骨骼',
  lung: '肺部',
  kidney: '肾脏',
  liver: '肝脏',
  heart: '心脏',
  brain: '脑部'
}

const folderList = computed(() => {
  return folders.map(folder => {
    let count = 0

    if (folder.id === 'all') {
      count = libraryData.length
    } else if (folder.id === 'uncategorized') {
      count = libraryData.filter(
        item => !item.tags || item.tags.length === 0 || item.tags.includes('uncategorized')
      ).length
    } else {
      count = libraryData.filter(item => item.tags?.includes(folder.id)).length
    }

    return {
      ...folder,
      count
    }
  })
})

const filteredCases = computed(() => {
  let data = [...libraryData]

  // 文件夹过滤
  if (activeFolderId.value !== 'all') {
    if (activeFolderId.value === 'uncategorized') {
      data = data.filter(
        item => !item.tags || item.tags.length === 0 || item.tags.includes('uncategorized')
      )
    } else {
      data = data.filter(item => item.tags?.includes(activeFolderId.value))
    }
  }

  // 状态过滤
  if (filters.value.status) {
    data = data.filter(item => item.status === filters.value.status)
  }

  // 器官过滤
  if (filters.value.organ) {
    data = data.filter(item => item.organ === organMap[filters.value.organ])
  }

  // 时间过滤（这里先只保留结构，后面可补真实时间逻辑）
  if (filters.value.time) {
    // TODO: 后续接真实日期比较逻辑
  }

  // 搜索过滤
  if (search.value.trim()) {
    const keyword = search.value.trim().toLowerCase()
    data = data.filter(
      item =>
        item.id.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.organ.toLowerCase().includes(keyword)
    )
  }

  return data
})

const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

const selectFolder = (id) => {
  activeFolderId.value = id
}

const selectCase = (item) => {
  emit('item-select', item)
}
</script>

<style scoped>
.library-sidebar {
  flex: 0 0 20%;
  min-width: 16rem;
  max-width: 22rem;
  background-color: var(--bg-panel);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.library-topbar {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-panel);
  flex-shrink: 0;
}

.icon-btn {
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--border-color);
  background-color: transparent;
  color: var(--text-main);
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.icon-btn:hover {
  border-color: var(--primary-color);
  background-color: var(--bg-active);
}

.icon {
  width: 16px;
  height: 16px;
  stroke-width: 1.8;
}

.search-box {
  flex: 1;
  min-width: 0;
  height: 2rem;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background-color: var(--bg-viewer);
}

.search-icon {
  width: 14px;
  height: 14px;
  color: var(--text-sub);
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-main);
  font-size: var(--text-sm);
}

.filter-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-card);
}

.filter-select {
  width: 100%;
  padding: 8px 10px;
  background-color: var(--bg-viewer);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-main);
  font-size: var(--text-sm);
  outline: none;
}

.sidebar-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.folder-list {
  padding: var(--space-sm);
  border-bottom: 1px solid var(--border-color);
}

.folder-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 9px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.folder-item:hover {
  background-color: var(--bg-hover);
}

.folder-item.active {
  background-color: var(--bg-active);
  color: var(--primary-color);
}

.folder-icon {
  width: 15px;
  height: 15px;
  stroke-width: 1.8;
  flex-shrink: 0;
}

.folder-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--text-sm);
}

.folder-count {
  font-size: var(--text-xs);
  color: var(--text-sub);
  flex-shrink: 0;
}

.case-list {
  padding: var(--space-sm);
}

.case-list-title {
  color: var(--text-sub);
  font-size: var(--text-xs);
  margin-bottom: var(--space-sm);
  padding: 0 4px;
}

.case-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.case-item:hover {
  background-color: var(--bg-hover);
}

.case-icon {
  width: 16px;
  height: 16px;
  stroke-width: 1.8;
  color: var(--primary-color);
  flex-shrink: 0;
}

.case-meta {
  min-width: 0;
  flex: 1;
}

.case-id {
  color: var(--text-main);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.case-desc {
  color: var(--text-sub);
  font-size: var(--text-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-state {
  color: var(--text-sub);
  font-size: var(--text-sm);
  padding: var(--space-lg) var(--space-sm);
  text-align: center;
}

@media (max-width: 1024px) {
  .library-sidebar {
    flex: 0 0 18rem;
    min-width: 14rem;
  }
}

@media (max-width: 768px) {
  .library-sidebar {
    flex: 0 0 14rem;
    min-width: 12rem;
  }
}
</style>