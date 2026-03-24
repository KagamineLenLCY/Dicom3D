<template>
  <nav class="navbar">
    <div class="navbar-left">
      <div class="logo">M</div>
      <span class="system-name">MedVision</span>
    </div>
    
    <div class="navbar-center">
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="nav-item"
        active-class="active"
      >
        {{ item.name }}
      </router-link>
    </div>
    
    <div class="navbar-right">
<div class="theme-toggle" @click="toggleTheme">
  <Sun v-if="theme === 'dark'" class="icon" />
  <Moon v-else class="icon" />
</div>
      <div class="user-avatar" @click.stop="toggleDropdown"></div>
      
      <div class="user-dropdown" :class="{ show: dropdownOpen }">
        <div class="dropdown-item" @click="goToSettings">
  <Settings class="icon" />
  <span>个人设置</span>
</div>

<div class="dropdown-item" @click="goToHistory">
  <History class="icon" />
  <span>历史记录</span>
</div>

<div class="dropdown-item danger" @click="logout">
  <LogOut class="icon" />
  <span>退出登录</span>
</div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Sun, Moon, Settings, History, LogOut } from 'lucide-vue-next'

const router = useRouter()
const dropdownOpen = ref(false)
const theme = ref('dark')

const navItems = [
  { name: '首页', path: '/' },
  { name: '工作台', path: '/workspace' },
  { name: '工作库', path: '/library' }
]

const syncTheme = () => {
  theme.value = document.documentElement.getAttribute('data-theme') || 'dark'
}

const toggleTheme = () => {
  const next = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  theme.value = next
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const goToSettings = () => {
  closeDropdown()
  router.push('/settings')
}

const goToHistory = () => {
  closeDropdown()
  router.push('/history')
}

const logout = () => {
  closeDropdown()
  if (confirm('确定要退出登录吗？')) {
    console.log('退出登录')
  }
}

const handleDocumentClick = () => {
  closeDropdown()
}

onMounted(() => {
  syncTheme()
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style scoped>
.navbar {
  min-height: 3.2rem; /* 原来4rem -> 90% */
  background-color: var(--bg-panel);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1rem, 3vw, 2rem);
  position: sticky;
  top: 0;
  z-index: 1000;
  flex-wrap: wrap;
}
.navbar-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.logo {
  width: 1.8rem;   /* 原来2rem */
  height: 1.8rem;
  background: var(--primary-color);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-bold);
  color: white;
  font-size: 0.9rem; /* 原来1rem */
}


.system-name {
  font-size: calc(var(--text-lg) * 0.9);
  font-weight: var(--font-semibold);
  white-space: nowrap;
}
.navbar-center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--space-xs) * 1.9); /* 原来太挤，稍微拉开一点 */
  flex: 1 1 auto;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.navbar-center::-webkit-scrollbar {
  display: none;
}

.nav-item {
  padding: calc(var(--space-sm) * 0.8) calc(var(--space-lg) * 0.9);
  color: var(--text-sub);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  font-size: calc(var(--text-md) * 0.95);
  font-weight: var(--font-medium);
  text-decoration: none;
  white-space: nowrap;
}

.nav-item:hover {
  color: var(--text-main);
  background-color: var(--bg-hover);
}

.nav-item.active {
  color: var(--primary-color);
  background-color: var(--bg-active);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  position: relative;
  flex-shrink: 0;
  margin-left: auto;
}

.theme-toggle {
  width: 2rem;   /* 原来2.25rem */
  height: 2rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-toggle:hover {
  border-color: var(--primary-color);
  background-color: var(--bg-active);
}

.user-avatar {
  width: 2rem;   /* 原来2.25rem */
  height: 2rem;
  border-radius: 50%;
  background: var(--gradient-primary);
  cursor: pointer;
  position: relative;
}

.user-dropdown {
  position: absolute;
  top: 2.9rem; /* 原来3.25rem，跟着缩小 */
  right: 0;
  min-width: 12.5rem;
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-xs);
  display: none;
  box-shadow: var(--shadow-heavy);
  z-index: 1001;
}

.user-dropdown.show {
  display: block;
}

.dropdown-item {
  padding: 10px 12px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-size: var(--text-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-main);
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: var(--bg-hover);
}

.dropdown-item.danger:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--text-danger);
}

/* 图标样式 */

.icon {
  width: 16px;
  height: 16px;
  stroke-width: 1.8;
  flex-shrink: 0;
}
/* 响应式布局 */
@media (max-width: 768px) {
  .navbar {
    padding: var(--space-md) var(--space-lg);
    gap: var(--space-md);
  }
  
  .navbar-center {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: var(--space-sm);
  }
  
  .nav-item {
    padding: var(--space-xs) var(--space-md);
    font-size: var(--text-sm);
  }
  
  .system-name {
    font-size: var(--text-md);
  }
}
</style>
