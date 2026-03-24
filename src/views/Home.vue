<template>
  <AppLayout>
    <div class="home-container">
      <div class="home-hero">
        <h1 class="home-title">医学影像可视化平台</h1>
        <p class="home-subtitle">专业的DICOM影像查看 · 高精度三维重建 · 智能分割分析</p>

        <div class="home-buttons">
          <button class="btn btn-primary" @click="goToWorkspace">
            <Play class="icon" />
            进入工作台
          </button>

          <button class="btn btn-secondary" @click="goToLibrary">
            <FolderOpen class="icon" />
            打开工作库
          </button>
        </div>
      </div>

      <div class="feature-cards">
        <div class="feature-card">
          <div class="feature-icon">
            <Image class="icon-lg" />
          </div>
          <h3 class="feature-title">影像查看</h3>
          <p class="feature-desc">支持DICOM格式，多序列同步显示，窗宽窗位调节</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <Box class="icon-lg" />
          </div>
          <h3 class="feature-title">3D重建</h3>
          <p class="feature-desc">高精度三维模型重建，实时交互操作，多角度观察</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <ScanSearch class="icon-lg" />
          </div>
          <h3 class="feature-title">分割分析</h3>
          <p class="feature-desc">智能器官分割，体积精确测量，病灶标注定位</p>
        </div>
      </div>

      <div class="recent-cases">
        <h2 class="section-title">
          <History class="icon" />
          最近病例
        </h2>

        <div v-for="item in recentCases" :key="item.id" class="case-item">
          <div class="case-info">
            <div class="case-icon">
              <FileText class="icon" />
            </div>

            <div class="case-details">
              <h4>{{ item.id }} - {{ item.name }}</h4>
              <p>上传于 {{ item.uploadTime }} · {{ item.sliceCount }}切片</p>
            </div>
          </div>

          <span :class="getStatusClass(item.status)">
            {{ getStatusText(item.status) }}
          </span>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import { getCases } from '../api/case'

import {
  Play,
  FolderOpen,
  Image,
  Box,
  ScanSearch,
  History,
  FileText
} from 'lucide-vue-next'

const router = useRouter()
const recentCases = ref([])
const loading = ref(false)
const error = ref('')

const goToWorkspace = () => {
  router.push('/workspace')
}

const goToLibrary = () => {
  router.push('/library')
}

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

const loadRecentCases = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await getCases()
    recentCases.value = res.data.slice(0, 4)
  } catch (err) {
    console.error('加载最近病例失败：', err)
    error.value = '最近病例加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadRecentCases()
})
</script>
<style scoped>
.home-container {
  padding: clamp(1rem, 2.5vw, 2rem) clamp(1rem, 3vw, 7.5rem) clamp(2rem, 4vw, 3.5rem);
  max-width: 90rem;
  margin: 0 auto;
  width: 100%;
}

.home-hero {
  text-align: center;
  margin-bottom: clamp(3rem, 5vw, 5rem);
}

.home-title {
  color: var(--text-main);
  font-size: clamp(2rem, 5vw, var(--text-6xl));
  font-weight: var(--font-bold);
  margin-bottom: var(--space-lg);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.home-subtitle {
  font-size: var(--text-xl);
  color: var(--text-sub);
  margin-bottom: var(--space-2xl);
}

.home-buttons {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  margin-bottom: clamp(3rem, 5vw, 5rem);
  flex-wrap: wrap;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  gap: var(--space-2xl);
  margin-bottom: clamp(3rem, 5vw, 3.75rem);
}

.feature-card {
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  transition: all 0.2s;
}

.feature-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.feature-icon {
  width: clamp(2.5rem, 5vw, 3rem);
  height: clamp(2.5rem, 5vw, 3rem);
  background-color: var(--bg-active);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-lg);
  color: var(--primary-color);
  font-size: 1.5rem;
}

.feature-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-sm);
}

.feature-desc {
  font-size: var(--text-base);
  color: var(--text-sub);
  line-height: 1.5;
}

.recent-cases {
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: clamp(1.5rem, 3vw, 2rem);
}

.section-title {
  color: var(--text-main);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.case-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  gap: var(--space-md);
}

.case-item:last-child {
  border-bottom: none;
}

.case-info {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  min-width: 0;
  flex: 1;
}

.case-icon {
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--bg-active);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  flex-shrink: 0;
}

.case-details {
  min-width: 0;
  flex: 1;
}

.case-details h4 {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.case-details p {
  font-size: var(--text-sm);
  color: var(--text-sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 图标样式 */
.icon {
  width: 18px;
  height: 18px;
  stroke-width: 1.8;
  flex-shrink: 0;
}

.icon-lg {
  width: 24px;
  height: 24px;
  stroke-width: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-container {
    padding: var(--space-xl) var(--space-lg);
  }
  
  .home-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .home-buttons .btn {
    width: 100%;
    max-width: 20rem;
    justify-content: center;
  }
  
  .feature-cards {
    grid-template-columns: 1fr;
  }
  
  .case-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
  
  .case-info {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .home-title {
    font-size: var(--text-3xl);
  }
  
  .home-subtitle {
    font-size: var(--text-base);
  }
  
  .feature-icon {
    width: 2rem;
    height: 2rem;
    font-size: 1.2rem;
  }
}
</style>
