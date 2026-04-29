<template>
  <div class="dashboard">

    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('dashboard.title') }}</h1>
        <p class="page-subtitle">{{ $t('dashboard.subtitle') }}</p>
      </div>
      <span class="badge-anio">{{ anioActual }}</span>
    </div>

    <!-- KPIs -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-top">
          <div class="kpi-icon kpi-icon--teal" @mouseenter="showTooltip($event, 'Total de propiedades registradas en el sistema')" @mouseleave="hideTooltip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span :class="['kpi-badge', variacion.propiedades.clase]" :data-tooltip="$t('estadisticas.variacionTooltip')">{{ variacion.propiedades.texto }}</span>
        </div>
        <div class="kpi-label">{{ $t('dashboard.kpi.propiedades') }}</div>
        <div class="kpi-value">{{ kpiPropiedades.toLocaleString() }}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <div class="kpi-icon kpi-icon--orange" @mouseenter="showTooltip($event, 'Mensajes de clientes pendientes de respuesta')" @mouseleave="hideTooltip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <span :class="['kpi-badge', variacion.mensajes.clase]" :data-tooltip="$t('estadisticas.variacionTooltip')">{{ variacion.mensajes.texto }}</span>
        </div>
        <div class="kpi-label">{{ $t('dashboard.kpi.mensajes') }}</div>
        <div class="kpi-value">{{ kpiMensajes }}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <div class="kpi-icon kpi-icon--purple" @mouseenter="showTooltip($event, 'Propiedades vendidas o alquiladas este mes')" @mouseleave="hideTooltip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          </div>
          <span :class="['kpi-badge', variacion.ventas.clase]" :data-tooltip="$t('estadisticas.variacionTooltip')">{{ variacion.ventas.texto }}</span>
        </div>
        <div class="kpi-label">{{ $t('dashboard.kpi.ventas') }}</div>
        <div class="kpi-value">{{ kpiVentas }}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <div class="kpi-icon kpi-icon--green" @mouseenter="showTooltip($event, 'Ingresos estimados por comisiones del 3% sobre ventas cerradas')" @mouseleave="hideTooltip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          </div>
          <span :class="['kpi-badge', variacion.ingresos.clase]" :data-tooltip="$t('estadisticas.variacionTooltip')">{{ variacion.ingresos.texto }}</span>
        </div>
        <div class="kpi-label">{{ $t('dashboard.kpi.ingresos') }}</div>
        <div class="kpi-value">{{ kpiIngresos }}k€</div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="tooltip.visible" class="dash-tooltip-global" :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }">
        {{ tooltip.text }}
      </div>
    </Teleport>

    <!-- Row 2: propiedades + mensajes -->
    <div class="dash-row">
      <!-- Últimas propiedades -->
      <div class="dash-card dash-card--wide">
        <div class="dash-card-header">
          <h3>{{ $t('dashboard.ultimasPropiedades') }}</h3>
          <RouterLink to="/propiedades" class="dash-link">{{ $t('dashboard.verTodas') }}</RouterLink>
        </div>
        <div v-if="ultimasPropiedades.length" class="prop-list">
          <div v-for="prop in ultimasPropiedades" :key="prop.id" class="prop-row">
            <img :src="prop.image" :alt="prop.name" class="prop-thumb" />
            <div class="prop-row-info">
              <span class="prop-row-name">{{ prop.name }}</span>
              <span class="prop-row-loc">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ prop.location }}
              </span>
            </div>
            <span :class="['badge-modal-sm', prop.modalidad === 'ALQUILER' ? 'badge-alquiler' : 'badge-venta']">{{ prop.modalidad }}</span>
            <span class="prop-row-price">{{ prop.price }}</span>
            <span :class="['badge-status-sm', 'badge-' + prop.statusKey]">
              <span class="status-dot"></span>{{ prop.status }}
            </span>
          </div>
        </div>
        <div v-else class="empty-state">{{ $t('dashboard.cargando') }}</div>
      </div>

      <!-- Mensajes recientes -->
      <div class="dash-card dash-card--narrow">
        <div class="dash-card-header">
          <h3>{{ $t('dashboard.mensajesRecientes') }}</h3>
          <RouterLink to="/mensajes" class="dash-link">{{ $t('dashboard.verTodos') }}</RouterLink>
        </div>
        <div v-if="mensajesRecientes.length" class="msg-list">
          <div v-for="msg in mensajesRecientes" :key="msg.id" class="msg-row">
            <div class="msg-avatar">{{ msg.nombre?.charAt(0)?.toUpperCase() }}</div>
            <div class="msg-info">
              <span class="msg-nombre">{{ msg.nombre }}</span>
              <span class="msg-snippet">{{ msg.mensaje?.slice(0, 55) }}...</span>
            </div>
            <span :class="['msg-estado', 'estado-' + msg.estado]">{{ estadoLabel(msg.estado) }}</span>
          </div>
        </div>
        <div v-else class="empty-state">{{ $t('dashboard.sinMensajes') }}</div>
      </div>
    </div>

    <!-- Row 3: gráfico barras + estado cartera -->
    <div class="dash-row">
      <!-- Mini gráfico barras -->
      <div class="dash-card dash-card--wide">
        <div class="dash-card-header">
          <h3>{{ $t('dashboard.ventasPorMes') }}</h3>
          <div class="chart-legend">
            <span class="legend-item"><span class="legend-dot legend-dot--primary"></span>{{ $t('dashboard.ventas') }}</span>
            <span class="legend-item"><span class="legend-dot legend-dot--secondary"></span>{{ $t('dashboard.alquileres') }}</span>
          </div>
        </div>
        <apexchart
          v-if="barSeries[0].data.length"
          type="bar"
          height="200"
          :options="barOptions"
          :series="barSeries"
        />
      </div>

      <!-- Estado cartera -->
      <div class="dash-card dash-card--narrow">
        <div class="dash-card-header">
          <h3>{{ $t('dashboard.estadoCartera') }}</h3>
          <RouterLink to="/estadisticas" class="dash-link">{{ $t('dashboard.verMas') }}</RouterLink>
        </div>
        <div class="cartera-grid">
          <div class="cartera-item cartera-item--disponible">
            <span class="cartera-num">{{ cartera.disponible }}</span>
            <span class="cartera-label">{{ $t('dashboard.disponible') }}</span>
          </div>
          <div class="cartera-item cartera-item--reservado">
            <span class="cartera-num">{{ cartera.reservado }}</span>
            <span class="cartera-label">{{ $t('dashboard.reservado') }}</span>
          </div>
          <div class="cartera-item cartera-item--vendido">
            <span class="cartera-num">{{ cartera.vendido }}</span>
            <span class="cartera-label">{{ $t('dashboard.vendidoAlq') }}</span>
          </div>
        </div>
        <div class="cartera-bar-wrap">
          <div
            class="cartera-bar-seg cartera-bar-seg--disponible"
            :style="{ width: carteraPercent.disponible + '%' }"
          ></div>
          <div
            class="cartera-bar-seg cartera-bar-seg--reservado"
            :style="{ width: carteraPercent.reservado + '%' }"
          ></div>
          <div
            class="cartera-bar-seg cartera-bar-seg--vendido"
            :style="{ width: carteraPercent.vendido + '%' }"
          ></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import VueApexCharts from 'vue3-apexcharts'
import { getEstadisticas } from '@/services/estadisticasService.js'
import propiedadService from '@/services/propiedadService.js'
import { mensajeService } from '@/services/mensajeService.js'
import { useFormatoPrecio } from '@/composables/useFormatoPrecio.js'

const { formatPrecio } = useFormatoPrecio()

const { t } = useI18n()
const apexchart = VueApexCharts
const anioActual = new Date().getFullYear()

const colorPrimario = ref(localStorage.getItem('colorAcento') || '#419383')

function lightenHex(hex, ratio) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const toHex = v => Math.round(v + (255 - v) * ratio).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// KPIs
const tooltip = ref({ visible: false, text: '', x: 0, y: 0 })

function showTooltip(event, text) {
  const rect = event.currentTarget.getBoundingClientRect()
  tooltip.value = { visible: true, text, x: rect.left + rect.width / 2, y: rect.top - 12 }
}

function hideTooltip() { tooltip.value.visible = false }

const kpiPropiedades = ref(0)
const kpiMensajes    = ref(0)
const kpiVentas      = ref(0)
const kpiIngresos    = ref('0.0')

const variacion = reactive({
  propiedades: { texto: '—', clase: 'kpi-badge--neutral' },
  mensajes:    { texto: '—', clase: 'kpi-badge--neutral' },
  ventas:      { texto: '—', clase: 'kpi-badge--neutral' },
  ingresos:    { texto: '—', clase: 'kpi-badge--neutral' },
})

function calcVariacion(actual, anterior) {
  if (anterior === 0 && actual === 0) return { texto: '—', clase: 'kpi-badge--neutral' }
  if (anterior === 0) return { texto: t('dashboard.sinRef'), clase: 'kpi-badge--neutral' }
  const pct = ((actual - anterior) / anterior) * 100
  const signo = pct >= 0 ? '+' : ''
  const clase = pct > 0 ? 'kpi-badge--green' : pct < 0 ? 'kpi-badge--red' : 'kpi-badge--neutral'
  return { texto: `${signo}${pct.toFixed(1)}%`, clase }
}

function countUp(setter, target, duration = 900, decimals = 0) {
  const start = performance.now()
  function step(now) {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    const value = ease * target
    setter(decimals ? value.toFixed(decimals) : Math.round(value))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// Propiedades
const ultimasPropiedades = ref([])

function formatPrice(precio, modalidad) {
  return formatPrecio(precio, modalidad)
}

function estadoLabelProp(estado) {
  const keyMap = { disponible: 'disponible', reservado: 'reservado', alquilado: 'alquilado', vendido: 'vendido' }
  const key = keyMap[estado?.toLowerCase()]
  return key ? t('estados.' + key) : estado
}

// Mensajes
const mensajesRecientes = ref([])

function estadoLabel(estado) {
  const keyMap = { nuevo: 'nuevo', en_proceso: 'enProceso', cerrado: 'cerrado' }
  const key = keyMap[estado]
  return key ? t('estados.' + key) : estado
}

// Cartera
const cartera = ref({ disponible: 0, reservado: 0, vendido: 0 })
const carteraPercent = computed(() => {
  const total = cartera.value.disponible + cartera.value.reservado + cartera.value.vendido
  if (!total) return { disponible: 0, reservado: 0, vendido: 0 }
  return {
    disponible: Math.round((cartera.value.disponible / total) * 100),
    reservado:  Math.round((cartera.value.reservado  / total) * 100),
    vendido:    Math.round((cartera.value.vendido    / total) * 100),
  }
})

// Bar chart
const barSeries = ref([
  { name: 'Ventas',     data: [] },
  { name: 'Alquileres', data: [] },
])
const barOptions = ref({
  chart: {
    type: 'bar',
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: 'easeOutQuart',
      speed: 900,
      animateGradually: { enabled: true, delay: 120 },
    },
  },
  colors: [colorPrimario.value, lightenHex(colorPrimario.value, 0.4)],
  plotOptions: { bar: { columnWidth: '55%', borderRadius: 4 } },
  dataLabels: { enabled: false },
  legend: { show: false },
  xaxis: {
    categories: [],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#6b7280', fontSize: '11px' } },
  },
  yaxis: { labels: { style: { colors: '#6b7280', fontSize: '11px' } } },
  grid: { borderColor: '#f1f5f9', xaxis: { lines: { show: false } } },
  tooltip: { theme: 'dark', style: { fontSize: '13px' } },
})

onMounted(async () => {
  try {
    const [statsData, propsData, msgsData] = await Promise.all([
      getEstadisticas(),
      propiedadService.getAll(),
      mensajeService.listar(),
    ])

    // KPIs
    countUp(v => kpiPropiedades.value = v, statsData.totalPropiedades)
    countUp(v => kpiVentas.value = v, statsData.ventasEsteMes)
    countUp(v => kpiIngresos.value = v, statsData.ingresosEstimados / 1000, 900, 1)

    // Mensajes pendientes KPI
    const pendientes = msgsData.filter(m => m.estado === 'nuevo' || m.estado === 'en_proceso')
    countUp(v => kpiMensajes.value = v, pendientes.length)

    // Variaciones vs mes anterior
    Object.assign(variacion, {
      propiedades: calcVariacion(statsData.totalPropiedades,  statsData.totalPropiedadesAnterior),
      mensajes:    calcVariacion(statsData.leadsEsteMes,      statsData.leadsAnteriorMes),
      ventas:      calcVariacion(statsData.ventasEsteMes,     statsData.ventasAnteriorMes),
      ingresos:    calcVariacion(statsData.ingresosEstimados, statsData.ingresosAnteriorMes),
    })

    // Últimas 5 propiedades
    ultimasPropiedades.value = [...propsData].reverse().slice(0, 5).map(p => ({
      id: p.id,
      name: p.nombre,
      image: p.imagenes?.[0] || 'https://picsum.photos/seed/default/56/56',
      location: p.ubicacion,
      price: formatPrice(p.precio, p.modalidad),
      modalidad: p.modalidad?.toUpperCase(),
      status: estadoLabelProp(p.estado),
      statusKey: p.estado?.toLowerCase(),
    }))

    // Mensajes recientes (últimos 5, pendientes primero)
    const sorted = [...msgsData].sort((a, b) => {
      const order = { nuevo: 0, en_proceso: 1, cerrado: 2 }
      return (order[a.estado] ?? 3) - (order[b.estado] ?? 3)
    })
    mensajesRecientes.value = sorted.slice(0, 5)

    // Estado cartera
    const ec = statsData.estadoCartera
    cartera.value = {
      disponible: ec.disponible || 0,
      reservado:  ec.reservado  || 0,
      vendido:    (ec.vendido   || 0) + (ec.alquilado || 0),
    }

    // Bar chart
    const meses = statsData.ventasPorMes.map(m => m.mes)
    barOptions.value = { ...barOptions.value, xaxis: { ...barOptions.value.xaxis, categories: meses } }
    barSeries.value = [
      { name: 'Ventas',     data: statsData.ventasPorMes.map(m => m.ventas) },
      { name: 'Alquileres', data: statsData.ventasPorMes.map(m => m.alquileres) },
    ]

  } catch (e) {
    console.error('Error cargando dashboard:', e)
  }
})
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.page-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1.2;
  letter-spacing: -0.5px;
  margin: 0 0 6px;
}
.page-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}
.badge-anio {
  padding: 8px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
  align-self: flex-start;
}

/* ── KPI Grid ── */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.kpi-card {
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.kpi-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kpi-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kpi-icon--teal   { background: color-mix(in srgb, var(--color-primary) 12%, white); color: var(--color-primary); }
.kpi-icon--purple { background: #f5f3ff; color: #7c3aed; }
.kpi-icon--orange { background: #fff7ed; color: #ea580c; }
.kpi-icon--green  { background: #f0fdf4; color: #16a34a; }
.kpi-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
}
.kpi-badge--green   { background: #f0fdf4; color: #16a34a; }
.kpi-badge--teal    { background: #f0fdfa; color: #0d9488; }
.kpi-badge--red     { background: #fef2f2; color: #dc2626; }
.kpi-badge--neutral { background: #f3f4f6; color: #6b7280; }

[data-tooltip] { position: relative; cursor: default; }
[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 6px);
  right: 0;
  background: #1f2937;
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  padding: 5px 9px;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.15s, transform 0.15s;
  z-index: 10;
}
[data-tooltip]:hover::after { opacity: 1; transform: translateY(0); }
.kpi-badge--orange { background: #fff7ed; color: #ea580c; }
.kpi-label { font-size: 13px; color: #6b7280; font-weight: 500; }
.kpi-value { font-size: 30px; font-weight: 700; color: #111827; line-height: 1.1; }

/* ── Rows ── */
.dash-row { display: flex; gap: 16px; }
.dash-card {
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.dash-card--wide   { flex: 1.6; }
.dash-card--narrow { flex: 1; }

.dash-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dash-card-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}
.dash-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity 0.15s;
}
.dash-link:hover { opacity: 0.75; }

/* ── Prop list ── */
.prop-list { display: flex; flex-direction: column; gap: 0; }
.prop-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}
.prop-row:last-child { border-bottom: none; }
.prop-thumb {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.prop-row-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.prop-row-name {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.prop-row-loc {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: #9ca3af;
}
.prop-row-price {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  flex-shrink: 0;
}
.badge-modal-sm {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 20px;
  flex-shrink: 0;
}
.badge-venta    { background: #eff6ff; color: #2563eb; }
.badge-alquiler { background: #fdf4ff; color: #9333ea; }

.badge-status-sm {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  flex-shrink: 0;
}
.badge-disponible { background: #f0fdf4; color: #16a34a; }
.badge-reservado  { background: #fffbeb; color: #d97706; }
.badge-vendido    { background: #f0f9ff; color: #0284c7; }
.badge-alquilado  { background: #fdf4ff; color: #9333ea; }
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

/* ── Msg list ── */
.msg-list { display: flex; flex-direction: column; gap: 0; }
.msg-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}
.msg-row:last-child { border-bottom: none; }
.msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-primary) 12%, white);
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.msg-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.msg-nombre { font-size: 13px; font-weight: 600; color: #111827; }
.msg-snippet {
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.msg-estado {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  flex-shrink: 0;
}
.estado-nuevo      { background: #fef9c3; color: #854d0e; }
.estado-en_proceso { background: #eff6ff; color: #1d4ed8; }
.estado-cerrado    { background: #f0fdf4; color: #15803d; }

/* ── Chart legend ── */
.chart-legend { display: flex; gap: 14px; }
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
}
.legend-dot { width: 10px; height: 10px; border-radius: 50%; }
.legend-dot--primary   { background: var(--color-primary); }
.legend-dot--secondary { background: color-mix(in srgb, var(--color-primary) 40%, white); }

/* ── Cartera ── */
.cartera-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.cartera-item {
  background: #f8fafc;
  border: 1px solid #eaecf0;
  border-radius: 10px;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.cartera-num  { font-size: 26px; font-weight: 800; line-height: 1; }
.cartera-label { font-size: 11px; font-weight: 600; color: #6b7280; letter-spacing: 0.03em; }
.cartera-item--disponible .cartera-num { color: #16a34a; }
.cartera-item--reservado  .cartera-num { color: #d97706; }
.cartera-item--vendido    .cartera-num { color: #0284c7; }

.cartera-bar-wrap {
  display: flex;
  height: 8px;
  border-radius: 99px;
  overflow: hidden;
  background: #f1f5f9;
}
.cartera-bar-seg { height: 100%; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1); }
.cartera-bar-seg--disponible { background: var(--color-primary); }
.cartera-bar-seg--reservado  { background: #f59e0b; }
.cartera-bar-seg--vendido    { background: #38bdf8; }

/* ── Empty ── */
.empty-state {
  font-size: 13px;
  color: #9ca3af;
  text-align: center;
  padding: 20px 0;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .kpi-grid  { grid-template-columns: repeat(2, 1fr); }
  .dash-row  { flex-direction: column; }
  .dash-card--wide, .dash-card--narrow { flex: none; }
}
@media (max-width: 640px) {
  .page-header { flex-direction: column; align-items: center; text-align: center; gap: 10px; width: 100%; }
  .badge-anio { align-self: center; }
  .kpi-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .cartera-grid { grid-template-columns: repeat(3, 1fr); }
}

.kpi-icon { cursor: default; }
</style>

<style>
.dash-tooltip-global {
  position: fixed;
  transform: translate(-50%, -100%);
  background: #1e293b;
  color: #f1f5f9;
  font-size: 12px;
  line-height: 1.4;
  padding: 8px 12px;
  border-radius: 6px;
  width: 200px;
  text-align: center;
  pointer-events: none;
  z-index: 9999;
}

html.dark .dashboard .kpi-card,
html.dark .dashboard .dash-card       { background: #1e2333; border-color: #2d3348; }
html.dark .dashboard .badge-anio      { background: #1e2333; border-color: #2d3348; color: #94a3b8; }
html.dark .dashboard .cartera-item    { background: #242938; }
html.dark .dashboard .page-subtitle   { color: #94a3b8; }
html.dark .dashboard .kpi-label       { color: #94a3b8; }
html.dark .dashboard .kpi-value       { color: #e2e8f0; }
html.dark .dashboard .dash-card-header h3 { color: #e2e8f0; }
html.dark .dashboard .prop-row-name   { color: #e2e8f0; }
html.dark .dashboard .prop-row-price  { color: #e2e8f0; }
html.dark .dashboard .prop-row-loc    { color: #64748b; }
html.dark .dashboard .msg-nombre      { color: #e2e8f0; }
html.dark .dashboard .msg-snippet     { color: #94a3b8; }
html.dark .dashboard .legend-item     { color: #94a3b8; }
html.dark .dashboard .cartera-label   { color: #94a3b8; }
html.dark .dashboard .empty-state     { color: #64748b; }
html.dark .dashboard .zona-name       { color: #64748b; }
html.dark .dashboard .zona-value      { color: #e2e8f0; }
html.dark .dashboard .kpi-badge--neutral { color: #94a3b8; background: #2d3348; border-color: #3d4460; }
</style>
