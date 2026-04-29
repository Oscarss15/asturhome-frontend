<template>
  <div class="config-page">

    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('configuracion.title') }}</h1>
        <p class="page-subtitle">{{ $t('configuracion.subtitle') }}</p>
      </div>
    </div>

    <div class="config-layout">

      <!-- Columna izquierda -->
      <div class="config-left">

        <!-- Perfil -->
        <div class="config-card">
          <div class="card-header">
            <div class="card-title-row">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              <h2>{{ $t('configuracion.perfil.title') }}</h2>
            </div>
            <button class="btn-primary" @click="guardarPerfil">{{ $t('configuracion.perfil.guardar') }}</button>
          </div>

          <!-- Toast -->
          <transition name="toast">
            <div v-if="toast.visible" :class="['toast', 'toast--' + toast.tipo]">
              <svg v-if="toast.tipo === 'ok'" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>
              <svg v-else width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ toast.msg }}
            </div>
          </transition>

          <div class="perfil-body">
            <label class="avatar-upload" @click="triggerFile">
              <img v-if="avatarPreview" :src="avatarPreview" class="avatar-img" />
              <div v-else class="avatar-placeholder">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </div>
              <div class="avatar-overlay">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <input ref="fileInput" type="file" accept="image/*" class="hidden-input" @change="onAvatarChange" />
            </label>

            <div class="perfil-fields">
              <div class="field-group field-group--full">
                <label>{{ $t('configuracion.perfil.nombre') }}</label>
                <input v-model="perfil.nombre" type="text" placeholder="Tu nombre completo" />
              </div>
              <div class="field-group">
                <label>{{ $t('configuracion.perfil.idioma') }}</label>
                <CustomSelect v-model="perfil.idioma" :options="[
                  { value: 'es', label: 'Español' },
                  { value: 'en', label: 'English' }
                ]" />
              </div>
              <div class="field-group">
                <label>{{ $t('configuracion.perfil.contrasena') }}</label>
                <button class="btn-password" @click="showModalPassword = true">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  {{ $t('configuracion.perfil.cambiarContrasena') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal cambiar contraseña -->
        <Teleport to="body">
          <div v-if="showModalPassword" class="modal-overlay" @click.self="cerrarModalPassword">
            <div class="modal-pass">
              <div class="modal-pass-header">
                <h3>{{ $t('configuracion.perfil.modal.title') }}</h3>
                <button class="modal-close" @click="cerrarModalPassword">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <div class="modal-pass-body">
                <div class="field-group">
                  <label>{{ $t('configuracion.perfil.modal.actual') }}</label>
                  <input v-model="perfil.passwordActual" type="password" placeholder="••••••••" autocomplete="current-password" />
                </div>
                <div class="field-group">
                  <label>{{ $t('configuracion.perfil.modal.nueva') }}</label>
                  <input v-model="perfil.password" type="password" placeholder="••••••••" autocomplete="new-password" />
                </div>
                <div class="field-group">
                  <label>{{ $t('configuracion.perfil.modal.confirmar') }}</label>
                  <input v-model="perfil.passwordConfirm" type="password" placeholder="••••••••" autocomplete="new-password" />
                </div>
              </div>
              <div class="modal-pass-footer">
                <button class="btn-outline-sm" @click="cerrarModalPassword">{{ $t('configuracion.perfil.modal.cancelar') }}</button>
                <button class="btn-primary" @click="guardarPassword" :disabled="guardandoPassword">
                  {{ guardandoPassword ? $t('configuracion.perfil.modal.guardando') : $t('configuracion.perfil.modal.guardar') }}
                </button>
              </div>
            </div>
          </div>
        </Teleport>

        <!-- Apariencia -->
        <div class="config-card">
          <div class="card-title-row">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4 10 10c0 2.2-1.8 4-4 4h-2c-1.1 0-2 .9-2 2 0 .4.1.8.3 1.1.4.4.7.9.7 1.4 0 .8-1.4 1.5-3 1.5z"/><circle cx="7.5" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="8.5" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="9" r="1" fill="currentColor" stroke="none"/></svg>
            <h2>{{ $t('configuracion.apariencia.title') }}</h2>
          </div>

          <div class="apariencia-grid">
            <div class="apariencia-item">
              <span class="apariencia-label">{{ $t('configuracion.apariencia.tema') }}</span>
              <div class="tema-btns">
                <button :class="['tema-btn', { active: tema === 'claro' }]" @click="tema = 'claro'">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
                  {{ $t('configuracion.apariencia.claro') }}
                </button>
                <button :class="['tema-btn', { active: tema === 'oscuro' }]" @click="tema = 'oscuro'">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  {{ $t('configuracion.apariencia.oscuro') }}
                </button>
              </div>
            </div>

            <div class="apariencia-item">
              <span class="apariencia-label">{{ $t('configuracion.apariencia.colorAcento') }}</span>
              <div class="color-swatches">
                <button v-for="c in colores" :key="c.value"
                  :class="['swatch', { active: colorAcento === c.value }]"
                  :style="{ background: c.value }"
                  @click="colorAcento = c.value"
                ></button>
                <label
                  :class="['swatch', 'swatch-custom', { active: !colores.some(c => c.value === colorAcento) }]"
                  :style="{ background: !colores.some(c => c.value === colorAcento) ? colorAcento : '#e5e7eb' }"
                  title="Color personalizado"
                >
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  <input type="color" v-model="colorAcento" />
                </label>
              </div>
            </div>

            <div class="apariencia-item">
              <span class="apariencia-label">{{ $t('configuracion.apariencia.fuente') }}</span>
              <CustomSelect v-model="fuente" :options="[
                { value: 'small',  label: $t('configuracion.apariencia.fuentePequeno') },
                { value: 'medium', label: $t('configuracion.apariencia.fuenteMediano') },
                { value: 'large',  label: $t('configuracion.apariencia.fuenteGrande') }
              ]" />
            </div>

            <div class="apariencia-item">
              <span class="apariencia-label">Tipografía</span>
              <div class="tema-btns">
                <button :class="['tema-btn', 'tipografia-btn', { active: tipografia === 'inter' }]" @click="tipografia = 'inter'" style="font-family: Inter, sans-serif">Inter</button>
                <button :class="['tema-btn', 'tipografia-btn', { active: tipografia === 'playfair' }]" @click="tipografia = 'playfair'" style="font-family: 'Playfair Display', serif">Playfair</button>
                <button :class="['tema-btn', 'tipografia-btn', { active: tipografia === 'merriweather' }]" @click="tipografia = 'merriweather'" style="font-family: Merriweather, serif">Merriweather</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Preferencias -->
        <div class="config-card">
          <div class="card-title-row">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
            <h2>{{ $t('configuracion.preferencias.title') }}</h2>
          </div>

          <div class="prefs-grid">

            <!-- Fila 1: Precio + Página inicio -->
            <div class="pref-item">
              <div>
                <span class="pref-name">Formato de precio</span>
                <span class="pref-desc">Cómo se muestran los importes en la app</span>
              </div>
              <div style="width: 160px; flex-shrink: 0;">
                <CustomSelect
                  :model-value="formatoPrecio"
                  @update:model-value="setFormato"
                  :options="[
                    { value: 'EUR',     label: '1.250.000 €' },
                    { value: 'USD',     label: '$1,250,000' },
                    { value: 'EUR_DEC', label: '1.250.000,00 €' },
                  ]"
                />
              </div>
            </div>
            <div class="pref-item">
              <div>
                <span class="pref-name pref-label-sm">{{ $t('configuracion.preferencias.paginaInicio') }}</span>
              </div>
              <div style="width: 130px; flex-shrink: 0;">
                <CustomSelect v-model="prefs.paginaInicio" :options="[
                  { value: 'dashboard',    label: 'Dashboard' },
                  { value: 'propiedades',  label: 'Propiedades' },
                  { value: 'estadisticas', label: 'Estadísticas' },
                  { value: 'mensajes',     label: 'Mensajes' }
                ]" />
              </div>
            </div>

            <!-- Fila 2: Atajos + Sonido -->
            <div class="pref-item">
              <div>
                <span class="pref-name">{{ $t('configuracion.preferencias.atajos') }}</span>
                <span class="pref-desc">{{ $t('configuracion.preferencias.atajosDesc') }}</span>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="prefs.atajos" />
                <span class="toggle-track"></span>
              </label>
            </div>
            <div class="pref-item">
              <div>
                <span class="pref-name">{{ $t('configuracion.preferencias.sonido') }}</span>
                <span class="pref-desc">{{ $t('configuracion.preferencias.sonidoDesc') }}</span>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="prefs.sonido" />
                <span class="toggle-track"></span>
              </label>
            </div>

            <!-- Fila 3: Selector de sonido (centrado, solo si activo) -->
            <div v-if="prefs.sonido" class="pref-item--full sonido-selector">
              <div class="sonido-btns">
                <button v-for="s in sonidos" :key="s.value"
                  :class="['sonido-btn', { active: prefs.sonidoTipo === s.value }]"
                  @click="seleccionarSonido(s.value)">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  {{ s.label }}
                </button>

                <!-- Sonido grabado -->
                <button v-if="tieneCustom"
                  :class="['sonido-btn', { active: prefs.sonidoTipo === 'custom' }]"
                  @click="seleccionarSonido('custom')">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  Mi sonido
                </button>

                <!-- Separador -->
                <div class="sonido-sep"></div>

                <!-- Grabando -->
                <button v-if="grabando" class="sonido-btn sonido-btn--grabando" @click="pararGrabacion">
                  <span class="rec-dot"></span>
                  {{ tiempoGrabacion }}s — Parar
                </button>

                <!-- Botón grabar / regrabar -->
                <button v-else class="sonido-btn sonido-btn--rec" @click="iniciarGrabacion">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  {{ tieneCustom ? 'Regrabar' : 'Grabar' }}
                </button>

                <!-- Borrar grabación -->
                <button v-if="tieneCustom && !grabando" class="sonido-btn sonido-btn--del" @click="borrarCustom">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Frase del Día -->
        <div class="config-card card-frases">
          <div class="card-title-row">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <h2>{{ $t('configuracion.fraseDia.title') }}</h2>
            <button v-if="hasCustomFrases" class="btn-reset-frases" @click="resetFrases">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              {{ $t('configuracion.atajos.restaurar') }}
            </button>
          </div>
          <p class="frases-hint">{{ $t('configuracion.fraseDia.hint') }}</p>
          <div class="frases-list">
            <div
              v-for="(_, i) in frasesEdit"
              :key="i"
              class="frase-row"
              :class="{ 'frase-row--hoy': i === diaHoy }"
            >
              <span class="frase-dia">{{ $t(`configuracion.fraseDia.dias[${i}]`) }}</span>
              <input
                class="frase-input"
                type="text"
                v-model="frasesEdit[i]"
                @input="saveFrases"
                :placeholder="DEFAULT_FRASES[i]"
              />
            </div>
          </div>
        </div>

      </div>

      <!-- Columna derecha -->
      <div class="config-right">

        <!-- Atajos rápidos -->
        <div class="config-card card-dark card-atajos">
          <div class="card-title-row card-title-row--light">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M6 16h6"/></svg>
            <h2>{{ $t('configuracion.atajos.title') }}</h2>
            <button v-if="hasCustomShortcuts" class="btn-reset-atajos" @click="resetShortcuts" :title="$t('configuracion.atajos.restaurar')">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              {{ $t('configuracion.atajos.restaurar') }}
            </button>
          </div>
          <p class="atajos-hint">{{ $t('configuracion.atajos.hint') }}</p>
          <div class="atajos-list">
            <div
              class="atajo-item"
              :class="{ 'atajo-item--editing': editingAtajoId === atajo.id }"
              v-for="atajo in atajos"
              :key="atajo.id"
              @click="startEditing(atajo.id)"
            >
              <span class="atajo-label">{{ atajo.label }}</span>
              <span v-if="editingAtajoId === atajo.id" class="atajo-listening">
                {{ duplicateWarning ? $t('configuracion.atajos.teclaEnUso') : $t('configuracion.atajos.pulsaTecla') }}
              </span>
              <div v-else class="atajo-keys">
                <kbd>Alt</kbd>
                <kbd :class="{ 'kbd-custom': atajo.key !== DEFAULT_SHORTCUTS[atajo.id] }">{{ atajo.key.toUpperCase() }}</kbd>
                <svg class="atajo-edit-icon" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { API_URL } from '@/config.js'
import { bus } from '@/composables/eventBus.js'
import { useI18n } from 'vue-i18n'
import CustomSelect from '@/components/CustomSelect.vue'
import { useFormatoPrecio } from '@/composables/useFormatoPrecio.js'
import { useSound } from '@/composables/useSound.js'
import { DEFAULT_SHORTCUTS } from '@/composables/useKeyboardShortcuts.js'
import { DEFAULT_FRASES, loadFrases } from '@/composables/useFraseDiaria.js'

const { formatoPrecio, setFormato } = useFormatoPrecio()

const { t, locale } = useI18n()

// Toast
const toast = ref({ visible: false, msg: '', tipo: 'ok' })
function showToast(msg, tipo = 'ok') {
  toast.value = { visible: true, msg, tipo }
  setTimeout(() => toast.value.visible = false, 3000)
}

// Perfil
const fileInput    = ref(null)
const avatarPreview = ref(localStorage.getItem('avatarPreview') || '')
const perfil = ref({
  nombre:          localStorage.getItem('userName')   || '',
  idioma:          localStorage.getItem('userIdioma') || 'es',
  passwordActual:  '',
  password:        '',
  passwordConfirm: '',
})

const showModalPassword  = ref(false)
const guardandoPassword  = ref(false)

function cerrarModalPassword() {
  perfil.value.passwordActual  = ''
  perfil.value.password        = ''
  perfil.value.passwordConfirm = ''
  showModalPassword.value = false
}

async function guardarPassword() {
  if (!perfil.value.passwordActual) {
    showToast(t('configuracion.perfil.modal.sinActual'), 'error'); return
  }
  if (!perfil.value.password) {
    showToast(t('configuracion.perfil.modal.sinNueva'), 'error'); return
  }
  if (perfil.value.password !== perfil.value.passwordConfirm) {
    showToast(t('configuracion.perfil.modal.noCoinciden'), 'error'); return
  }
  guardandoPassword.value = true
  try {
    const res = await fetch(`${API_URL}/api/auth/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        passwordActual: perfil.value.passwordActual,
        passwordNueva:  perfil.value.password,
      }),
    })
    if (!res.ok) {
      const data = await res.json()
      showToast(data.error || t('configuracion.perfil.modal.errorConexion'), 'error')
      return
    }
    cerrarModalPassword()
    showToast(t('configuracion.perfil.modal.ok'))
  } catch {
    showToast(t('configuracion.perfil.modal.errorConexion'), 'error')
  } finally {
    guardandoPassword.value = false
  }
}

function triggerFile() { fileInput.value?.click() }
async function onAvatarChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  try {
    const res = await fetch(`${API_URL}/api/users/avatar`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    })
    const data = await res.json()
    avatarPreview.value = data.avatarUrl
    localStorage.setItem('avatarPreview', data.avatarUrl)
  } catch {
    showToast('Error al subir la imagen', 'error')
  }
}

function guardarPerfil() {
  if (perfil.value.password && perfil.value.password !== perfil.value.passwordConfirm) {
    showToast(t('configuracion.perfil.modal.noCoinciden'), 'error')
    return
  }
  locale.value = perfil.value.idioma
  localStorage.setItem('userName',   perfil.value.nombre)
  localStorage.setItem('userIdioma', perfil.value.idioma)
  perfil.value.password        = ''
  perfil.value.passwordConfirm = ''
  showToast(t('configuracion.perfil.guardadoOk'))
  window.dispatchEvent(new Event('perfil-actualizado'))
}

// Apariencia
const tema         = ref(localStorage.getItem('tema')        || 'claro')
const colorAcento  = ref(localStorage.getItem('colorAcento') || '#419383')
const fuente       = ref(localStorage.getItem('fuente')      || 'medium')
const tipografia   = ref(localStorage.getItem('tipografia')  || 'inter')

function guardarPreferenciasServidor() {
  const json = JSON.stringify({
    tema:              tema.value,
    colorAcento:       colorAcento.value,
    fuente:            fuente.value,
    tipografia:        tipografia.value,
    prefFormatoPrecio: formatoPrecio.value,
    prefPagina:        prefs.value.paginaInicio,
    prefSonido:        prefs.value.sonido,
    prefSonidoTipo:    prefs.value.sonidoTipo,
    fraseDiaria:       frasesEdit.value,
    prefAtajos:        prefs.value.atajos,
    shortcutsCustom:   customShortcuts.value,
  })
  fetch(`${API_URL}/api/users/preferencias`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ preferencias: json }),
  }).catch(() => {})
}

watch(tema, (val) => {
  localStorage.setItem('tema', val)
  if (val === 'oscuro') document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
  guardarPreferenciasServidor()
})

watch(colorAcento, (val) => {
  localStorage.setItem('colorAcento', val)
  document.documentElement.style.setProperty('--color-primary', val)
  document.documentElement.style.setProperty('--logo-filter', logoFilters[val] || computeLogoFilter(val))
  guardarPreferenciasServidor()
})

watch(fuente, (val) => {
  localStorage.setItem('fuente', val)
  applyFuente(val)
  guardarPreferenciasServidor()
})

function applyFuente(val) {
  document.documentElement.classList.remove('font-small', 'font-large')
  if (val === 'small') document.documentElement.classList.add('font-small')
  if (val === 'large') document.documentElement.classList.add('font-large')
}

watch(tipografia, (val) => {
  localStorage.setItem('tipografia', val)
  applyTipografia(val)
  guardarPreferenciasServidor()
})

watch(formatoPrecio, () => {
  guardarPreferenciasServidor()
})

function applyTipografia(val) {
  document.documentElement.classList.remove('tipografia-playfair', 'tipografia-merriweather')
  if (val === 'playfair')     document.documentElement.classList.add('tipografia-playfair')
  if (val === 'merriweather') document.documentElement.classList.add('tipografia-merriweather')
}

const colores = [
  { value: '#419383' },
  { value: '#4a7fb5' },
  { value: '#c46080' },
]

const logoFilters = {
  '#419383': 'brightness(0) saturate(100%) invert(55%) sepia(30%) saturate(500%) hue-rotate(120deg) brightness(90%)',
  '#4a7fb5': 'brightness(0) saturate(100%) invert(50%) sepia(30%) saturate(600%) hue-rotate(173deg) brightness(95%)',
  '#c05050': 'brightness(0) saturate(100%) invert(40%) sepia(60%) saturate(700%) hue-rotate(322deg) brightness(82%)',
  '#c46080': 'brightness(0) saturate(100%) invert(48%) sepia(40%) saturate(600%) hue-rotate(301deg) brightness(90%)',
}

function computeLogoFilter(hex) {
  const r = parseInt(hex.slice(1,3), 16) / 255
  const g = parseInt(hex.slice(3,5), 16) / 255
  const b = parseInt(hex.slice(5,7), 16) / 255
  const max = Math.max(r,g,b), min = Math.min(r,g,b)
  const l = (max + min) / 2
  let h = 0, s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  const hDeg = Math.round(h * 360)
  const sPct = Math.round(s * 100)
  const lPct = Math.round(l * 100)
  const hueRotate = (hDeg - 38 + 360) % 360
  const inv = Math.min(65, Math.max(35, Math.round(lPct * 0.55 + 12)))
  const sat = Math.min(900, Math.max(200, Math.round(sPct * 9 + 80)))
  const bri = Math.min(105, Math.max(75, Math.round(lPct * 1.1 + 22)))
  return `brightness(0) saturate(100%) invert(${inv}%) sepia(45%) saturate(${sat}%) hue-rotate(${hueRotate}deg) brightness(${bri}%)`
}

// Preferencias
const prefs = ref({
  sonido:       localStorage.getItem('prefSonido')   !== 'false',
  sonidoTipo:   localStorage.getItem('prefSonidoTipo') || 'chime',
  atajos:       localStorage.getItem('prefAtajos')   !== 'false',
  paginaInicio: localStorage.getItem('prefPagina')   || 'dashboard',
})

const { previewSound } = useSound()

const sonidos = [
  { value: 'click',  label: 'Click' },
  { value: 'chime',  label: 'Chime' },
  { value: 'whoosh', label: 'Whoosh' },
]

function seleccionarSonido(tipo) {
  prefs.value.sonidoTipo = tipo
  localStorage.setItem('prefSonidoTipo', tipo)
  previewSound(tipo)
  guardarPreferenciasServidor()
}

// Grabación de sonido personalizado
const grabando        = ref(false)
const tiempoGrabacion = ref(0)
const tieneCustom     = ref(!!localStorage.getItem('prefSonidoCustom'))
let mediaRecorder     = null
let grabacionTimer    = null
let chunksGrabacion   = []

async function iniciarGrabacion() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    chunksGrabacion = []
    mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = e => chunksGrabacion.push(e.data)
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksGrabacion, { type: mediaRecorder.mimeType })
      const reader = new FileReader()
      reader.onload = () => {
        localStorage.setItem('prefSonidoCustom', reader.result)
        tieneCustom.value = true
        seleccionarSonido('custom')
      }
      reader.readAsDataURL(blob)
      stream.getTracks().forEach(t => t.stop())
    }

    mediaRecorder.start()
    grabando.value = true
    tiempoGrabacion.value = 3

    grabacionTimer = setInterval(() => {
      tiempoGrabacion.value--
      if (tiempoGrabacion.value <= 0) pararGrabacion()
    }, 1000)
  } catch {
    alert('No se pudo acceder al micrófono.')
  }
}

function pararGrabacion() {
  clearInterval(grabacionTimer)
  if (mediaRecorder?.state === 'recording') mediaRecorder.stop()
  grabando.value = false
}

function borrarCustom() {
  localStorage.removeItem('prefSonidoCustom')
  tieneCustom.value = false
  if (prefs.value.sonidoTipo === 'custom') seleccionarSonido('chime')
}

watch(() => prefs.value.paginaInicio, (val) => {
  localStorage.setItem('prefPagina', val)
  guardarPreferenciasServidor()
})
watch(() => prefs.value.sonido, (val) => {
  localStorage.setItem('prefSonido', val)
  guardarPreferenciasServidor()
})
watch(() => prefs.value.atajos, (val) => {
  localStorage.setItem('prefAtajos', val)
  guardarPreferenciasServidor()
})

// Atajos
function loadShortcuts() {
  try {
    const saved = localStorage.getItem('shortcutsCustom')
    return saved ? { ...DEFAULT_SHORTCUTS, ...JSON.parse(saved) } : { ...DEFAULT_SHORTCUTS }
  } catch { return { ...DEFAULT_SHORTCUTS } }
}

const customShortcuts    = ref(loadShortcuts())
const editingAtajoId     = ref(null)
const duplicateWarning   = ref(false)

const hasCustomShortcuts = computed(() =>
  Object.keys(DEFAULT_SHORTCUTS).some(k => customShortcuts.value[k] !== DEFAULT_SHORTCUTS[k])
)

const atajos = computed(() => [
  { id: 'navDashboard',      label: t('configuracion.atajos.navDashboard'),      key: customShortcuts.value.navDashboard },
  { id: 'navPropiedades',    label: t('configuracion.atajos.navPropiedades'),    key: customShortcuts.value.navPropiedades },
  { id: 'navEstadisticas',   label: t('configuracion.atajos.navEstadisticas'),   key: customShortcuts.value.navEstadisticas },
  { id: 'navMensajes',       label: t('configuracion.atajos.navMensajes'),       key: customShortcuts.value.navMensajes },
  { id: 'navConfiguracion',  label: t('configuracion.atajos.navConfiguracion'),  key: customShortcuts.value.navConfiguracion },
  { id: 'navLogout',         label: t('configuracion.atajos.navLogout'),         key: customShortcuts.value.navLogout },
  { id: 'nuevaPropiedad',    label: t('configuracion.atajos.nuevaPropiedad'),    key: customShortcuts.value.nuevaPropiedad },
  { id: 'buscarPropiedades', label: t('configuracion.atajos.buscarPropiedades'), key: customShortcuts.value.buscarPropiedades },
  { id: 'buscarMensajes',    label: t('configuracion.atajos.buscarMensajes'),    key: customShortcuts.value.buscarMensajes },
  { id: 'vistaTablero',      label: t('configuracion.atajos.vistaTablero'),      key: customShortcuts.value.vistaTablero },
  { id: 'vistaLista',        label: t('configuracion.atajos.vistaLista'),        key: customShortcuts.value.vistaLista },
  { id: 'guardarPerfil',     label: t('configuracion.atajos.guardarPerfil'),     key: customShortcuts.value.guardarPerfil },
  { id: 'alternarTema',      label: t('configuracion.atajos.alternarTema'),      key: customShortcuts.value.alternarTema },
])

function startEditing(id) {
  editingAtajoId.value = editingAtajoId.value === id ? null : id
  duplicateWarning.value = false
}

function onCaptureKey(e) {
  if (!editingAtajoId.value) return
  const tag = e.target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  if (e.key === 'Escape') { editingAtajoId.value = null; return }
  if (e.key.length !== 1 || e.altKey || e.ctrlKey || e.metaKey) return
  e.preventDefault()
  const key = e.key.toLowerCase()
  const current = { ...customShortcuts.value }
  const duplicate = Object.keys(current).find(a => a !== editingAtajoId.value && current[a] === key)
  if (duplicate) {
    duplicateWarning.value = true
    setTimeout(() => { duplicateWarning.value = false }, 1200)
    return
  }
  current[editingAtajoId.value] = key
  customShortcuts.value = current
  const toSave = {}
  Object.keys(DEFAULT_SHORTCUTS).forEach(a => {
    if (current[a] !== DEFAULT_SHORTCUTS[a]) toSave[a] = current[a]
  })
  Object.keys(toSave).length
    ? localStorage.setItem('shortcutsCustom', JSON.stringify(toSave))
    : localStorage.removeItem('shortcutsCustom')
  editingAtajoId.value = null
  guardarPreferenciasServidor()
}

function resetShortcuts() {
  customShortcuts.value = { ...DEFAULT_SHORTCUTS }
  localStorage.removeItem('shortcutsCustom')
  guardarPreferenciasServidor()
}

// Frase del día
const diaHoy      = new Date().getDay()
const frasesEdit  = ref(loadFrases())
const hasCustomFrases = computed(() =>
  DEFAULT_FRASES.some((f, i) => frasesEdit.value[i] !== f)
)

function saveFrases() {
  localStorage.setItem('fraseDiaria', JSON.stringify(frasesEdit.value))
  window.dispatchEvent(new Event('frase-actualizada'))
  guardarPreferenciasServidor()
}

function resetFrases() {
  frasesEdit.value = [...DEFAULT_FRASES]
  localStorage.removeItem('fraseDiaria')
  window.dispatchEvent(new Event('frase-actualizada'))
  guardarPreferenciasServidor()
}

onMounted(() => {
  bus.on('shortcut:guardar-perfil', guardarPerfil)
  window.addEventListener('keydown', onCaptureKey)
})
onUnmounted(() => {
  bus.off('shortcut:guardar-perfil')
  window.removeEventListener('keydown', onCaptureKey)
})
</script>

<style scoped>
.config-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
}

/* ── Header ── */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; }
.page-title  { font-size: 26px; font-weight: 800; color: var(--color-primary); letter-spacing: -0.5px; margin: 0 0 6px; }
.page-subtitle { font-size: 14px; color: #6b7280; margin: 0; }

/* ── Layout ── */
.config-layout { display: flex; gap: 20px; align-items: stretch; }
.config-left   { flex: 1.6; display: flex; flex-direction: column; gap: 20px; }
.config-right  { flex: 1;   display: flex; flex-direction: column; gap: 16px; }

/* ── Card base ── */
.config-card {
  background: #fff;
  border: 1px solid #eaecf0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card-dark {
  background: var(--color-primary);
  border-color: transparent;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.card-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-primary);
}
.card-title-row h2 { font-size: 17px; font-weight: 700; color: #111827; margin: 0; }
.card-title-row--light { color: #fff; }
.card-title-row--light h2 { color: #fff; }

/* ── Perfil ── */
.perfil-body {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}
.avatar-upload {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  background: #f1f5f9;
  border: 2px dashed #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-img { width: 100%; height: 100%; object-fit: cover; }
.avatar-placeholder { color: #9ca3af; }
.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.2s;
}
.avatar-upload:hover .avatar-overlay { opacity: 1; }
.hidden-input { display: none; }

.perfil-fields {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.field-group         { display: flex; flex-direction: column; gap: 6px; }
.field-group--full   { grid-column: 1 / -1; }
.field-group label {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.06em;
}
.field-group input {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  background: #f9fafb;
  outline: none;
  transition: border-color 0.15s;
}
.field-group input:focus { border-color: var(--color-primary); background: #fff; }

/* ── Apariencia ── */
.apariencia-grid {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  align-items: flex-end;
}
.apariencia-item { display: flex; flex-direction: column; gap: 10px; }
.apariencia-label { font-size: 11px; font-weight: 700; color: #9ca3af; letter-spacing: 0.06em; }

.tema-btns { display: flex; gap: 6px; }
.tema-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.tema-btn.active { border-color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 12%, white); color: var(--color-primary); }

.color-swatches { display: flex; gap: 8px; align-items: center; }
.swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2.5px solid transparent;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
}
.swatch.active { border-color: #111827; transform: scale(1.15); }
.swatch:hover  { transform: scale(1.1); }

.swatch-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.swatch-custom svg { color: #9ca3af; pointer-events: none; position: relative; z-index: 1; }
.swatch-custom.active svg { color: white; }
.swatch-custom input[type="color"] {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
}

.config-select {
  padding: 9px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  color: #374151;
  background: #f9fafb;
  cursor: pointer;
  outline: none;
}
.config-select:focus { border-color: var(--color-primary); }

/* ── Preferencias ── */
.prefs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.pref-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.pref-name  { font-size: 14px; font-weight: 600; color: #111827; display: block; }
.pref-desc  { font-size: 12px; color: #6b7280; display: block; margin-top: 2px; }
.pref-label-sm { font-size: 11px; font-weight: 700; color: #9ca3af; letter-spacing: 0.06em; }
.pref-item--full { grid-column: 1 / -1; }

.sonido-selector { display: flex; justify-content: center; padding-top: 4px; }
.sonido-btns     { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.sonido-sep      { width: 1px; height: 24px; background: #e5e7eb; margin: 0 2px; }

.sonido-btn--rec  { border-color: #d1d5db; color: #6b7280; }
.sonido-btn--rec:hover { border-color: var(--color-primary); color: var(--color-primary); }

.sonido-btn--grabando { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
.sonido-btn--grabando:hover { opacity: 0.85; }

.sonido-btn--del {
  padding: 7px 10px;
  border-color: #e5e7eb;
  color: #9ca3af;
}
.sonido-btn--del:hover { border-color: #fca5a5; color: #ef4444; background: #fef2f2; }

.rec-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #ef4444;
  animation: blink 0.8s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.2; }
}
.sonido-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.sonido-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.sonido-btn.active { border-color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 12%, white); color: var(--color-primary); }

/* Toggle */
.toggle { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; cursor: pointer; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle-track {
  position: absolute;
  inset: 0;
  background: #d1d5db;
  border-radius: 99px;
  transition: background 0.2s;
}
.toggle-track::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle input:checked + .toggle-track { background: var(--color-primary); }
.toggle input:checked + .toggle-track::after { transform: translateX(18px); }

/* ── Btn password ── */
.btn-password {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border: 1.5px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.btn-password:hover { border-color: var(--color-primary); color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 12%, white); }

/* ── Modal contraseña ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-pass {
  background: #fff;
  border-radius: 14px;
  padding: 28px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}
.modal-pass-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-pass-header h3 { font-size: 17px; font-weight: 700; color: #111827; margin: 0; }
.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 4px;
  border-radius: 6px;
  display: flex;
}
.modal-close:hover { background: #f3f4f6; color: #374151; }
.modal-pass-body { display: flex; flex-direction: column; gap: 14px; }
.modal-pass-footer { display: flex; justify-content: flex-end; gap: 10px; }
.btn-outline-sm {
  padding: 9px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.btn-outline-sm:hover { background: #f9fafb; }

/* ── Toast ── */
.toast {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}
.toast--ok    { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.toast--error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.toast-enter-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.toast-leave-active { transition: opacity 0.6s ease, transform 0.6s ease; }
.toast-enter-from   { opacity: 0; transform: translateY(-8px); }
.toast-leave-to     { opacity: 0; transform: translateY(-4px); }

/* ── Btn primary ── */
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
.btn-primary:hover { opacity: 0.9; }

/* ── Atajos ── */
.card-atajos { padding: 20px; gap: 12px; flex: 1; }
.card-atajos .atajos-list { flex: 1; justify-content: space-between; }
.card-atajos .card-title-row { justify-content: space-between; }
.atajos-list { display: flex; flex-direction: column; gap: 6px; }
.atajo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.10);
  border-radius: 6px;
  padding: 8px 12px;
  flex: 1;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: background 0.15s, border-color 0.15s;
}
.atajo-item:hover { background: rgba(255,255,255,0.18); }
.atajo-item:hover .atajo-edit-icon { opacity: 1; }
.atajo-item--editing {
  background: rgba(255,255,255,0.22);
  border-color: rgba(255,255,255,0.5);
  animation: pulse-border 0.9s ease-in-out infinite;
}
@keyframes pulse-border {
  0%, 100% { border-color: rgba(255,255,255,0.5); }
  50%       { border-color: rgba(255,255,255,0.15); }
}
.atajos-hint {
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin: -4px 0 2px;
}
.atajo-label { font-size: 12px; font-weight: 500; color: #fff; }
.atajo-keys  { display: flex; gap: 3px; align-items: center; }
.atajo-edit-icon {
  color: rgba(255,255,255,0.55);
  opacity: 0;
  transition: opacity 0.15s;
  margin-left: 2px;
  flex-shrink: 0;
}
.atajo-listening {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
  font-style: italic;
}
kbd {
  background: rgba(255,255,255,0.2);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: inherit;
}
.kbd-custom {
  background: rgba(255,255,255,0.38);
  outline: 1.5px solid rgba(255,255,255,0.6);
}
.btn-reset-atajos {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
  padding: 4px 10px;
  border: 1.5px solid rgba(255,255,255,0.4);
  border-radius: 6px;
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.btn-reset-atajos:hover { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.7); }


/* ── Frase del día ── */
.frases-hint {
  font-size: 12px;
  color: #9ca3af;
  margin: -10px 0 0;
}
.frases-list { display: flex; flex-direction: column; gap: 8px; }
.frase-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.frase-dia {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.06em;
  width: 60px;
  flex-shrink: 0;
}
.frase-row--hoy .frase-dia { color: var(--color-primary); }
.frase-input {
  flex: 1;
  padding: 8px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  color: #111827;
  background: #f9fafb;
  outline: none;
  transition: border-color 0.15s;
}
.frase-input:focus { border-color: var(--color-primary); background: #fff; }
.frase-row--hoy .frase-input { border-color: color-mix(in srgb, var(--color-primary) 40%, #e5e7eb); }
.btn-reset-frases {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
  padding: 4px 10px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
  color: #6b7280;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.btn-reset-frases:hover { border-color: var(--color-primary); color: var(--color-primary); }

/* ── Logout ── */
.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.btn-logout:hover { background: #fef2f2; border-color: #fca5a5; color: #dc2626; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .config-layout   { flex-direction: column; align-items: stretch; }
  .config-right    { flex: none; }
  .card-atajos     { flex: none; }
  .perfil-fields   { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .page-header     { text-align: center; justify-content: center; flex-direction: column; align-items: center; }
  .perfil-body     { flex-direction: column; align-items: center; }
  .perfil-fields   { grid-template-columns: 1fr; }
  .prefs-grid      { grid-template-columns: 1fr; }
  .apariencia-grid { flex-direction: column; align-items: center; gap: 16px; }
  .apariencia-item { align-items: center; }
  .sonido-selector { justify-content: center; }
  .sonido-btns     { justify-content: center; flex-wrap: wrap; }
  .atajos-list     { align-items: center; }
  .atajo-item      { max-width: 340px; width: 100%; margin: 0 auto; }
  .card-header     { flex-direction: column; align-items: center; text-align: center; }
  .card-header .btn-primary { width: 100%; justify-content: center; }
  .card-title-row                    { justify-content: center; }
  .card-atajos .card-title-row       { justify-content: center; }
  .card-atajos .btn-reset-atajos     { margin-left: 0; }
  .card-frases .card-title-row       { flex-wrap: wrap; justify-content: center; }
  .card-frases .btn-reset-frases     { margin-left: 0; flex-basis: 100%; justify-content: center; }
  .frases-hint     { text-align: center; }
  .frase-row       { flex-direction: column; align-items: center; gap: 6px; }
  .frase-dia       { width: auto; text-align: center; }
  .frase-input     { width: 100%; }
}

</style>

<style>
html.dark .config-page .page-subtitle   { color: #64748b; }
html.dark .config-page .config-card     { background: #1e2333; border-color: #2d3348; }
html.dark .config-page .card-dark       { background: var(--color-primary); border-color: transparent; }
html.dark .config-page .card-title-row h2 { color: #e2e8f0; }
html.dark .config-page .avatar-upload   { background: #2d3348; border-color: #3d4460; }
html.dark .config-page .avatar-placeholder { color: #64748b; }
html.dark .config-page .field-group label  { color: #64748b; }
html.dark .config-page .field-group input  { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .config-page .field-group input:focus { border-color: var(--color-primary); background: #374151; }
html.dark .config-page .btn-password    { background: #2d3348; border-color: #3d4460; color: #94a3b8; }
html.dark .config-page .btn-password:hover { border-color: var(--color-primary); color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 10%, transparent); }
html.dark .config-page .apariencia-label { color: #64748b; }
html.dark .config-page .tema-btn        { background: #2d3348; border-color: #3d4460; color: #94a3b8; }
html.dark .config-page .tema-btn.active { border-color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 15%, transparent); color: var(--color-primary); }
html.dark .config-page .config-select   { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .config-page .pref-name       { color: #e2e8f0; }
html.dark .config-page .pref-desc       { color: #94a3b8; }
html.dark .config-page .pref-label-sm   { color: #64748b; }
html.dark .config-page .sonido-btn           { background: #2d3348; border-color: #3d4460; color: #94a3b8; }
html.dark .config-page .sonido-btn:hover     { border-color: var(--color-primary); color: var(--color-primary); }
html.dark .config-page .sonido-btn.active    { border-color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 15%, transparent); color: var(--color-primary); }
html.dark .config-page .sonido-btn--grabando { background: #450a0a; border-color: #ef4444; color: #ef4444; }
html.dark .config-page .sonido-sep           { background: #3d4460; }
html.dark .config-page .toggle-track    { background: #374151; }
html.dark .config-page .btn-logout      { background: #2d3348; border-color: #3d4460; color: #94a3b8; }
html.dark .config-page .btn-logout:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }
html.dark .config-page .frases-hint    { color: #64748b; }
html.dark .config-page .frase-input   { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .config-page .frase-input:focus { border-color: var(--color-primary); background: #374151; }
html.dark .config-page .btn-reset-frases { background: #2d3348; border-color: #3d4460; color: #94a3b8; }
html.dark .config-page .btn-reset-frases:hover { border-color: var(--color-primary); color: var(--color-primary); }
html.dark .modal-pass      { background: #1e2333; }
html.dark .modal-pass-header h3 { color: #e2e8f0; }
html.dark .modal-close     { color: #64748b; }
html.dark .modal-close:hover { background: #374151; color: #e2e8f0; }
html.dark .btn-outline-sm  { background: #2d3348; border-color: #3d4460; color: #94a3b8; }
html.dark .btn-outline-sm:hover { background: #374151; }
html.dark .toast--ok       { background: #14532d; color: #86efac; border-color: #166534; }
html.dark .toast--error    { background: #450a0a; color: #fca5a5; border-color: #7f1d1d; }
</style>
