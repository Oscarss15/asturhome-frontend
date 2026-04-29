<template>
  <div class="mensajes-page">

    <!-- Header -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">{{ $t('mensajes.title') }}</h1>
        <p class="page-subtitle">{{ $t('mensajes.subtitle') }}</p>
      </div>
      <div class="view-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >{{ tab.label }}</button>
      </div>
    </div>

    <!-- Tablero Kanban -->
    <div v-if="activeTab === 'tablero'" class="kanban-board">
      <div
        v-for="col in columns"
        :key="col.key"
        class="kanban-col"
        :class="{ 'col-drag-over': dragOverCol === col.key }"
        @dragover.prevent="dragOverCol = col.key"
        @dragleave="dragOverCol = null"
        @drop="onDrop(col.key)"
      >
        <div class="col-header">
          <div class="col-title-row">
            <span class="col-title">{{ col.label }}</span>
            <span class="col-badge" :class="'badge-' + col.key">{{ mensajesPorColumna(col.key).length }}</span>
          </div>
          <button class="col-menu-btn">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01"/></svg>
          </button>
        </div>

        <div class="col-cards">
          <div
            v-for="msg in mensajesPorColumna(col.key)"
            :key="msg.id"
            class="msg-card"
            :class="{ 'card-cerrado': col.key === 'cerrados', 'card-dragging': dragId === msg.id }"
            draggable="true"
            @dragstart="onDragStart(msg)"
            @dragend="onDragEnd"
          >
            <div class="card-top">
              <span class="card-name">{{ msg.nombre }}</span>
              <span v-if="col.key === 'nuevos'" class="urgency-dot" :class="urgenciaDot(msg.fecha)" :title="urgenciaLabel(msg.fecha)"></span>
            </div>

            <div class="card-tags">
              <span class="tag tag-tipo">{{ msg.tipoConsulta }}</span>
              <span v-if="msg.propiedad" class="tag tag-prop">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                {{ msg.propiedad }}
              </span>
            </div>

            <div class="card-contact">
              <div class="contact-row">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>{{ msg.email }}</span>
              </div>
              <div class="contact-row">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>{{ msg.telefono }}</span>
              </div>
            </div>

            <p class="card-snippet">"{{ msg.mensaje }}"</p>

            <div class="card-footer">
              <button class="hilo-btn" @click="abrirHilo(msg)">{{ $t('mensajes.verHilo') }}</button>
              <div class="card-actions">
                <a :href="whatsappUrl(msg.telefono)" target="_blank" class="action-btn action-btn-wa" title="Abrir WhatsApp">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a :href="'tel:' + msg.telefono.replace(/\s/g, '')" class="action-btn action-btn-tel" title="Llamar">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </a>
                <span v-if="col.key === 'cerrados'" class="cerrado-icon">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista Lista -->
    <div v-if="activeTab === 'lista'" class="lista-view">
      <div class="lista-table-wrap">
        <table class="lista-table">
          <thead>
            <tr>
              <th>{{ $t('mensajes.tabla.cliente') }}</th>
              <th>{{ $t('mensajes.tabla.propiedad') }}</th>
              <th>{{ $t('mensajes.tabla.tipo') }}</th>
              <th>{{ $t('mensajes.tabla.mensaje') }}</th>
              <th>{{ $t('mensajes.tabla.modalidad') }}</th>
              <th>{{ $t('mensajes.tabla.estado') }}</th>
              <th>{{ $t('mensajes.tabla.acciones') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="msg in mensajesFiltrados" :key="msg.id">
              <td>
                <div class="lista-cliente">
                  <span class="lista-nombre">{{ msg.nombre }}</span>
                  <span class="lista-email">{{ msg.email }}</span>
                </div>
              </td>
              <td>
                <span v-if="msg.propiedad" class="tag tag-prop">{{ msg.propiedad }}</span>
                <span v-else class="text-muted">—</span>
              </td>
              <td><span class="tag tag-tipo">{{ msg.tipoConsulta }}</span></td>
              <td class="lista-snippet">"{{ msg.mensaje.slice(0, 60) }}..."</td>
              <td><span class="tag tag-modalidad">{{ msg.modalidad }}</span></td>
              <td>
                <div class="estado-dd-wrap" ref="ddWraps">
                  <span
                    class="estado-badge"
                    :class="'estado-' + msg.estado"
                    @click="toggleDd(msg.id)"
                  >
                    {{ estadoLabel(msg.estado) }}
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </span>
                  <ul v-if="openDd === msg.id" class="estado-dd">
                    <li
                      v-for="col in columns"
                      :key="col.key"
                      class="estado-dd-opt"
                      :class="'dd-' + col.key"
                      @click="seleccionarEstado(msg, col.key)"
                    >{{ col.label }}</li>
                  </ul>
                </div>
              </td>
              <td>
                <button class="hilo-btn" @click="abrirHilo(msg)">{{ $t('mensajes.verHilo') }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Archivo -->
    <div v-if="activeTab === 'archivo'" class="archivo-view">
      <div class="archivo-empty">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#d1d5db"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
        <p>{{ $t('mensajes.archivo.vacio') }}</p>
      </div>
    </div>

    <!-- Panel lateral hilo -->
    <Transition name="panel">
      <div v-if="hiloAbierto" class="panel-overlay" @click.self="cerrarHilo">
        <div class="hilo-panel">

          <!-- Cabecera panel -->
          <div class="panel-header">
            <div class="panel-header-info">
              <div class="panel-avatar">{{ iniciales(hiloAbierto.nombre) }}</div>
              <div>
                <div class="panel-nombre">{{ hiloAbierto.nombre }}</div>
                <div class="panel-fecha">{{ urgenciaLabel(hiloAbierto.fecha) }}</div>
              </div>
            </div>
            <button class="panel-close" @click="cerrarHilo">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Ficha cliente -->
          <div class="panel-ficha">
            <div class="ficha-row">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span>{{ hiloAbierto.email }}</span>
            </div>
            <div class="ficha-row">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>{{ hiloAbierto.telefono }}</span>
            </div>
            <div class="ficha-tags">
              <span class="tag tag-tipo">{{ hiloAbierto.tipoConsulta }}</span>
              <span v-if="hiloAbierto.propiedad" class="tag tag-prop">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                {{ hiloAbierto.propiedad }}
              </span>
              <span class="tag tag-modalidad">{{ hiloAbierto.modalidad }}</span>
            </div>

            <!-- Cambiar estado -->
            <div class="ficha-estado">
              <span class="ficha-estado-label">{{ $t('mensajes.panel.estado') }}</span>
              <div class="estado-btns">
                <span
                  v-for="col in columns"
                  :key="col.key"
                  role="button"
                  tabindex="0"
                  class="estado-opt"
                  :class="{ active: hiloAbierto.estado === col.key, ['opt-' + col.key]: true }"
                  @click="cambiarEstado(col.key)"
                  @keydown.enter="cambiarEstado(col.key)"
                >{{ col.label }}</span>
              </div>
            </div>
          </div>

          <!-- Hilo de mensajes -->
          <div class="panel-hilo" ref="hiloScroll">
            <div
              v-for="burbuja in hiloAbierto.hilo"
              :key="burbuja.id"
              class="burbuja-wrap"
              :class="{ 'burbuja-agente': burbuja.tipo === 'agente', 'burbuja-nota': burbuja.tipo === 'nota' }"
            >
              <!-- Nota interna -->
              <div v-if="burbuja.tipo === 'nota'" class="burbuja-nota-box">
                <div class="nota-label">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  Nota interna · {{ burbuja.hora }}
                </div>
                <p>{{ burbuja.texto }}</p>
              </div>
              <!-- Burbuja normal -->
              <div v-else class="burbuja" :class="burbuja.tipo === 'agente' ? 'burbuja-out' : 'burbuja-in'">
                <p>{{ burbuja.texto }}</p>
                <span class="burbuja-hora">{{ burbuja.hora }}</span>
              </div>
            </div>
          </div>

          <!-- Responder / Nota -->
          <div class="panel-reply">
            <!-- Tabs respuesta / nota -->
            <div class="reply-tabs">
              <button class="reply-tab" :class="{ active: modoRespuesta === 'respuesta' }" @click="modoRespuesta = 'respuesta'">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                {{ $t('mensajes.panel.responder') }}
              </button>
              <button class="reply-tab" :class="{ active: modoRespuesta === 'nota' }" @click="modoRespuesta = 'nota'">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                {{ $t('mensajes.panel.notaInterna') }}
              </button>
            </div>

            <textarea
              v-model="respuesta"
              class="reply-textarea"
              :class="{ 'textarea-nota': modoRespuesta === 'nota' }"
              :placeholder="modoRespuesta === 'nota' ? $t('mensajes.panel.placeholderNota') : $t('mensajes.panel.placeholderRespuesta')"
              rows="3"
              @keydown.enter.ctrl="enviarRespuesta"
            ></textarea>
            <div class="reply-footer">
              <div class="reply-hint-wrap" v-if="modoRespuesta === 'respuesta'">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>{{ $t('mensajes.panel.enviarEmail') }} <strong>{{ hiloAbierto?.email }}</strong></span>
              </div>
              <div class="reply-hint-wrap nota-hint" v-else>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                <span>{{ $t('mensajes.panel.soloEquipo') }}</span>
              </div>
              <button class="reply-btn" :class="{ 'btn-nota': modoRespuesta === 'nota' }" :disabled="!respuesta.trim()" @click="enviarRespuesta">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                {{ modoRespuesta === 'nota' ? $t('mensajes.panel.guardarNota') : $t('mensajes.panel.enviar') }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { bus } from '@/composables/eventBus.js'
import { useI18n } from 'vue-i18n'
import { mensajeService } from '@/services/mensajeService.js'
import { useSearch } from '@/composables/useSearch.js'

const { t } = useI18n()
const { searchTerm } = useSearch()

const activeTab = ref('tablero')
const hiloAbierto = ref(null)
const respuesta = ref('')
const modoRespuesta = ref('respuesta')
const hiloScroll = ref(null)
const dragId = ref(null)
const dragOverCol = ref(null)
const openDd = ref(null)

const tabs = computed(() => [
  { key: 'tablero', label: t('mensajes.tabs.tablero') },
  { key: 'lista',   label: t('mensajes.tabs.lista')   },
  { key: 'archivo', label: t('mensajes.tabs.archivo') },
])

const columns = computed(() => [
  { key: 'nuevos',      label: t('mensajes.estados.nuevos')      },
  { key: 'en_proceso',  label: t('mensajes.estados.enProceso')   },
  { key: 'respondidos', label: t('mensajes.estados.respondidos') },
  { key: 'cerrados',    label: t('mensajes.estados.cerrados')    },
])

const mensajes = ref([])
const cargando = ref(false)

const mensajesFiltrados = computed(() => {
  const q = searchTerm.value.toLowerCase().trim()
  if (!q) return mensajes.value
  return mensajes.value.filter(m =>
    m.nombre?.toLowerCase().includes(q) ||
    m.email?.toLowerCase().includes(q) ||
    m.propiedad?.toLowerCase().includes(q)
  )
})

async function cargarMensajes() {
  cargando.value = true
  try {
    mensajes.value = await mensajeService.listar()
  } finally {
    cargando.value = false
  }
}

const mensajesPorColumna = (estado) => mensajesFiltrados.value.filter(m => m.estado === estado)

function onDragStart(msg) {
  dragId.value = msg.id
}

function onDragEnd() {
  dragId.value = null
  dragOverCol.value = null
}

async function onDrop(colKey) {
  if (dragId.value === null) return
  const id = dragId.value
  dragId.value = null
  dragOverCol.value = null
  const idx = mensajes.value.findIndex(m => m.id === id)
  if (idx !== -1) mensajes.value[idx].estado = colKey
  await mensajeService.cambiarEstado(id, colKey)
}

function abrirHilo(msg) {
  hiloAbierto.value = msg
  nextTick(() => scrollAbajo())
}

function cerrarHilo() {
  hiloAbierto.value = null
  respuesta.value = ''
  modoRespuesta.value = 'respuesta'
}

async function cambiarEstado(nuevoEstado) {
  const updated = await mensajeService.cambiarEstado(hiloAbierto.value.id, nuevoEstado)
  const idx = mensajes.value.findIndex(m => m.id === updated.id)
  if (idx !== -1) mensajes.value[idx] = updated
  hiloAbierto.value = updated
}

async function enviarRespuesta() {
  if (!respuesta.value.trim()) return
  const tipo = modoRespuesta.value === 'nota' ? 'nota' : 'agente'
  const updated = await mensajeService.responderAgente(hiloAbierto.value.id, respuesta.value.trim(), tipo)
  const idx = mensajes.value.findIndex(m => m.id === updated.id)
  if (idx !== -1) mensajes.value[idx] = updated
  hiloAbierto.value = updated
  respuesta.value = ''
  nextTick(() => scrollAbajo())
}

function scrollAbajo() {
  if (hiloScroll.value) hiloScroll.value.scrollTop = hiloScroll.value.scrollHeight
}

function diasDesde(fecha) {
  const hoy = new Date()
  const d   = new Date(fecha)
  return Math.floor((hoy - d) / (1000 * 60 * 60 * 24))
}

function urgenciaDot(fecha) {
  const dias = diasDesde(fecha)
  if (dias > 3)  return 'dot-rojo'
  if (dias >= 1) return 'dot-amarillo'
  return 'dot-verde'
}

function urgenciaLabel(fecha) {
  const dias = diasDesde(fecha)
  if (dias === 0) return 'Recibido hoy'
  if (dias === 1) return 'Hace 1 día'
  return `Hace ${dias} días`
}

function iniciales(nombre) {
  const p = nombre.trim().split(' ')
  return p.length >= 2 ? p[0][0] + p[1][0] : p[0][0]
}

function toggleDd(id) { openDd.value = openDd.value === id ? null : id }

async function seleccionarEstado(msg, estado) {
  openDd.value = null
  const updated = await mensajeService.cambiarEstado(msg.id, estado)
  const idx = mensajes.value.findIndex(m => m.id === updated.id)
  if (idx !== -1) mensajes.value[idx] = updated
}

function estadoLabel(estado) {
  const keyMap = { nuevos: 'nuevo', en_proceso: 'enProceso', respondidos: 'respondido', cerrados: 'cerrado' }
  const key = keyMap[estado]
  return key ? t('estados.' + key) : estado
}

function onClickOutsideDd(e) {
  const wraps = document.querySelectorAll('.estado-dd-wrap')
  const inside = Array.from(wraps).some(w => w.contains(e.target))
  if (!inside) openDd.value = null
}

onMounted(() => {
  cargarMensajes()
  document.addEventListener('mousedown', onClickOutsideDd)
  bus.on('shortcut:vista-tablero', () => { activeTab.value = 'tablero' })
  bus.on('shortcut:vista-lista',   () => { activeTab.value = 'lista' })
})
onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutsideDd)
  bus.off('shortcut:vista-tablero')
  bus.off('shortcut:vista-lista')
})

function whatsappUrl(telefono) {
  const numero = telefono.replace(/\D/g, '')
  return `https://wa.me/${numero}`
}

</script>

<style scoped>
/* ── Page ──────────────────────────────────────────── */
.mensajes-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  min-height: 0;
}

/* ── Header ────────────────────────────────────────── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-primary);
  margin: 0 0 4px;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 13.5px;
  color: #6b7280;
  margin: 0;
}

.view-tabs {
  display: flex;
  gap: 4px;
  background: #f3f4f6;
  border-radius: 10px;
  padding: 4px;
}

.tab-btn {
  padding: 7px 18px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: #6b7280;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.tab-btn.active {
  background: #ffffff;
  color: #111827;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

/* ── Kanban ────────────────────────────────────────── */
.kanban-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  flex: 1;
  min-height: 0;
  overflow-x: auto;
}

.kanban-col {
  background: #f9fafb;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 220px;
  overflow: hidden;
}

.col-cards {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  padding-right: 4px;
}

.col-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 6px;
  border-bottom: 1px solid #eaecf0;
}

.col-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.col-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #111827;
}

.col-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
}

.badge-nuevos      { background: #dcfce7; color: #16a34a; }
.badge-en_proceso  { background: #fff7ed; color: #ea580c; }
.badge-respondidos { background: #eff6ff; color: #2563eb; }
.badge-cerrados    { background: #f3f4f6; color: #6b7280; }

.col-menu-btn {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
}
.col-menu-btn:hover { background: #e5e7eb; }

/* ── Card ──────────────────────────────────────────── */
.msg-card {
  background: #ffffff;
  border: 1px solid #eaecf0;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: box-shadow 0.15s;
}
.msg-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.07); }
.msg-card[draggable="true"] { cursor: grab; }
.msg-card[draggable="true"]:active { cursor: grabbing; }
.card-cerrado { opacity: 0.7; }
.card-dragging { opacity: 0.4; transform: scale(0.98); }

.col-drag-over {
  border-color: var(--color-primary);
  background: #f0faf8;
  box-shadow: inset 0 0 0 2px var(--color-primary);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-name {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.urgency-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  cursor: default;
}
.dot-verde    { background: #22c55e; }
.dot-amarillo { background: #f59e0b; }
.dot-rojo     { background: #ef4444; }

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  letter-spacing: 0.2px;
}
.tag-tipo     { background: color-mix(in srgb, var(--color-primary) 15%, white); color: var(--color-primary); }
.tag-prop     { background: #eff6ff; color: #2563eb; }
.tag-modalidad{ background: #faf5ff; color: #7c3aed; }

.card-contact { display: flex; flex-direction: column; gap: 3px; }

.contact-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
}
.contact-row svg { flex-shrink: 0; color: #9ca3af; }

.card-snippet {
  font-size: 12px;
  color: #6b7280;
  font-style: italic;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
  border-top: 1px solid #f3f4f6;
}

.hilo-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.hilo-btn:hover { color: color-mix(in srgb, var(--color-primary) 70%, black); }

.card-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn {
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.action-btn:hover { background: color-mix(in srgb, var(--color-primary) 15%, white); color: var(--color-primary); }
.action-btn-wa:hover  { background: #dcfce7; color: #16a34a; }
.action-btn-tel:hover { background: #eff6ff; color: #2563eb; }

.cerrado-icon {
  display: flex;
  align-items: center;
  color: #9ca3af;
  padding: 0 4px;
}

/* ── Lista ─────────────────────────────────────────── */
.lista-view {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.lista-table-wrap {
  flex: 1;
  min-height: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  overflow: auto;
}

.lista-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.lista-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #9ca3af;
  border-bottom: 1px solid #eaecf0;
  white-space: nowrap;
}

.lista-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  vertical-align: middle;
}

.lista-table tr:last-child td { border-bottom: none; }
.lista-table tbody tr:hover td { background: #f9fafb; }

.lista-cliente { display: flex; flex-direction: column; gap: 2px; }
.lista-nombre  { font-weight: 600; color: #111827; }
.lista-email   { font-size: 12px; color: #9ca3af; }
.lista-snippet { color: #6b7280; font-style: italic; max-width: 260px; }
.text-muted    { color: #d1d5db; }

.estado-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}
.estado-nuevos      { background: #dcfce7; color: #16a34a; }
.estado-en_proceso  { background: #fff7ed; color: #ea580c; }
.estado-respondidos { background: #eff6ff; color: #2563eb; }
.estado-cerrados    { background: #f3f4f6; color: #6b7280; }

.estado-badge {
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.estado-dd-wrap {
  position: relative;
  display: inline-block;
}

.estado-dd {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  z-index: 50;
  list-style: none;
  padding: 4px;
  min-width: 130px;
}

.estado-dd-opt {
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  color: #374151;
}

.estado-dd-opt.dd-nuevos:hover      { background: #dcfce7; color: #16a34a; }
.estado-dd-opt.dd-en_proceso:hover  { background: #fff7ed; color: #ea580c; }
.estado-dd-opt.dd-respondidos:hover { background: #eff6ff; color: #2563eb; }
.estado-dd-opt.dd-cerrados:hover    { background: #f3f4f6; color: #6b7280; }


/* ── Archivo ───────────────────────────────────────── */
.archivo-view {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.archivo-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #9ca3af;
  font-size: 14px;
}

/* ── Panel overlay ─────────────────────────────────── */
.panel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}

.hilo-panel {
  width: 420px;
  max-width: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: -4px 0 24px rgba(0,0,0,0.12);
}

/* ── Panel header ──────────────────────────────────── */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #eaecf0;
  flex-shrink: 0;
}

.panel-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.panel-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
}

.panel-nombre {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
}

.panel-fecha {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 1px;
}

.panel-close {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.panel-close:hover { background: #f3f4f6; color: #374151; }

/* ── Panel ficha ───────────────────────────────────── */
.panel-ficha {
  padding: 16px 20px;
  border-bottom: 1px solid #eaecf0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.ficha-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
}
.ficha-row svg { color: #9ca3af; flex-shrink: 0; }

.ficha-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding-top: 2px;
}

.ficha-estado {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 4px;
}

.ficha-estado-label {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 600;
  white-space: nowrap;
}

.estado-btns {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.estado-opt {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  border: 1.5px solid transparent;
  cursor: pointer;
  background: #f3f4f6;
  color: #6b7280;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  outline: none !important;
  -webkit-appearance: none;
  appearance: none;
  box-shadow: none;
}
.estado-opt.opt-nuevos:hover      { background: #16a34a; color: #ffffff; border-color: #16a34a; }
.estado-opt.opt-en_proceso:hover  { background: #ea580c; color: #ffffff; border-color: #ea580c; }
.estado-opt.opt-respondidos:hover { background: #2563eb; color: #ffffff; border-color: #2563eb; }
.estado-opt.opt-cerrados:hover    { background: #6b7280; color: #ffffff; border-color: #6b7280; }
.estado-opt.active.opt-nuevos      { background: #dcfce7; color: #16a34a; border-color: #16a34a; }
.estado-opt.active.opt-en_proceso  { background: #fff7ed; color: #ea580c; border-color: #ea580c; }
.estado-opt.active.opt-respondidos { background: #eff6ff; color: #2563eb; border-color: #2563eb; }
.estado-opt.active.opt-cerrados    { background: #f3f4f6; color: #6b7280; border-color: #9ca3af; }

/* ── Hilo mensajes ─────────────────────────────────── */
.panel-hilo {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.burbuja-wrap {
  display: flex;
}
.burbuja-wrap.burbuja-agente { justify-content: flex-end; }

.burbuja {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13.5px;
  line-height: 1.5;
}

.burbuja p { margin: 0 0 4px; }

.burbuja-hora {
  font-size: 10.5px;
  color: rgba(0,0,0,0.35);
  display: block;
  text-align: right;
}

.burbuja-in {
  background: #f3f4f6;
  color: #374151;
  border-bottom-left-radius: 4px;
}

.burbuja-out {
  background: var(--color-primary);
  color: #ffffff;
  border-bottom-right-radius: 4px;
}
.burbuja-out .burbuja-hora { color: rgba(255,255,255,0.6); }

/* ── Nota interna ──────────────────────────────────── */
.burbuja-nota { justify-content: center; }

.burbuja-nota-box {
  background: #fefce8;
  border: 1px dashed #fbbf24;
  border-radius: 8px;
  padding: 10px 14px;
  width: 100%;
  font-size: 13px;
  color: #92400e;
  line-height: 1.5;
}

.burbuja-nota-box p { margin: 4px 0 0; }

.nota-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #b45309;
  margin-bottom: 2px;
}

/* ── Reply ─────────────────────────────────────────── */
.panel-reply {
  padding: 16px 20px;
  border-top: 1px solid #eaecf0;
  flex-shrink: 0;
}

.reply-textarea {
  width: 100%;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13.5px;
  color: #374151;
  background: #f9fafb;
  resize: none;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.reply-textarea:focus { border-color: var(--color-primary); background: #fff; }
.reply-textarea::placeholder { color: #9ca3af; }
.textarea-nota { border-color: #fbbf24; background: #fefce8; }
.textarea-nota:focus { border-color: #f59e0b; background: #fefce8; }

/* ── Reply tabs ────────────────────────────────────── */
.reply-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
}

.reply-tab {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border: 1px solid #eaecf0;
  border-radius: 6px;
  background: #f9fafb;
  color: #6b7280;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.reply-tab:hover { background: #f3f4f6; }
.reply-tab.active { background: #fff; border-color: var(--color-primary); color: var(--color-primary); font-weight: 600; }
.reply-tab.active:last-child { border-color: #f59e0b; color: #b45309; }

.reply-footer {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
}

.reply-hint-wrap {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 11.5px;
  color: #9ca3af;
  line-height: 1.5;
  flex: 1;
}
.reply-hint-wrap svg { flex-shrink: 0; margin-top: 1px; }
.reply-hint-wrap strong { color: #6b7280; font-weight: 600; }

.reply-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.reply-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--color-primary) 70%, black); }
.reply-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.btn-nota { background: #f59e0b; }
.btn-nota:hover:not(:disabled) { background: #d97706; }

.nota-hint { color: #b45309; }
.nota-hint svg { color: #f59e0b; }

/* ── Transition panel ──────────────────────────────── */
.panel-enter-active, .panel-leave-active {
  transition: opacity 0.2s ease;
}
.panel-enter-active .hilo-panel, .panel-leave-active .hilo-panel {
  transition: transform 0.25s ease;
}
.panel-enter-from, .panel-leave-to { opacity: 0; }
.panel-enter-from .hilo-panel, .panel-leave-to .hilo-panel {
  transform: translateX(100%);
}

/* ── Responsive ────────────────────────────────────── */
@media (max-width: 1024px) {
  .kanban-board { grid-template-columns: repeat(2, 1fr); }
  .hilo-panel   { width: 100%; }
}

@media (max-width: 640px) {
  .kanban-board { grid-template-columns: 1fr; }
  .page-header  { flex-direction: column; align-items: center; text-align: center; }
  .view-tabs    { justify-content: center; }
}
</style>

<style>
html.dark .mensajes-page .kanban-col       { background: #161d2e; }
html.dark .mensajes-page .msg-card,
html.dark .mensajes-page .lista-table-wrap,
html.dark .mensajes-page .hilo-panel       { background: #1e2333; border-color: #2d3348; }
html.dark .mensajes-page .estado-dd        { background: #1e2333; border-color: #2d3348; }
html.dark .mensajes-page .estado-dd-opt    { color: #e2e8f0; }
html.dark .mensajes-page .reply-textarea   { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .mensajes-page .page-subtitle    { color: #94a3b8; }
html.dark .mensajes-page .view-tabs        { background: #161d2e; }
html.dark .mensajes-page .tab-btn          { color: #94a3b8; }
html.dark .mensajes-page .tab-btn.active   { background: var(--color-primary); color: #fff; box-shadow: none; }
html.dark .mensajes-page .col-title        { color: #e2e8f0; }
html.dark .mensajes-page .col-menu-btn     { color: #64748b; }
html.dark .mensajes-page .col-menu-btn:hover { background: #2d3348; }
html.dark .mensajes-page .card-name        { color: #e2e8f0; }
html.dark .mensajes-page .card-snippet     { color: #94a3b8; }
html.dark .mensajes-page .contact-row      { color: #94a3b8; }
html.dark .mensajes-page .contact-row svg  { color: #64748b; }
html.dark .mensajes-page .lista-nombre     { color: #e2e8f0; }
html.dark .mensajes-page .lista-email      { color: #64748b; }
html.dark .mensajes-page .lista-snippet    { color: #94a3b8; }
html.dark .mensajes-page .lista-table th   { color: #64748b; border-bottom-color: #2d3348; }
html.dark .mensajes-page .lista-table td   { color: #94a3b8; border-bottom-color: #2d3348; }
html.dark .mensajes-page .panel-nombre     { color: #e2e8f0; }
html.dark .mensajes-page .panel-fecha      { color: #64748b; }
html.dark .mensajes-page .panel-close      { color: #64748b; }
html.dark .mensajes-page .ficha-row        { color: #94a3b8; }
html.dark .mensajes-page .ficha-row svg    { color: #64748b; }
html.dark .mensajes-page .ficha-estado-label { color: #64748b; }
html.dark .mensajes-page .estado-opt       { color: #94a3b8; }
html.dark .mensajes-page .burbuja-in       { background: #2d3348; color: #e2e8f0; }
html.dark .mensajes-page .reply-hint-wrap  { color: #64748b; }
html.dark .mensajes-page .reply-hint-wrap strong { color: #94a3b8; }
</style>
