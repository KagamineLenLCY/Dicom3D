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
        <i :class="themeIcon" class="icon"></i>
      </div>
      <div class="user-avatar" @click.stop="toggleDropdown"></div>
      
      <div class="user-dropdown" :class="{ show: dropdownOpen }">
        <div class="dropdown-item" @click="goToSettings">
          <i class="icon icon-settings"></i>
          <span>个人设置</span>
        </div>
        <div class="dropdown-item" @click="goToHistory">
          <i class="icon icon-clock"></i>
          <span>历史记录</span>
        </div>
        <div class="dropdown-item danger" @click="logout">
          <i class="icon icon-logout"></i>
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dropdownOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '工作台', path: '/workspace' },
  { name: '工作库', path: '/library' }
]

const theme = computed(() => {
  return document.documentElement.getAttribute('data-theme') || 'dark'
})

const themeIcon = computed(() => {
  return theme.value === 'dark' ? 'icon-sun' : 'icon-moon'
})

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', newTheme)
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

// 点击外部关闭下拉菜单
document.addEventListener('click', closeDropdown)
</script>

<style scoped>
.navbar {
  min-height: 4rem;
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
  width: 2rem;
  height: 2rem;
  background: var(--primary-color);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-bold);
  color: white;
  font-size: 1rem;
}

.system-name {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  white-space: nowrap;
}

.navbar-center {
  display: flex;
  gap: var(--space-xs);
  flex-shrink: 0;
}

.nav-item {
  padding: var(--space-sm) var(--space-lg);
  color: var(--text-sub);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  font-size: var(--text-md);
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
  width: 2.25rem;
  height: 2.25rem;
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
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--gradient-primary);
  cursor: pointer;
  position: relative;
}

.user-dropdown {
  position: absolute;
  top: 3.25rem;
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
  display: inline-block;
  width: 1.125rem;
  height: 1.125rem;
}

.icon-sun::before {
  content: "☀️";
}

.icon-moon::before {
  content: "🌙";
}

.icon-settings::before {
  content: "⚙️";
}

.icon-clock::before {
  content: "⏰";
}

.icon-logout::before {
  content: "🚪";
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
