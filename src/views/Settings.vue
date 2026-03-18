<template>
  <AppLayout>
    <div class="settings-container">
      <h1 class="page-title">个人设置</h1>

      <div class="settings-section">
        <h2 class="section-header">用户信息</h2>
        <div class="form-group">
          <label>用户名</label>
          <input type="text" class="input" value="Dr. Zhang Wei" readonly>
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="email" class="input" value="zhangwei@hospital.com" readonly>
        </div>
        <div class="form-group">
          <label>注册时间</label>
          <input type="text" class="input" value="2023-05-12" readonly>
        </div>
      </div>

      <div class="settings-section">
        <h2 class="section-header">偏好设置</h2>
        <div class="form-group">
          <label>主题模式</label>
          <select class="select" v-model="themeMode">
            <option value="dark">深色模式</option>
            <option value="light">浅色模式</option>
            <option value="system">跟随系统</option>
          </select>
        </div>
        <div class="form-group">
          <label>默认器官类型</label>
          <select class="select" v-model="defaultOrgan">
            <option value="">无</option>
            <option value="bone">骨骼</option>
            <option value="lung">肺</option>
            <option value="kidney">肾</option>
            <option value="liver">肝</option>
            <option value="heart">心脏</option>
          </select>
        </div>
        <div class="form-group-inline">
          <input type="checkbox" class="checkbox" id="autoLoad" v-model="autoLoad" checked>
          <label for="autoLoad">自动加载最近病例</label>
        </div>
        <div class="form-group-inline">
          <input type="checkbox" class="checkbox" id="autoSegment" v-model="autoSegment">
          <label for="autoSegment">上传后自动开始分割</label>
        </div>
      </div>

      <div class="settings-section">
        <h2 class="section-header">安全设置</h2>
        <div class="form-group">
          <label>修改密码</label>
          <input type="password" class="input" placeholder="输入新密码" v-model="newPassword">
        </div>
        <div class="form-group">
          <label>确认密码</label>
          <input type="password" class="input" placeholder="再次输入新密码" v-model="confirmPassword">
        </div>
      </div>

      <div class="settings-actions">
        <button class="btn btn-secondary" @click="cancel">取消</button>
        <button class="btn btn-primary" @click="saveSettings">保存设置</button>
        <button class="btn btn-danger" @click="logout">退出登录</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import AppLayout from '../components/layout/AppLayout.vue'

const themeMode = ref('dark')
const defaultOrgan = ref('')
const autoLoad = ref(true)
const autoSegment = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')

const cancel = () => {
  if (confirm('确定要放弃所有更改吗？')) {
    // 重置表单
    loadSettings()
  }
}

const saveSettings = () => {
  if (newPassword.value && newPassword.value !== confirmPassword.value) {
    alert('两次输入的密码不一致')
    return
  }
  
  console.log('保存设置', {
    themeMode: themeMode.value,
    defaultOrgan: defaultOrgan.value,
    autoLoad: autoLoad.value,
    autoSegment: autoSegment.value,
    password: newPassword.value
  })
  
  alert('设置已保存')
  newPassword.value = ''
  confirmPassword.value = ''
}

const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    console.log('退出登录')
  }
}

const loadSettings = () => {
  // 从localStorage或API加载设置
  const saved = localStorage.getItem('medvision-settings')
  if (saved) {
    const settings = JSON.parse(saved)
    themeMode.value = settings.themeMode || 'dark'
    defaultOrgan.value = settings.defaultOrgan || ''
    autoLoad.value = settings.autoLoad !== false
    autoSegment.value = settings.autoSegment || false
  }
}

// 监听主题变化
watch(themeMode, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme === 'system' ? 'dark' : newTheme)
})

// 页面加载时读取设置
onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.settings-container {
  max-width: 50rem;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 2.5rem) clamp(var(--space-lg), 3vw, var(--space-2xl));
  width: 100%;
}

.page-title {
  font-size: clamp(var(--text-3xl), 5vw, var(--text-5xl));
  font-weight: var(--font-bold);
  margin-bottom: var(--space-3xl);
}

.settings-section {
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: clamp(var(--space-lg), 3vw, var(--space-2xl));
  margin-bottom: var(--space-2xl);
}

.section-header {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: var(--space-xl);
}

.form-group label {
  display: block;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  margin-bottom: var(--space-sm);
}

.form-group-inline {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.form-group-inline label {
  margin: 0;
  cursor: pointer;
}

.settings-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: flex-end;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .settings-container {
    padding: var(--space-xl) var(--space-lg);
  }
  
  .settings-actions {
    flex-direction: column;
  }
  
  .settings-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
