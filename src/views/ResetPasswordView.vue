<template>
  <main class="reset-page">
    <section class="reset-card">
      <div class="left-panel">
        <img class="brand-logo" :src="logoAsset" alt="Asturhome" />
      </div>

      <div class="right-panel">
        <header class="panel-title">
          <h1>Nueva contraseña</h1>
        </header>

        <div class="form-container">
          <div v-if="!tokenValid" class="msg-box error">
            El enlace no es válido o ha expirado. Solicita uno nuevo desde el login.
          </div>

          <form v-else-if="!success" class="form" @submit.prevent="handleReset">
            <p class="hint">Introduce tu nueva contraseña. Mínimo 6 caracteres.</p>

            <div class="field-group">
              <label>NUEVA CONTRASEÑA</label>
              <div class="input-shell">
                <input v-model="newPassword" type="password" placeholder="••••••••••••" required minlength="6" />
              </div>
            </div>

            <div class="field-group">
              <label>REPETIR CONTRASEÑA</label>
              <div class="input-shell">
                <input v-model="confirmPassword" type="password" placeholder="••••••••••••" required minlength="6" />
              </div>
            </div>

            <p v-if="errorMessage" class="msg-box error">{{ errorMessage }}</p>

            <button class="submit-btn" type="submit" :disabled="loading">
              {{ loading ? 'Guardando...' : 'Cambiar contraseña' }}
            </button>
          </form>

          <div v-else class="msg-box success">
            Contraseña cambiada correctamente. <a href="/login">Ir al login</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { API_URL } from '@/config.js'
import { useRoute } from 'vue-router'
import logoAsset from '../assets/logo-asturhome.png'

const route = useRoute()
const token = route.query.token

const tokenValid = ref(true)
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const loading = ref(false)
const success = ref(false)

onMounted(() => {
  if (!token) tokenValid.value = false
})

async function handleReset() {
  errorMessage.value = ''
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return
  }
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword: newPassword.value }),
    })
    const data = await res.json()
    if (!res.ok) {
      tokenValid.value = false
      return
    }
    success.value = true
  } catch {
    errorMessage.value = 'No se pudo conectar con el servidor.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.reset-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.reset-card {
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 7fr 5fr;
}

.left-panel {
  background: var(--color-primary);
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 42px 37px;
}

.brand-logo {
  width: min(100%, 430px);
  object-fit: contain;
}

.right-panel {
  background: #ffffff;
  padding: 64px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.panel-title {
  text-align: center;
  margin-bottom: 40px;
}

.panel-title h1 {
  margin: 0;
  color: var(--color-primary);
  font-family: Manrope, Inter, sans-serif;
  font-size: 42px;
  line-height: 52px;
  letter-spacing: -1px;
}

.form-container {
  width: 100%;
  max-width: 384px;
  margin: 0 auto;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hint {
  margin: 0;
  color: #757684;
  font-size: 14px;
  line-height: 20px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-group label {
  color: #757684;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.input-shell {
  border-radius: 4px;
  background: #f2f4f6;
  position: relative;
}

.input-shell::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(196, 197, 213, 0.2);
  border-radius: 4px;
  pointer-events: none;
}

.input-shell:focus-within::after {
  border-color: var(--color-primary);
  border-width: 2px;
}

.input-shell input {
  width: 100%;
  border: 0;
  background: transparent;
  color: #757684;
  font-size: 16px;
  line-height: 24px;
  padding: 18px 16px;
  outline: none;
}

.input-shell input::placeholder {
  color: rgba(117, 118, 132, 0.5);
}

.submit-btn {
  width: 100%;
  border: 2px solid transparent;
  border-radius: 4px;
  background: var(--color-primary);
  box-shadow: 0 10px 15px -3px rgba(0, 40, 142, 0.1), 0 4px 6px -4px rgba(0, 40, 142, 0.1);
  color: #ffffff;
  padding: 16px;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #ffffff;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.msg-box {
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
}

.msg-box.error {
  background: #fff0f0;
  border: 1px solid #ffb3b3;
  color: #c0392b;
}

.msg-box.success {
  background: #e6f4f1;
  border: 1px solid #419383;
  color: #1e3a5f;
}

.msg-box.success a {
  color: var(--color-primary);
  font-weight: 600;
}

@media (max-width: 1100px) {
  .reset-card {
    grid-template-columns: 1fr;
  }
  .left-panel {
    min-height: 190px;
    padding: 24px 20px;
  }
  .brand-logo {
    width: 220px;
  }
  .right-panel {
    padding: 32px 20px;
  }
  .panel-title h1 {
    font-size: 30px;
  }
}
</style>
