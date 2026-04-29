<template>
  <div class="estadisticas">

    <!-- Header -->
    <div class="stats-header">
      <div class="stats-header-left">
        <h1>{{ $t('estadisticas.title') }}</h1>
        <p>{{ $t('estadisticas.subtitle') }}</p>
      </div>
      <div class="stats-header-right">
        <span class="badge-anio">{{ $t('estadisticas.datos') }} {{ anioActual }}</span>
        <button class="btn-export" @click="exportarExcel">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          {{ $t('estadisticas.exportar') }}
        </button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-top">
          <div class="kpi-icon kpi-icon--teal" @mouseenter="showTooltip($event, 'Total de propiedades registradas en el sistema')" @mouseleave="hideTooltip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span :class="['kpi-badge', variacion.propiedades.clase]" :data-tooltip="$t('estadisticas.variacionTooltip')">{{ variacion.propiedades.texto }}</span>
        </div>
        <div class="kpi-label">{{ $t('estadisticas.kpi.propiedades') }}</div>
        <div class="kpi-value">{{ kpiPropiedades.toLocaleString() }}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <div class="kpi-icon kpi-icon--purple" @mouseenter="showTooltip($event, 'Consultas de clientes recibidas este mes')" @mouseleave="hideTooltip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <span :class="['kpi-badge', variacion.leads.clase]" :data-tooltip="$t('estadisticas.variacionTooltip')">{{ variacion.leads.texto }}</span>
        </div>
        <div class="kpi-label">{{ $t('estadisticas.kpi.leads') }}</div>
        <div class="kpi-value">{{ kpiLeads }}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <div class="kpi-icon kpi-icon--orange" @mouseenter="showTooltip($event, 'Propiedades vendidas o alquiladas este mes')" @mouseleave="hideTooltip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          </div>
          <span :class="['kpi-badge', variacion.ventas.clase]" :data-tooltip="$t('estadisticas.variacionTooltip')">{{ variacion.ventas.texto }}</span>
        </div>
        <div class="kpi-label">{{ $t('estadisticas.kpi.ventas') }}</div>
        <div class="kpi-value">{{ kpiVentas }}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">
          <div class="kpi-icon kpi-icon--green" @mouseenter="showTooltip($event, 'Ingresos estimados por comisiones del 3% sobre ventas cerradas')" @mouseleave="hideTooltip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          </div>
          <span :class="['kpi-badge', variacion.ingresos.clase]" :data-tooltip="$t('estadisticas.variacionTooltip')">{{ variacion.ingresos.texto }}</span>
        </div>
        <div class="kpi-label">{{ $t('estadisticas.kpi.ingresos') }}</div>
        <div class="kpi-value">{{ kpiIngresos }}k€</div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="tooltip.visible" class="kpi-tooltip-global" :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }">
        {{ tooltip.text }}
      </div>
    </Teleport>

    <!-- Charts Row 1 -->
    <div class="charts-row">
      <div class="chart-card chart-card--wide">
        <div class="chart-card-header">
          <h3>{{ $t('estadisticas.ventasPorMes') }}</h3>
          <div class="chart-legend">
            <span class="legend-item"><span class="legend-dot legend-dot--primary"></span>{{ $t('estadisticas.ventas') }}</span>
            <span class="legend-item"><span class="legend-dot legend-dot--secondary"></span>{{ $t('estadisticas.alquileres') }}</span>
          </div>
        </div>
        <apexchart type="bar" height="220" :options="barOptions" :series="barSeries" v-if="barSeries[0].data.length" />
      </div>

      <div class="chart-card chart-card--narrow">
        <div class="chart-card-header">
          <h3>{{ $t('estadisticas.estadoCartera') }}</h3>
        </div>
        <div class="donut-wrap">
          <div class="donut-apex-wrap">
            <apexchart type="pie" height="220" :options="donutOptions" :series="donutSeries" v-if="donutSeries.some(v => v > 0)" />
          </div>
          <div class="donut-legend">
            <div class="donut-legend-item">
              <span class="legend-dot legend-dot--primary"></span>
              <span>{{ $t('estadisticas.disponible') }}</span>
              <span class="donut-count">{{ donutSeries[0] }}</span>
            </div>
            <div class="donut-legend-item">
              <span class="legend-dot legend-dot--secondary"></span>
              <span>{{ $t('estadisticas.reservado') }}</span>
              <span class="donut-count">{{ donutSeries[1] }}</span>
            </div>
            <div class="donut-legend-item">
              <span class="legend-dot legend-dot--light"></span>
              <span>{{ $t('estadisticas.vendidoAlq') }}</span>
              <span class="donut-count">{{ donutSeries[2] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row 2 -->
    <div class="charts-row">
      <div class="chart-card chart-card--wide">
        <div class="chart-card-header">
          <h3>{{ $t('estadisticas.precioMedio') }}</h3>
        </div>
        <div class="price-bars">
          <div v-for="item in preciosPorTipo" :key="item.label" class="price-bar-item">
            <div class="price-bar-top">
              <span class="price-bar-label">{{ item.label }}</span>
              <span class="price-bar-value">{{ item.display }}</span>
            </div>
            <div class="price-bar-track">
              <div class="price-bar-fill" :style="{ width: item.percent + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card chart-card--narrow">
        <div class="chart-card-header">
          <h3>{{ $t('estadisticas.distribucionZona') }}</h3>
        </div>
        <div class="zona-map">
          <div class="zona-map-placeholder">
            <svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg" class="asturias-map">
              <path d="M20,70 Q40,30 80,40 Q110,20 150,35 Q190,15 230,30 Q265,25 280,50 Q285,80 260,95 Q230,110 200,100 Q170,115 140,105 Q110,120 80,110 Q50,115 30,95 Z" :fill="colorClaro" :stroke="colorSecundario" stroke-width="1.5"/>
              <circle cx="110" cy="70" r="8" :fill="colorPrimario" opacity="0.85"/>
              <circle cx="110" cy="70" r="14" :fill="colorPrimario" opacity="0.15"/>
              <circle cx="195" cy="60" r="6" :fill="colorPrimario" opacity="0.7"/>
              <circle cx="195" cy="60" r="11" :fill="colorPrimario" opacity="0.12"/>
              <text x="104" y="90" font-size="9" :fill="colorPrimario" font-family="sans-serif">Oviedo</text>
              <text x="188" y="79" font-size="9" :fill="colorPrimario" font-family="sans-serif">Gijón</text>
            </svg>
          </div>
        </div>
        <div class="zona-grid">
          <div class="zona-card"><span class="zona-name">OVIEDO</span><span class="zona-value">{{ distribucionZona.Oviedo || 0 }} {{ $t('estadisticas.propAbrev') }}</span></div>
          <div class="zona-card"><span class="zona-name">GIJÓN</span><span class="zona-value">{{ distribucionZona['Gijón'] || 0 }} {{ $t('estadisticas.propAbrev') }}</span></div>
          <div class="zona-card"><span class="zona-name">AVILÉS</span><span class="zona-value">{{ distribucionZona['Avilés'] || 0 }} {{ $t('estadisticas.propAbrev') }}</span></div>
          <div class="zona-card"><span class="zona-name">OTROS</span><span class="zona-value">{{ distribucionZona.Otros || 0 }} {{ $t('estadisticas.propAbrev') }}</span></div>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="charts-row">
      <div class="chart-card chart-card--wide">
        <div class="chart-card-header">
          <h3>{{ $t('estadisticas.altasRecientes') }}</h3>
          <span class="badge-period">{{ $t('estadisticas.ultimos7') }}</span>
        </div>
        <div class="altas-list">
          <div v-for="alta in altasRecientes" :key="alta.fecha" class="alta-item">
            <div class="alta-dot" :class="alta.today ? 'alta-dot--active' : 'alta-dot--inactive'"></div>
            <div class="alta-info">
              <span class="alta-fecha">{{ alta.fecha }}</span>
              <span class="alta-count" :class="alta.today ? 'alta-count--highlight' : ''">{{ alta.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card chart-card--narrow">
        <div class="chart-card-header">
          <h3>{{ $t('estadisticas.topPropiedades') }}</h3>
        </div>
        <div class="top-props-list">
          <div v-for="prop in topPropiedades" :key="prop.ref" class="top-prop-item">
            <div class="top-prop-img" :style="prop.imagen ? {} : { background: prop.color }">
              <img v-if="prop.imagen" :src="prop.imagen" :alt="prop.nombre" class="top-prop-foto" />
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" opacity="0.7"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </div>
            <div class="top-prop-info">
              <span class="top-prop-name">{{ prop.nombre }}</span>
              <span class="top-prop-ref">Ref: {{ prop.ref }}</span>
            </div>
            <div class="top-prop-clicks">
              <span class="top-prop-num">{{ prop.clicks.toLocaleString() }}</span>
              <span class="top-prop-unit">{{ $t('estadisticas.clicks') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import VueApexCharts from 'vue3-apexcharts'
import * as XLSX from 'xlsx'
import { getEstadisticas } from '@/services/estadisticasService.js'
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

const colorSecundario = computed(() => lightenHex(colorPrimario.value, 0.4))
const colorClaro      = computed(() => lightenHex(colorPrimario.value, 0.65))

const tooltip = ref({ visible: false, text: '', x: 0, y: 0 })

function showTooltip(event, text) {
  const rect = event.currentTarget.getBoundingClientRect()
  tooltip.value = { visible: true, text, x: rect.left + rect.width / 2, y: rect.top - 12 }
}

function hideTooltip() { tooltip.value.visible = false }

const kpiPropiedades = ref(0)
const kpiLeads       = ref(0)
const kpiVentas      = ref(0)
const kpiIngresos    = ref('0.0')

const variacion = reactive({
  propiedades: { texto: '—', clase: 'kpi-badge--neutral' },
  leads:       { texto: '—', clase: 'kpi-badge--neutral' },
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


const preciosPorTipo = ref([])
const altasRecientes = ref([])
const distribucionZona = ref({})
const topPropiedades = ref([])
const TOP_COLORS = computed(() => [
  `linear-gradient(135deg,${colorPrimario.value},${colorSecundario.value})`,
  `linear-gradient(135deg,${colorPrimario.value},${lightenHex(colorPrimario.value, 0.55)})`,
  'linear-gradient(135deg,#7c3aed,#a78bfa)',
])

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
      dynamicAnimation: { enabled: true, speed: 400 },
    },
  },
  colors: [colorPrimario.value, colorSecundario.value],
  plotOptions: { bar: { columnWidth: '55%', borderRadius: 4 } },
  dataLabels: { enabled: false },
  legend: { show: false },
  xaxis: {
    categories: [],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#6b7280', fontSize: '12px' } },
  },
  yaxis: { labels: { style: { colors: '#6b7280', fontSize: '12px' } } },
  grid: { borderColor: '#f1f5f9', xaxis: { lines: { show: false } } },
  tooltip: { theme: 'dark', style: { fontSize: '13px' } },
})

// Pie chart
const donutSeries = ref([0, 0, 0])
const donutOptions = ref({
  chart: {
    type: 'pie',
    toolbar: { show: false },
    animations: { enabled: true, easing: 'easeOutQuart', speed: 900, animateGradually: { enabled: true, delay: 150 } },
  },
  colors: [colorPrimario.value, colorSecundario.value, colorClaro.value],
  labels: ['Disponible', 'Reservado', 'Vendido'],
  legend: { show: false },
  dataLabels: { enabled: false },
  stroke: { width: 2, colors: ['#fff'] },
  states: { hover: { filter: { type: 'darken', value: 0.85 } } },
  tooltip: { theme: 'dark' },
})

const TIPO_LABEL = {
  'Piso': 'PISOS / APARTAMENTOS',
  'Apartamento': 'PISOS / APARTAMENTOS',
  'Chalet': 'CASAS / CHALETS',
  'Casa': 'CASAS / CHALETS',
  'Local': 'LOCALES COMERCIALES',
  'Terreno': 'TERRENOS / PARCELAS',
  'Garaje': 'GARAJES / TRASTEROS',
}

function setCols(ws, widths) {
  ws['!cols'] = widths.map(w => ({ wch: w }))
}

function exportarExcel() {
  const wb = XLSX.utils.book_new()
  const fecha = new Date().toLocaleDateString('es-ES')

  // ── Hoja 1: Resumen KPIs ──
  const wsKpi = XLSX.utils.aoa_to_sheet([
    [`Informe Estadísticas AsturHome ${anioActual}`],
    [`Generado el ${fecha}`],
    [],
    ['Métrica', 'Valor', 'Variación vs mes anterior'],
    ['Total Propiedades', kpiPropiedades.value, variacion.propiedades.texto],
    ['Leads este mes',    kpiLeads.value,       variacion.leads.texto],
    ['Ventas este mes',   kpiVentas.value,      variacion.ventas.texto],
    ['Ingresos estimados', `${kpiIngresos.value}k€`, variacion.ingresos.texto],
  ])
  setCols(wsKpi, [28, 18, 28])
  XLSX.utils.book_append_sheet(wb, wsKpi, 'Resumen')

  // ── Hoja 2: Ventas por mes ──
  const meses = barOptions.value.xaxis.categories
  const wsVentas = XLSX.utils.aoa_to_sheet([
    ['Mes', 'Ventas', 'Alquileres'],
    ...meses.map((mes, i) => [mes, barSeries.value[0].data[i], barSeries.value[1].data[i]]),
  ])
  setCols(wsVentas, [16, 12, 14])
  XLSX.utils.book_append_sheet(wb, wsVentas, 'Ventas por Mes')

  // ── Hoja 3: Estado cartera ──
  const wsCartera = XLSX.utils.aoa_to_sheet([
    ['Estado', 'Propiedades'],
    ['Disponible',         donutSeries.value[0]],
    ['Reservado',          donutSeries.value[1]],
    ['Vendido / Alquilado', donutSeries.value[2]],
    [],
    ['Total', donutSeries.value.reduce((a, b) => a + b, 0)],
  ])
  setCols(wsCartera, [22, 16])
  XLSX.utils.book_append_sheet(wb, wsCartera, 'Estado Cartera')

  // ── Hoja 4: Precio medio por tipo ──
  const wsPrecio = XLSX.utils.aoa_to_sheet([
    ['Tipo de inmueble', 'Precio medio'],
    ...preciosPorTipo.value.map(p => [p.label, p.display]),
  ])
  setCols(wsPrecio, [30, 18])
  XLSX.utils.book_append_sheet(wb, wsPrecio, 'Precios por Tipo')

  // ── Hoja 5: Distribución por zona ──
  const wsZona = XLSX.utils.aoa_to_sheet([
    ['Zona', 'Propiedades'],
    ...Object.entries(distribucionZona.value).map(([zona, n]) => [zona, n]),
  ])
  setCols(wsZona, [18, 16])
  XLSX.utils.book_append_sheet(wb, wsZona, 'Distribución Zona')

  // ── Hoja 6: Altas recientes ──
  const wsAltas = XLSX.utils.aoa_to_sheet([
    ['Fecha', 'Nuevas propiedades'],
    ...altasRecientes.value.map(a => [a.fecha, parseInt(a.count) || 0]),
  ])
  setCols(wsAltas, [16, 22])
  XLSX.utils.book_append_sheet(wb, wsAltas, 'Altas Recientes')

  // ── Hoja 7: Top propiedades ──
  const wsTop = XLSX.utils.aoa_to_sheet([
    ['Referencia', 'Nombre', 'Vistas'],
    ...topPropiedades.value.map(p => [p.ref, p.nombre, p.clicks]),
  ])
  setCols(wsTop, [14, 32, 10])
  XLSX.utils.book_append_sheet(wb, wsTop, 'Top Propiedades')

  XLSX.writeFile(wb, `estadisticas-asturhome-${anioActual}.xlsx`)
}

onMounted(async () => {
  try {
    const data = await getEstadisticas()

    // KPIs con animación
    countUp(v => kpiPropiedades.value = v, data.totalPropiedades)
    countUp(v => kpiLeads.value = v, data.leadsEsteMes)
    countUp(v => kpiVentas.value = v, data.ventasEsteMes)
    const ingresosK = data.ingresosEstimados / 1000
    countUp(v => kpiIngresos.value = v, ingresosK, 900, 1)

    // Variaciones vs mes anterior
    Object.assign(variacion, {
      propiedades: calcVariacion(data.totalPropiedades,   data.totalPropiedadesAnterior),
      leads:       calcVariacion(data.leadsEsteMes,       data.leadsAnteriorMes),
      ventas:      calcVariacion(data.ventasEsteMes,      data.ventasAnteriorMes),
      ingresos:    calcVariacion(data.ingresosEstimados,  data.ingresosAnteriorMes),
    })

    // Gráfica de barras
    const meses = data.ventasPorMes.map(m => m.mes)
    barOptions.value = { ...barOptions.value, xaxis: { ...barOptions.value.xaxis, categories: meses } }
    barSeries.value = [
      { name: 'Ventas',     data: data.ventasPorMes.map(m => m.ventas) },
      { name: 'Alquileres', data: data.ventasPorMes.map(m => m.alquileres) },
    ]

    // Pie estado cartera
    const ec = data.estadoCartera
    donutSeries.value = [
      ec.disponible || 0,
      ec.reservado  || 0,
      (ec.vendido   || 0) + (ec.alquilado || 0),
    ]

    // Precio medio por tipo
    const maxPrecio = Math.max(...Object.values(data.precioMedioPorTipo))
    const agrupado = {}
    Object.entries(data.precioMedioPorTipo).forEach(([tipo, precio]) => {
      const label = TIPO_LABEL[tipo] || tipo.toUpperCase()
      if (!agrupado[label] || precio > agrupado[label]) agrupado[label] = precio
    })
    const preciosArray = Object.entries(agrupado).map(([label, precio]) => ({
      label,
      display: formatPrecio(precio),
      targetPercent: Math.round((precio / maxPrecio) * 100),
      percent: 0,
    }))
    preciosPorTipo.value = preciosArray
    setTimeout(() => {
      preciosPorTipo.value = preciosArray.map(p => ({ ...p, percent: p.targetPercent }))
    }, 200)

    // Top propiedades por vistas
    topPropiedades.value = (data.topPropiedades || []).map((p, i) => ({
      nombre: p.nombre,
      ref: 'AST-' + String(p.id).padStart(4, '0'),
      clicks: p.vistas,
      color: TOP_COLORS.value[i] || TOP_COLORS.value[0],
      imagen: p.imagen || null,
    }))

    // Distribución por zona
    distribucionZona.value = data.distribucionZona || {}

    // Altas recientes
    altasRecientes.value = data.altasRecientes.map(a => ({
      fecha: a.fecha,
      count: `+${a.cantidad} ${t('estadisticas.propiedades')}`,
      today: a.fecha === 'Hoy',
    }))

  } catch (e) {
    console.error('Error cargando estadísticas:', e)
  }
})
</script>

<style scoped>
.estadisticas {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
}

/* ── Header ── */
.stats-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.stats-header-left h1 {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1.2;
  letter-spacing: -0.5px;
  margin: 0 0 6px;
}
.stats-header-left p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}
.stats-header-right {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-shrink: 0;
}
.badge-anio {
  padding: 8px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.btn-period {
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
.btn-period:hover { background: #f9fafb; }
.btn-export {
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
.btn-export:hover { opacity: 0.9; }

/* ── KPI Cards ── */
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
[data-tooltip]:hover::after {
  opacity: 1;
  transform: translateY(0);
}
.kpi-label { font-size: 13px; color: #6b7280; font-weight: 500; }
.kpi-value { font-size: 30px; font-weight: 700; color: #111827; line-height: 1.1; }

/* ── Chart Row ── */
.charts-row { display: flex; gap: 16px; }
.chart-card {
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  padding: 22px;
}
.chart-card--wide   { flex: 1.6; }
.chart-card--narrow { flex: 1; }
.chart-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.chart-card-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

/* ── Legend ── */
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
.legend-dot--light     { background: color-mix(in srgb, var(--color-primary) 25%, white); }

/* ── Donut ── */
.donut-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.donut-apex-wrap { width: 100%; }
.donut-legend { width: 100%; display: flex; flex-direction: column; gap: 10px; }
.donut-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
}
.donut-count { margin-left: auto; font-weight: 600; color: #111827; }

/* ── Price Bars ── */
.price-bars { display: flex; flex-direction: column; gap: 20px; }
.price-bar-item { display: flex; flex-direction: column; gap: 7px; }
.price-bar-top { display: flex; justify-content: space-between; align-items: center; }
.price-bar-label { font-size: 12px; font-weight: 600; color: #374151; letter-spacing: 0.04em; }
.price-bar-value { font-size: 13px; font-weight: 600; color: #111827; }
.price-bar-track { height: 8px; background: #f1f5f9; border-radius: 99px; overflow: hidden; }
.price-bar-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 99px;
  width: 0;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Zona ── */
.zona-map {
  border-radius: 10px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid color-mix(in srgb, var(--color-primary) 20%, white);
  margin-bottom: 12px;
}
.zona-map-placeholder { padding: 10px; display: flex; align-items: center; justify-content: center; }
.asturias-map { width: 100%; max-height: 110px; }
.zona-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.zona-card {
  background: #f8fafc;
  border: 1px solid color-mix(in srgb, var(--color-primary) 20%, white);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.zona-name { font-size: 10px; font-weight: 700; color: #9ca3af; letter-spacing: 0.08em; }
.zona-value { font-size: 16px; font-weight: 700; color: #111827; }

/* ── Altas Recientes ── */
.badge-period {
  background: #f0fdf4;
  color: #16a34a;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}
.altas-list { display: flex; flex-direction: column; }
.alta-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;
}
.alta-item:last-child { border-bottom: none; }
.alta-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.alta-dot--active   { background: var(--color-primary); }
.alta-dot--inactive { background: color-mix(in srgb, var(--color-primary) 40%, white); }
.alta-info { display: flex; justify-content: space-between; width: 100%; align-items: center; }
.alta-fecha { font-size: 14px; color: #374151; font-weight: 500; }
.alta-count { font-size: 13px; color: #6b7280; font-weight: 500; }
.alta-count--highlight { color: #16a34a; font-weight: 700; }

/* ── Top Propiedades ── */
.top-props-list { display: flex; flex-direction: column; }
.top-prop-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;
}
.top-prop-item:last-child { border-bottom: none; }
.top-prop-img {
  width: 46px;
  height: 46px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-prop-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.top-prop-name { font-size: 13px; font-weight: 600; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.top-prop-ref { font-size: 12px; color: #9ca3af; }
.top-prop-clicks { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; flex-shrink: 0; }
.top-prop-foto { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; display: block; }
.top-prop-num { font-size: 15px; font-weight: 700; color: var(--color-primary); }
.top-prop-unit { font-size: 10px; font-weight: 600; color: #9ca3af; letter-spacing: 0.06em; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-row { flex-direction: column; }
  .chart-card--wide, .chart-card--narrow { flex: none; }
}
@media (max-width: 640px) {
  .estadisticas { padding: 16px; }
  .kpi-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .stats-header { flex-direction: column; align-items: center; text-align: center; }
  .stats-header-right { width: 100%; justify-content: center; }
}

.kpi-icon { cursor: default; }
</style>

<style>
.kpi-tooltip-global {
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

html.dark .estadisticas .kpi-card,
html.dark .estadisticas .chart-card    { background: #1e2333; border-color: #2d3348; }
html.dark .estadisticas .zona-card     { background: #242938; border-color: #2d3348; }
html.dark .estadisticas .badge-anio    { background: #1e2333; border-color: #2d3348; color: #94a3b8; }
html.dark .estadisticas .price-bar-track { background: #2d3348; }
html.dark .estadisticas .stats-header-left p { color: #94a3b8; }
html.dark .estadisticas .kpi-label     { color: #94a3b8; }
html.dark .estadisticas .kpi-value     { color: #e2e8f0; }
html.dark .estadisticas .kpi-badge--neutral { color: #94a3b8; background: #2d3348; border-color: #3d4460; }
html.dark .estadisticas .chart-card-header h3 { color: #e2e8f0; }
html.dark .estadisticas .legend-item   { color: #94a3b8; }
html.dark .estadisticas .donut-legend-item { color: #94a3b8; }
html.dark .estadisticas .price-bar-label  { color: #94a3b8; }
html.dark .estadisticas .price-bar-value  { color: #e2e8f0; }
html.dark .estadisticas .zona-name     { color: #64748b; }
html.dark .estadisticas .zona-value    { color: #e2e8f0; }
html.dark .estadisticas .alta-fecha    { color: #e2e8f0; }
html.dark .estadisticas .alta-count    { color: #94a3b8; }
html.dark .estadisticas .top-prop-name { color: #e2e8f0; }
html.dark .estadisticas .top-prop-ref,
html.dark .estadisticas .top-prop-unit { color: #64748b; }
</style>
