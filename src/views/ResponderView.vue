<template>
  <div class="responder-page">

    <div class="responder-card">

      <!-- Logo -->
      <div class="responder-brand">
        <img :src="logoAsset" alt="Asturhome" class="responder-logo" />
      </div>

      <!-- Estado: cargando -->
      <template v-if="estado === 'cargando'">
        <div class="enviado-wrap">
          <p style="color:#9ca3af; font-size:14px;">Cargando...</p>
        </div>
      </template>

      <!-- Estado: formulario -->
      <template v-if="estado === 'formulario'">
        <div class="responder-header">
          <h1 class="responder-title">Responder consulta</h1>
          <p class="responder-sub">Estás respondiendo a la consulta enviada a través de Asturhome.</p>
        </div>

        <!-- Mensaje original -->
        <div class="mensaje-original">
          <div class="original-label">Tu mensaje original</div>
          <div class="original-texto">{{ mensajeOriginal }}</div>
          <div class="original-meta">
            <span v-if="propiedad" class="tag tag-prop">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              {{ propiedad }}
            </span>
            <span class="tag tag-tipo">{{ tipoConsulta }}</span>
          </div>
        </div>

        <!-- Respuesta del agente -->
        <div class="respuesta-agente">
          <div class="agente-label">
            <div class="agente-avatar">A</div>
            <span>Respuesta de Asturhome</span>
          </div>
          <div class="agente-texto">{{ respuestaAgente }}</div>
        </div>

        <!-- Textarea cliente -->
        <div class="form-group">
          <label class="form-label">Tu respuesta</label>
          <textarea
            v-model="respuestaCliente"
            class="form-textarea"
            placeholder="Escribe aquí tu respuesta..."
            rows="5"
          ></textarea>
        </div>

        <button
          class="submit-btn"
          :disabled="!respuestaCliente.trim() || enviando"
          @click="enviar"
        >
          <svg v-if="!enviando" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          <svg v-else class="spin" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          {{ enviando ? 'Enviando...' : 'Enviar respuesta' }}
        </button>
      </template>

      <!-- Estado: enviado -->
      <template v-if="estado === 'enviado'">
        <div class="enviado-wrap">
          <div class="enviado-icono">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="var(--color-primary)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h2 class="enviado-title">¡Respuesta enviada!</h2>
          <p class="enviado-sub">Hemos recibido tu respuesta. Nuestro equipo la revisará y te contestará lo antes posible.</p>
          <p class="enviado-cierre">Ya puedes cerrar esta ventana.</p>
        </div>
      </template>

      <!-- Estado: enlace inválido -->
      <template v-if="estado === 'invalido'">
        <div class="enviado-wrap">
          <div class="enviado-icono">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#ef4444"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          </div>
          <h2 class="enviado-title">Enlace no válido</h2>
          <p class="enviado-sub">Este enlace ha caducado o no es correcto. Si tienes dudas contacta con nosotros directamente.</p>
        </div>
      </template>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import logoAsset from '../assets/logo-asturhome.png'
import { mensajeService } from '@/services/mensajeService.js'

const route = useRoute()

const estado = ref('cargando')
const enviando = ref(false)
const respuestaCliente = ref('')
const mensajeOriginal = ref('')
const respuestaAgente  = ref('')
const propiedad        = ref('')
const tipoConsulta     = ref('')

onMounted(async () => {
  const token = route.params.token
  if (!token) { estado.value = 'invalido'; return }
  try {
    const data = await mensajeService.obtenerPorToken(token)
    mensajeOriginal.value = data.mensaje
    propiedad.value = data.propiedad
    tipoConsulta.value = data.tipoConsulta
    // Última respuesta del agente
    const ultimaAgente = [...(data.hilo || [])].reverse().find(b => b.tipo === 'agente')
    respuestaAgente.value = ultimaAgente ? ultimaAgente.texto : ''
    estado.value = 'formulario'
  } catch {
    estado.value = 'invalido'
  }
})

async function enviar() {
  if (!respuestaCliente.value.trim()) return
  enviando.value = true
  try {
    await mensajeService.responderCliente(route.params.token, respuestaCliente.value.trim())
    estado.value = 'enviado'
  } catch {
    estado.value = 'invalido'
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
.responder-page {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.responder-card {
  background: #ffffff;
  border: 1px solid #eaecf0;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Brand */
.responder-brand {
  display: flex;
  justify-content: center;
}

.responder-logo {
  height: 36px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(55%) sepia(30%) saturate(500%) hue-rotate(120deg) brightness(90%);
}

/* Header */
.responder-title {
  font-size: 22px;
  font-weight: 800;
  color: #1e3a5f;
  margin: 0 0 6px;
}

.responder-sub {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* Mensaje original */
.mensaje-original {
  background: #f9fafb;
  border: 1px solid #eaecf0;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.original-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #9ca3af;
}

.original-texto {
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  font-style: italic;
}

.original-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
}
.tag-prop { background: #eff6ff; color: #2563eb; }
.tag-tipo { background: color-mix(in srgb, var(--color-primary) 15%, white); color: var(--color-primary); }

/* Respuesta agente */
.respuesta-agente {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.agente-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.agente-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.agente-texto {
  background: color-mix(in srgb, var(--color-primary) 15%, white);
  color: #1e3a5f;
  border-radius: 12px;
  border-bottom-left-radius: 4px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.6;
  margin-left: 36px;
}

/* Form */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #6b7280;
}

.form-textarea {
  width: 100%;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 14px;
  color: #374151;
  background: #f9fafb;
  resize: vertical;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.15s, background 0.15s;
}
.form-textarea:focus { border-color: var(--color-primary); background: #fff; }
.form-textarea::placeholder { color: #9ca3af; }

/* Submit */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.submit-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--color-primary) 70%, black); }
.submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }

/* Enviado / Inválido */
.enviado-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 20px 0;
}

.enviado-icono {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #f0fdf4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.enviado-title {
  font-size: 20px;
  font-weight: 800;
  color: #1e3a5f;
  margin: 0;
}

.enviado-sub {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  max-width: 380px;
  line-height: 1.6;
}

.enviado-cierre {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
}

/* Spinner */
@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }

@media (max-width: 640px) {
  .responder-card { padding: 24px 20px; }
}
</style>
