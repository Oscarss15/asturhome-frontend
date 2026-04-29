<template>
  <div class="app-shell">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-brand" :class="{ open: sidebarOpen }">
        <LogoAsturhome class="brand-logo" />
      </div>

      <nav class="sidebar-nav">
        <RouterLink to="/dashboard" class="nav-item" active-class="active">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          {{ $t('nav.dashboard') }}
        </RouterLink>
        <RouterLink to="/propiedades" class="nav-item" active-class="active">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          {{ $t('nav.propiedades') }}
        </RouterLink>
        <RouterLink to="/estadisticas" class="nav-item" active-class="active">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          {{ $t('nav.estadisticas') }}
        </RouterLink>
        <RouterLink to="/mensajes" class="nav-item" active-class="active">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          {{ $t('nav.mensajes') }}
        </RouterLink>
      </nav>

      <div class="sidebar-bottom">
        <RouterLink to="/configuracion" class="nav-item" active-class="active">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {{ $t('nav.configuracion') }}
        </RouterLink>
        <a class="nav-item" href="#" @click.prevent="logout">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          {{ $t('nav.logout') }}
        </a>
      </div>
    </aside>

    <!-- Overlay móvil -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>

    <!-- Main wrapper -->
    <div class="main-wrapper">
      <!-- Top bar -->
      <header class="topbar">
        <button class="hamburger" @click="sidebarOpen = !sidebarOpen">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div class="search-slot">
          <div v-if="route.path !== '/configuracion'" class="search-bar" :class="{ 'search-disabled': route.path === '/estadisticas' || route.path === '/dashboard' }">
            <svg class="search-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input ref="searchInput" type="text" v-model="searchTerm" :placeholder="searchPlaceholder" />
          </div>
          <p v-if="route.path === '/dashboard'" class="topbar-welcome">{{ fraseHoy }}</p>
        </div>
        <div class="topbar-right">
          <button class="bell-btn">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <span class="bell-dot"></span>
          </button>
          <div class="user-info">
            <div class="user-text">
              <span class="user-name">{{ userName }}</span>
              <span class="user-role">{{ isAdmin ? 'ADMIN' : $t('topbar.role') }}</span>
            </div>
            <div class="user-avatar">
              <img v-if="avatarPreview" :src="avatarPreview" class="avatar-img" />
              <span v-else>{{ userInitials }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSearch } from '@/composables/useSearch.js'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts.js'
import { bus } from '@/composables/eventBus.js'
import { useSound } from '@/composables/useSound.js'
import { getFraseHoy } from '@/composables/useFraseDiaria.js'

import LogoAsturhome from '../components/LogoAsturhome.vue'

const router = useRouter()
useKeyboardShortcuts()
const route = useRoute()
const { searchTerm } = useSearch()
const searchInput = ref(null)
const { playSound } = useSound()

router.afterEach(() => playSound())

const placeholders = {
  '/propiedades': 'Buscar propiedades por nombre, ubicación o ID...',
  '/dashboard': 'Buscar en el dashboard...',
  '/estadisticas': 'Buscar estadísticas...',
  '/mensajes': 'Buscar mensajes por nombre, email o propiedad...',
}

const searchPlaceholder = computed(() => placeholders[route.path] || 'Buscar...')

watch(() => route.path, () => { searchTerm.value = ''; sidebarOpen.value = false })

const sidebarOpen = ref(false)

const isAdmin       = ref(localStorage.getItem('role') === 'ADMIN')
const userName      = ref(localStorage.getItem('userName')     || 'Carlos Asturias')
const avatarPreview = ref(localStorage.getItem('avatarPreview') || '')

const fraseVersion = ref(0)
const fraseHoy = computed(() => {
  fraseVersion.value
  return getFraseHoy(userName.value.split(' ')[0])
})

const userInitials = computed(() => {
  const parts = userName.value.trim().split(' ')
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0]
})

function syncPerfil() {
  userName.value      = localStorage.getItem('userName')      || 'Carlos Asturias'
  avatarPreview.value = localStorage.getItem('avatarPreview') || ''
}

function syncFrase() { fraseVersion.value++ }

onMounted(() => {
  window.addEventListener('perfil-actualizado', syncPerfil)
  window.addEventListener('frase-actualizada', syncFrase)
  bus.on('shortcut:buscar', () => searchInput.value?.focus())
  const savedTema = localStorage.getItem('tema') || 'claro'
  if (savedTema === 'oscuro') document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')

  const savedColor = localStorage.getItem('colorAcento') || '#419383'
  document.documentElement.style.setProperty('--color-primary', savedColor)
  const savedFuente = localStorage.getItem('fuente') || 'medium'
  document.documentElement.classList.remove('font-small', 'font-large')
  if (savedFuente === 'small') document.documentElement.classList.add('font-small')
  if (savedFuente === 'large') document.documentElement.classList.add('font-large')

  const savedTipo = localStorage.getItem('tipografia') || 'inter'
  document.documentElement.classList.remove('tipografia-playfair', 'tipografia-merriweather')
  if (savedTipo === 'playfair')     document.documentElement.classList.add('tipografia-playfair')
  if (savedTipo === 'merriweather') document.documentElement.classList.add('tipografia-merriweather')
})
onUnmounted(() => {
  window.removeEventListener('perfil-actualizado', syncPerfil)
  window.removeEventListener('frase-actualizada', syncFrase)
  bus.off('shortcut:buscar')
})

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('userName')
  router.push('/login')
}
</script>

<style scoped>
.app-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f5f7fa;
}

/* ── Sidebar ─────────────────────────────────────── */
.sidebar {
  width: 220px;
  min-width: 220px;
  background: #ffffff;
  border-right: 1px solid #eaecf0;
  display: flex;
  flex-direction: column;
  padding: 28px 0 24px;
  overflow-y: auto;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px 32px;
}

.brand-logo {
  width: 100%;
  max-width: 160px;
}

.brand-icon {
  width: 38px;
  height: 38px;
  background: var(--color-primary);
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.5px;
}

.brand-sub {
  color: #9ca3af;
  font-size: 10px;
  line-height: 1.4;
  margin-top: 2px;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 12px;
}

.sidebar-bottom {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px 12px 0;
  border-top: 1px solid #eaecf0;
  margin-top: 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #374151;
}

.nav-item.active {
  background: color-mix(in srgb, var(--color-primary) 15%, white);
  color: var(--color-primary);
  font-weight: 600;
}

.nav-item svg {
  flex-shrink: 0;
}

/* ── Main wrapper ─────────────────────────────────── */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ── Topbar ─────────────────────────────────────── */
.topbar {
  background: #ffffff;
  border-bottom: 1px solid #eaecf0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  gap: 16px;
}

.search-bar {
  flex: 1;
  max-width: 520px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: #9ca3af;
  pointer-events: none;
}

.search-bar input {
  width: 100%;
  padding: 10px 16px 10px 42px;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  background: #f9fafb;
  color: #374151;
  font-size: 14px;
  outline: none;
}

.search-bar input::placeholder {
  color: #9ca3af;
}

.search-bar input:focus {
  border-color: var(--color-primary);
  background: #fff;
}
.search-disabled { opacity: 0; pointer-events: none; }

.search-slot {
  flex: 1;
  max-width: 520px;
  position: relative;
}

.search-slot .search-bar {
  max-width: none;
}

.topbar-welcome {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 13px;
  font-weight: 500;
  color: #9ca3af;
  font-style: italic;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bell-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.bell-btn:hover {
  background: #f3f4f6;
}

.bell-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid #fff;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
}

.user-role {
  font-size: 11px;
  color: #9ca3af;
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }

.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}

/* ── Content ─────────────────────────────────────── */
.content {
  flex: 1;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
}

/* ── Hamburger ───────────────────────────────────── */
.hamburger {
  display: none;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  flex-shrink: 0;
}
.hamburger:hover { background: #f3f4f6; }

/* ── Overlay ─────────────────────────────────────── */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 40;
}

/* ── Tablet (≤ 1024px) ───────────────────────────── */
@media (max-width: 1024px) {
  .hamburger { display: flex; }
  .sidebar-overlay { display: block; }

  .sidebar {
    position: fixed;
    left: -240px;
    top: 0;
    bottom: 0;
    z-index: 50;
    transition: left 0.25s ease;
    box-shadow: 4px 0 16px rgba(0,0,0,0.1);
  }

  .sidebar.open { left: 0; }

  .user-text { display: none; }

  .content {
    padding: 20px;
    gap: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    height: auto;
  }
}

/* ── Móvil (≤ 640px) ─────────────────────────────── */
@media (max-width: 640px) {
  .topbar {
    padding: 12px 16px;
    gap: 10px;
  }

  .search-bar { max-width: none; }

  .bell-btn { display: none; }

  .content {
    padding: 16px;
    gap: 12px;
    overflow: visible;
    height: auto;
    flex: none;
  }

  .main-wrapper { overflow-y: auto; height: 100vh; }
}

</style>

<style>
html.dark .app-shell    { background: #111827; }
html.dark .sidebar      { background: #1e2333; border-right-color: #2d3348; }
html.dark .sidebar-bottom { border-top-color: #2d3348; }
html.dark .nav-item     { color: #94a3b8; }
html.dark .nav-item:hover  { background: #2d3348; color: #e2e8f0; }
html.dark .nav-item.active { background: color-mix(in srgb, var(--color-primary) 20%, transparent); color: var(--color-primary); }
html.dark .topbar       { background: #1e2333; border-bottom-color: #2d3348; }
html.dark .search-bar input { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .search-bar input::placeholder { color: #64748b; }
html.dark .search-bar input:focus { background: #374151; border-color: var(--color-primary); }
html.dark .user-name    { color: #e2e8f0; }
html.dark .user-role    { color: #64748b; }
html.dark .bell-btn     { color: #94a3b8; }
html.dark .bell-btn:hover { background: #2d3348; }
html.dark .hamburger    { color: #94a3b8; }
html.dark .hamburger:hover { background: #2d3348; }
html.dark .main-wrapper { background: #111827; }
html.dark .content      { background: #111827; }
html.dark .bell-dot     { border-color: #1e2333; }

html.font-small .nav-item   { font-size: 13px; }
html.font-small .user-name  { font-size: 13px; }
html.font-small .user-role  { font-size: 10px; }

html.font-large .nav-item   { font-size: 15px; }
html.font-large .user-name  { font-size: 15px; }
html.font-large .user-role  { font-size: 12px; }
</style>
