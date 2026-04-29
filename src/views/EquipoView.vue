<template>
  <div class="equipo-page">

    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('equipo.title') }}</h1>
        <p class="page-subtitle">{{ $t('equipo.subtitle') }}</p>
      </div>
      <button class="nuevo-btn" @click="abrirModalCrear">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        {{ $t('equipo.nuevoAgente') }}
      </button>
    </div>

    <!-- Tabla -->
    <div class="tabla-wrap">
      <div v-if="cargando" class="estado-vacio">
        <p style="color:#9ca3af;font-size:14px;">Cargando...</p>
      </div>
      <table v-else class="tabla">
        <thead>
          <tr>
            <th>{{ $t('equipo.tabla.agente') }}</th>
            <th>{{ $t('equipo.tabla.email') }}</th>
            <th>{{ $t('equipo.tabla.rol') }}</th>
            <th>{{ $t('equipo.tabla.acciones') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agente in agentes" :key="agente.id">
            <td>
              <div class="agente-cell">
                <div class="agente-avatar">
                  <img v-if="agente.avatarUrl" :src="agente.avatarUrl" class="avatar-img" />
                  <span v-else>{{ iniciales(agente.nombre) }}</span>
                </div>
                <span class="agente-nombre">{{ agente.nombre }}</span>
              </div>
            </td>
            <td class="agente-email">{{ agente.email }}</td>
            <td><span class="rol-badge">Agente</span></td>
            <td>
              <button class="accion-btn accion-eliminar" @click="confirmarEliminar(agente)">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </td>
          </tr>
          <tr v-if="!cargando && agentes.length === 0">
            <td colspan="4" class="vacio-td">{{ $t('equipo.sinAgentes') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog: nuevo agente -->
    <dialog ref="dialogCrear" class="eq-dialog" @click.self="cerrarModal" @close="error = ''">
      <div class="eq-modal">
        <div class="eq-modal-header">
          <h2 class="eq-modal-title">{{ $t('equipo.modal.tituloCrear') }}</h2>
          <button class="eq-modal-close" @click="cerrarModal">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="eq-modal-body">
          <div class="eq-campo">
            <label>{{ $t('equipo.modal.nombre') }}</label>
            <input v-model="form.nombre" type="text" :placeholder="$t('equipo.modal.nombrePh')" />
          </div>
          <div class="eq-campo">
            <label>{{ $t('equipo.modal.email') }}</label>
            <input v-model="form.email" type="email" :placeholder="$t('equipo.modal.emailPh')" />
          </div>
          <div class="eq-campo">
            <label>{{ $t('equipo.modal.password') }}</label>
            <input v-model="form.password" type="password" :placeholder="$t('equipo.modal.passwordPh')" />
          </div>
          <p v-if="error" class="eq-error">{{ error }}</p>
        </div>
        <div class="eq-modal-footer">
          <button class="eq-btn-cancelar" @click="cerrarModal">{{ $t('equipo.modal.cancelar') }}</button>
          <button class="eq-btn-guardar" :disabled="!formValido || guardando" @click="guardar">
            {{ guardando ? $t('equipo.modal.guardando') : $t('equipo.modal.guardar') }}
          </button>
        </div>
      </div>
    </dialog>

    <!-- Dialog: confirmar eliminar -->
    <dialog ref="dialogEliminar" class="eq-dialog" @click.self="cerrarDialogEliminar" @close="agenteAEliminar = null">
      <div class="eq-modal eq-modal-sm">
        <div class="eq-modal-header">
          <h2 class="eq-modal-title">{{ $t('equipo.confirmar.titulo') }}</h2>
          <button class="eq-modal-close" @click="cerrarDialogEliminar">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="eq-modal-body">
          <p class="eq-confirmar-texto">{{ $t('equipo.confirmar.texto', { nombre: agenteAEliminar?.nombre ?? '' }) }}</p>
        </div>
        <div class="eq-modal-footer">
          <button class="eq-btn-cancelar" @click="cerrarDialogEliminar">{{ $t('equipo.modal.cancelar') }}</button>
          <button class="eq-btn-eliminar" :disabled="eliminando" @click="eliminar">
            {{ eliminando ? $t('equipo.confirmar.eliminando') : $t('equipo.confirmar.confirmar') }}
          </button>
        </div>
      </div>
    </dialog>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { agenteService } from '@/services/agenteService.js'

const agentes  = ref([])
const cargando = ref(false)

const dialogCrear    = ref(null)
const dialogEliminar = ref(null)

const guardando = ref(false)
const error     = ref('')
const form      = ref({ nombre: '', email: '', password: '' })

const agenteAEliminar = ref(null)
const eliminando      = ref(false)

const formValido = computed(() =>
  !!(form.value.nombre.trim() && form.value.email.trim() && form.value.password.trim())
)

async function cargar() {
  cargando.value = true
  try {
    const res = await agenteService.listar()
    agentes.value = Array.isArray(res) ? res : []
  } catch {
    agentes.value = []
  } finally {
    cargando.value = false
  }
}

function iniciales(nombre) {
  const p = (nombre || '').trim().split(' ')
  return p.length >= 2 ? p[0][0] + p[1][0] : (p[0][0] || '?')
}

function abrirModalCrear() {
  form.value  = { nombre: '', email: '', password: '' }
  error.value = ''
  dialogCrear.value.showModal()
}

function cerrarModal() {
  dialogCrear.value?.close()
}

function confirmarEliminar(agente) {
  agenteAEliminar.value = agente
  dialogEliminar.value.showModal()
}

function cerrarDialogEliminar() {
  agenteAEliminar.value = null
  dialogEliminar.value?.close()
}

async function guardar() {
  error.value     = ''
  guardando.value = true
  try {
    const res = await agenteService.crear({ nombre: form.value.nombre, email: form.value.email, password: form.value.password })
    if (res.error) { error.value = res.error; return }
    agentes.value.push(res)
    cerrarModal()
  } catch {
    error.value = 'Error al crear el agente'
  } finally {
    guardando.value = false
  }
}

async function eliminar() {
  eliminando.value = true
  try {
    await agenteService.eliminar(agenteAEliminar.value.id)
    agentes.value = agentes.value.filter(a => a.id !== agenteAEliminar.value.id)
    cerrarDialogEliminar()
  } finally {
    eliminando.value = false
  }
}

onMounted(cargar)
</script>

<style scoped>
.equipo-page { display: flex; flex-direction: column; gap: 24px; }

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

.page-subtitle { font-size: 13.5px; color: #6b7280; margin: 0; }

.nuevo-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.nuevo-btn:hover { background: color-mix(in srgb, var(--color-primary) 70%, black); }

.tabla-wrap {
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  overflow: hidden;
}

.tabla { width: 100%; border-collapse: collapse; font-size: 13.5px; }

.tabla th {
  text-align: left;
  padding: 12px 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #9ca3af;
  border-bottom: 1px solid #eaecf0;
}

.tabla td {
  padding: 14px 20px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  vertical-align: middle;
}

.tabla tbody tr:last-child td { border-bottom: none; }
.tabla tbody tr:hover td { background: #f9fafb; }

.agente-cell { display: flex; align-items: center; gap: 12px; }

.agente-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
}

.avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.agente-nombre { font-weight: 600; color: #111827; }
.agente-email  { color: #6b7280; font-size: 13px; }

.rol-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: color-mix(in srgb, var(--color-primary) 15%, white);
  color: var(--color-primary);
}

.accion-btn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.accion-eliminar { background: #f3f4f6; color: #6b7280; }
.accion-eliminar:hover { background: #fef2f2; color: #ef4444; }

.vacio-td { text-align: center; color: #9ca3af; font-size: 14px; padding: 40px !important; }
.estado-vacio { display: flex; justify-content: center; padding: 40px; }
</style>

<style>
/* ── Dialog modales Equipo ── */
dialog.eq-dialog {
  border: none;
  padding: 0;
  background: transparent;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
}

dialog.eq-dialog[open] {
  display: flex;
  align-items: center;
  justify-content: center;
}

dialog.eq-dialog::backdrop {
  background: rgba(0, 0, 0, 0.45);
}

.eq-modal {
  background: #fff;
  border-radius: 14px;
  width: calc(100% - 32px);
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
}

.eq-modal-sm { max-width: 380px; }

.eq-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #eaecf0;
}

.eq-modal-title { font-size: 16px; font-weight: 700; color: #111827; margin: 0; }

.eq-modal-close {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
}
.eq-modal-close:hover { background: #f3f4f6; color: #374151; }

.eq-modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

.eq-campo { display: flex; flex-direction: column; gap: 6px; }

.eq-campo label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
}

.eq-campo input {
  padding: 10px 14px;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: #f9fafb;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;
}
.eq-campo input:focus { border-color: var(--color-primary); background: #fff; }
.eq-campo input::placeholder { color: #9ca3af; }

.eq-error {
  font-size: 13px;
  color: #ef4444;
  margin: 0;
  padding: 10px 14px;
  background: #fef2f2;
  border-radius: 8px;
}

.eq-confirmar-texto { font-size: 14px; color: #374151; margin: 0; line-height: 1.6; }

.eq-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid #eaecf0;
}

.eq-btn-cancelar {
  padding: 9px 20px;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  background: #fff;
  color: #6b7280;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
}
.eq-btn-cancelar:hover { background: #f3f4f6; }

.eq-btn-guardar {
  padding: 9px 20px;
  border: none;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
}
.eq-btn-guardar:hover:not(:disabled) { background: color-mix(in srgb, var(--color-primary) 70%, black); }
.eq-btn-guardar:disabled { opacity: 0.45; cursor: not-allowed; }

.eq-btn-eliminar {
  padding: 9px 20px;
  border: none;
  border-radius: 8px;
  background: #ef4444;
  color: #fff;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
}
.eq-btn-eliminar:hover:not(:disabled) { background: #dc2626; }
.eq-btn-eliminar:disabled { opacity: 0.45; cursor: not-allowed; }

html.dark .eq-modal        { background: #1e2333; }
html.dark .eq-modal-header { border-bottom-color: #2d3348; }
html.dark .eq-modal-footer { border-top-color: #2d3348; }
html.dark .eq-modal-title  { color: #e2e8f0; }
html.dark .eq-campo input  { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .equipo-page .tabla-wrap { background: #1e2333; border-color: #2d3348; }
html.dark .equipo-page .tabla th   { color: #64748b; border-bottom-color: #2d3348; }
html.dark .equipo-page .tabla td   { color: #94a3b8; border-bottom-color: #2d3348; }
html.dark .equipo-page .tabla tbody tr:hover td { background: #2d3348; }
html.dark .equipo-page .agente-nombre  { color: #e2e8f0; }
html.dark .equipo-page .page-subtitle { color: #94a3b8; }
</style>
