<template>
  <div class="app-shell">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon">A</div>
        <div class="brand-text">
          <span class="brand-name">ASTUR<br>HOME</span>
          <span class="brand-sub">Gestión Inmobiliaria</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <a class="nav-item" href="#">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Dashboard
        </a>
        <a class="nav-item active" href="#">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          Propiedades
        </a>
        <a class="nav-item" href="#">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          Estadísticas
        </a>
        <a class="nav-item" href="#">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Mensajes
        </a>
      </nav>

      <div class="sidebar-bottom">
        <a class="nav-item" href="#">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Configuración
        </a>
        <a class="nav-item" href="#" @click.prevent="logout">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Log out
        </a>
      </div>
    </aside>

    <!-- Main wrapper -->
    <div class="main-wrapper">
      <!-- Top bar -->
      <header class="topbar">
        <div class="search-bar">
          <svg class="search-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Buscar propiedades por ID, nombre o ubicación..." />
        </div>
        <div class="topbar-right">
          <button class="bell-btn">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <span class="bell-dot"></span>
          </button>
          <div class="user-info">
            <div class="user-text">
              <span class="user-name">{{ userName }}</span>
              <span class="user-role">AGENTE</span>
            </div>
            <div class="user-avatar">{{ userInitials }}</div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="content">
        <!-- Page header -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Propiedades</h1>
            <p class="page-subtitle">Gestiona el inventario de activos inmobiliarios de Asturhome.</p>
          </div>
          <div class="page-actions">
            <button class="btn-outline">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Exportar CSV
            </button>
            <button class="btn-primary">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Nueva Propiedad
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters-card">
          <div class="filters-row">
            <div class="filter-group">
              <label>TIPO</label>
              <div class="select-wrap">
                <select v-model="filters.tipo">
                  <option value="">Todos los tipos</option>
                  <option>Piso</option>
                  <option>Chalet</option>
                  <option>Apartamento</option>
                  <option>Casa</option>
                </select>
                <svg class="select-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            <div class="filter-group">
              <label>CIUDAD</label>
              <div class="select-wrap">
                <select v-model="filters.ciudad">
                  <option value="">Cualquier ubicación</option>
                  <option>Oviedo</option>
                  <option>Gijón</option>
                  <option>Avilés</option>
                </select>
                <svg class="select-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            <div class="filter-group">
              <label>PRECIO MÁX.</label>
              <input class="filter-input" type="text" v-model="filters.precio" placeholder="Ej: 500.000€" />
            </div>
            <div class="filter-group">
              <label>HABITACIONES</label>
              <div class="select-wrap">
                <select v-model="filters.habitaciones">
                  <option value="">Cualquier nro.</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
                <svg class="select-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            <div class="filter-group">
              <label>MODALIDAD</label>
              <div class="select-wrap">
                <select v-model="filters.modalidad">
                  <option value="">Venta / Alquiler</option>
                  <option>Venta</option>
                  <option>Alquiler</option>
                </select>
                <svg class="select-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
          </div>
          <div class="filters-row2">
            <div class="filter-group estado-group">
              <label>ESTADO</label>
              <div class="select-wrap">
                <select v-model="filters.estado">
                  <option value="">Cualquier estado</option>
                  <option>Disponible</option>
                  <option>Reservado</option>
                  <option>Alquilado</option>
                  <option>Vendido</option>
                </select>
                <svg class="select-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            <button class="filter-icon-btn">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M7 8h10M10 12h4"/></svg>
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="table-card">
          <table class="props-table">
            <thead>
              <tr>
                <th>PROPIEDAD</th>
                <th>DETALLES</th>
                <th>UBICACIÓN</th>
                <th>PRECIO</th>
                <th>MODALIDAD</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in properties" :key="prop.id">
                <td class="prop-cell">
                  <img :src="prop.image" :alt="prop.name" class="prop-img" />
                  <div class="prop-info">
                    <span class="prop-name">{{ prop.name }}</span>
                    <span class="prop-id">ID: {{ prop.id }}</span>
                  </div>
                </td>
                <td class="details-cell">
                  <span class="details-type">{{ prop.type }}</span>
                  <span class="details-rooms">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    {{ prop.rooms }} Hab.
                  </span>
                </td>
                <td class="location-cell">{{ prop.location }}</td>
                <td class="price-cell">{{ prop.price }}</td>
                <td>
                  <span :class="['badge-modal', prop.modalidad === 'ALQUILER' ? 'badge-alquiler' : 'badge-venta']">
                    {{ prop.modalidad }}
                  </span>
                </td>
                <td>
                  <span :class="['badge-status', `badge-${prop.statusKey}`]">
                    <span class="status-dot"></span>
                    {{ prop.status }}
                  </span>
                </td>
                <td class="actions-cell">
                  <button class="action-btn" title="Ver">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                  <button class="action-btn" title="Editar">
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <span class="pagination-info">Mostrando 4 de 128 propiedades</span>
            <div class="pagination-pages">
              <button class="page-btn nav-btn">&#8249;</button>
              <button class="page-btn page-active">1</button>
              <button class="page-btn">2</button>
              <button class="page-btn">3</button>
              <span class="page-dots">...</span>
              <button class="page-btn">12</button>
              <button class="page-btn nav-btn">&#8250;</button>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon stat-teal-bg">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <div class="stat-body">
              <span class="stat-label">RATIO DE VENTA</span>
              <span class="stat-value color-teal">84%</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-brown-bg">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div class="stat-body">
              <span class="stat-label">MEDIA RESERVAS</span>
              <span class="stat-value color-orange">12 días</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-gray-bg">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <div class="stat-body">
              <span class="stat-label">NUEVOS LEADS</span>
              <span class="stat-value color-dark">+24 Hoy</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userName = computed(() => localStorage.getItem('userName') || 'Carlos Asturias')
const userInitials = computed(() => {
  const n = userName.value.trim().split(' ')
  return n.length >= 2 ? n[0][0] + n[1][0] : n[0][0]
})

const filters = ref({ tipo: '', ciudad: '', precio: '', habitaciones: '', modalidad: '', estado: '' })

const properties = ref([
  {
    id: 'AST-2934',
    name: 'Ático de Lujo en el Centro',
    image: 'https://picsum.photos/seed/atico/56/56',
    type: 'Piso',
    rooms: 3,
    location: 'Oviedo',
    price: '345.000 €',
    modalidad: 'VENTA',
    status: 'Disponible',
    statusKey: 'disponible',
  },
  {
    id: 'AST-8812',
    name: 'Chalet Independiente Somió',
    image: 'https://picsum.photos/seed/chalet/56/56',
    type: 'Chalet',
    rooms: 5,
    location: 'Gijón',
    price: '780.000 €',
    modalidad: 'VENTA',
    status: 'Reservado',
    statusKey: 'reservado',
  },
  {
    id: 'AST-1044',
    name: 'Estudio Moderno La Arena',
    image: 'https://picsum.photos/seed/estudio/56/56',
    type: 'Apartamento',
    rooms: 1,
    location: 'Gijón',
    price: '850 €/mes',
    modalidad: 'ALQUILER',
    status: 'Alquilado',
    statusKey: 'alquilado',
  },
  {
    id: 'AST-5521',
    name: 'Casa Rural Reformada',
    image: 'https://picsum.photos/seed/casa/56/56',
    type: 'Casa',
    rooms: 4,
    location: 'Avilés',
    price: '195.000 €',
    modalidad: 'VENTA',
    status: 'Vendido',
    statusKey: 'vendido',
  },
])

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('userName')
  router.push('/login')
}
</script>

<style scoped>
/* ── Layout ─────────────────────────────────────── */
.app-shell {
  display: flex;
  min-height: 100vh;
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
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px 32px;
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
  padding: 0 12px;
  border-top: 1px solid #eaecf0;
  padding-top: 16px;
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
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

/* ── Page header ─────────────────────────────────── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.page-title {
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.page-subtitle {
  margin-top: 4px;
  color: #6b7280;
  font-size: 14px;
}

.page-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 18px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-outline:hover {
  background: #f9fafb;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* ── Filters card ─────────────────────────────────── */
.filters-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.filters-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filters-row2 {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 120px;
}

.filter-group label {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.select-wrap {
  position: relative;
}

.select-wrap select {
  width: 100%;
  padding: 9px 32px 9px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  appearance: none;
  cursor: pointer;
  outline: none;
}

.select-wrap select:focus {
  border-color: var(--color-primary);
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.filter-input {
  padding: 9px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  outline: none;
  width: 100%;
}

.filter-input::placeholder {
  color: #9ca3af;
}

.filter-input:focus {
  border-color: var(--color-primary);
}

.estado-group {
  flex: 1;
}

.filter-icon-btn {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: flex-end;
}

/* ── Table card ─────────────────────────────────── */
.table-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  overflow: hidden;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
}

.props-table thead tr {
  border-bottom: 1px solid #f3f4f6;
}

.props-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.props-table tbody tr {
  border-bottom: 1px solid #f9fafb;
  transition: background 0.1s;
}

.props-table tbody tr:last-child {
  border-bottom: none;
}

.props-table tbody tr:hover {
  background: #fafafa;
}

.props-table td {
  padding: 16px 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
}

.prop-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.prop-img {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  background: #e5e7eb;
}

.prop-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.prop-name {
  font-weight: 700;
  color: #111827;
  font-size: 14px;
  line-height: 1.3;
}

.prop-id {
  font-size: 12px;
  color: #9ca3af;
}

.details-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.details-type {
  font-size: 14px;
  color: #374151;
}

.details-rooms {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #9ca3af;
}

.location-cell {
  color: #374151;
}

.price-cell {
  font-weight: 700;
  color: #111827;
}

/* ── Badges ─────────────────────────────────────── */
.badge-modal {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.badge-venta {
  background: #f3f4f6;
  color: #374151;
}

.badge-alquiler {
  background: #fff;
  color: #374151;
  border: 1.5px solid #d1d5db;
}

.badge-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 20px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.badge-disponible {
  background: #f0fdf4;
  color: #16a34a;
}
.badge-disponible .status-dot { background: #22c55e; }

.badge-reservado {
  background: #fff7ed;
  color: #ea580c;
}
.badge-reservado .status-dot { background: #f97316; }

.badge-alquilado {
  background: #eff6ff;
  color: #2563eb;
}
.badge-alquilado .status-dot { background: #3b82f6; }

.badge-vendido {
  background: #f9fafb;
  color: #6b7280;
}
.badge-vendido .status-dot { background: #9ca3af; }

/* ── Actions ─────────────────────────────────────── */
.actions-cell {
  display: flex;
  gap: 6px;
}

.action-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}

.action-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

/* ── Pagination ─────────────────────────────────── */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-top: 1px solid #f3f4f6;
}

.pagination-info {
  font-size: 13px;
  color: #9ca3af;
}

.pagination-pages {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
}

.page-btn:hover {
  background: #f3f4f6;
}

.page-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.page-active:hover {
  background: var(--color-primary);
}

.nav-btn {
  font-size: 18px;
  color: #6b7280;
}

.page-dots {
  padding: 0 4px;
  color: #9ca3af;
  font-size: 14px;
}

/* ── Stats ─────────────────────────────────────── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-teal-bg { background: var(--color-primary); }
.stat-brown-bg { background: #92400e; }
.stat-gray-bg { background: #6b7280; }

.stat-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
}

.color-teal { color: var(--color-primary); }
.color-orange { color: #ea580c; }
.color-dark { color: #111827; }
</style>
