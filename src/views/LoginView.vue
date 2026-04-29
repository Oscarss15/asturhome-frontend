<template>
  <main class="login-page">
    <section class="login-card">
      <div class="left-panel">
        <img class="brand-logo" :src="logoAsset" alt="Asturhome" />
        <div class="brand-tagline">
          <p>GESTIÓN DE ACTIVOS DIGITALES</p>
          <span />
        </div>
      </div>

      <div class="right-panel">
        <header class="panel-title">
          <h1>Bienvenido de nuevo</h1>
        </header>

        <div class="form-container">
          <form class="form" @submit.prevent="handleLogin">
            <div class="field-group">
              <label for="email">CORREO ELECTRÓNICO</label>
              <div class="input-shell">
                <img class="input-icon" :src="mailAsset" alt="" aria-hidden="true" />
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="hola@asturhome.com"
                  autocomplete="email"
                  required
                />
              </div>
            </div>

            <div class="field-group">
              <div class="password-row">
                <label for="password">CONTRASEÑA</label>
                <a href="#" @click.prevent="showForgot = true">¿Olvidaste tu contraseña?</a>
              </div>
              <div class="input-shell">
                <img class="input-icon lock" :src="lockAsset" alt="" aria-hidden="true" />
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="••••••••••••"
                  autocomplete="current-password"
                  required
                />
              </div>
            </div>

            <label class="remember-row">
              <input v-model="remember" type="checkbox" />
              <span>Recordarme</span>
            </label>

            <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

            <button class="submit-btn" type="submit" :disabled="loading">
              {{ loading ? 'Entrando...' : 'Entrar al Panel' }}
            </button>
          </form>

          <div v-if="showForgot" class="forgot-overlay" @click.self="closeForgot">
            <div class="forgot-modal">
              <h3>Recuperar contraseña</h3>
              <p>Introduce tu correo y te enviaremos un enlace para restablecerla.</p>
              <div v-if="!forgotSent">
                <div class="input-shell" style="margin-bottom: 16px;">
                  <input v-model="forgotEmail" type="email" placeholder="Tu correo electrónico" />
                </div>
                <p v-if="forgotError" class="error-msg" style="margin-bottom: 12px;">{{ forgotError }}</p>
                <button class="submit-btn" style="font-size: 18px; line-height: 28px; padding: 12px;" :disabled="forgotLoading" @click="sendForgot">
                  {{ forgotLoading ? 'Enviando...' : 'Enviar enlace' }}
                </button>
              </div>
              <div v-else class="forgot-success">
                <p>Si el correo está registrado, recibirás el enlace en breve. Revisa también la carpeta de spam.</p>
              </div>
              <button class="forgot-close" @click="closeForgot">✕</button>
            </div>
          </div>

          <footer class="footer">
            <p>BIENVENIDO A TU ESPACIO DE GESTIÓN</p>
            <div class="footer-items">
              <span>
                <img :src="shieldAsset" alt="" aria-hidden="true" />
                Seguridad
              </span>
              <span>
                <img :src="globeAsset" alt="" aria-hidden="true" />
                Acceso Global
              </span>
            </div>
          </footer>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { API_URL } from '@/config.js'
import { useRouter } from 'vue-router'
import logoAsset from '../assets/logo-asturhome.png'
import { useFormatoPrecio } from '@/composables/useFormatoPrecio.js'
const { setFormato } = useFormatoPrecio()

const mailAsset = 'https://www.figma.com/api/mcp/asset/78c8965e-dbdf-43e4-b05e-a219c42780e4'
const lockAsset = 'https://www.figma.com/api/mcp/asset/1e873859-6bbd-45ce-a498-76d75bc8a2ac'
const shieldAsset = 'https://www.figma.com/api/mcp/asset/a304110c-a34f-4271-bd9a-39705a0f3d08'
const globeAsset = 'https://www.figma.com/api/mcp/asset/dd9adce2-0fe9-4c90-9d2f-d429bd3b6940'

const router = useRouter()
const email = ref('')
const password = ref('')
const remember = ref(false)
const errorMessage = ref('')
const loading = ref(false)

const showForgot = ref(false)
const forgotEmail = ref('')
const forgotLoading = ref(false)
const forgotSent = ref(false)
const forgotError = ref('')

function closeForgot() {
  showForgot.value = false
  forgotEmail.value = ''
  forgotSent.value = false
  forgotError.value = ''
}

async function sendForgot() {
  forgotError.value = ''
  forgotLoading.value = true
  try {
    await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: forgotEmail.value }),
    })
    forgotSent.value = true
  } catch {
    forgotError.value = 'No se pudo conectar con el servidor.'
  } finally {
    forgotLoading.value = false
  }
}

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })

    const data = await res.json()

    if (!res.ok) {
      errorMessage.value = data.error || 'El correo o la contraseña son incorrectos'
      return
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    localStorage.setItem('userName', data.name)
    if (data.avatarUrl) localStorage.setItem('avatarPreview', data.avatarUrl)
    else localStorage.removeItem('avatarPreview')
    if (data.preferencias) {
      try {
        const prefs = JSON.parse(data.preferencias)
        if (prefs.tema)              localStorage.setItem('tema', prefs.tema)
        if (prefs.colorAcento)       localStorage.setItem('colorAcento', prefs.colorAcento)
        if (prefs.fuente)            localStorage.setItem('fuente', prefs.fuente)
        if (prefs.tipografia)        localStorage.setItem('tipografia', prefs.tipografia)
        if (prefs.prefFormatoPrecio) setFormato(prefs.prefFormatoPrecio)
        if (prefs.prefPagina)        localStorage.setItem('prefPagina', prefs.prefPagina)
        if (prefs.prefSonido        !== undefined) localStorage.setItem('prefSonido', prefs.prefSonido)
        if (prefs.prefSonidoTipo)    localStorage.setItem('prefSonidoTipo', prefs.prefSonidoTipo)
        if (prefs.fraseDiaria)       localStorage.setItem('fraseDiaria', JSON.stringify(prefs.fraseDiaria))
        if (prefs.prefAtajos        !== undefined) localStorage.setItem('prefAtajos', prefs.prefAtajos)
        if (prefs.shortcutsCustom)   localStorage.setItem('shortcutsCustom', JSON.stringify(prefs.shortcutsCustom))
      } catch { /* JSON inválido, ignorar */ }
    }
    localStorage.setItem('rememberMe', remember.value ? 'true' : 'false')

    if (remember.value) {
      sessionStorage.removeItem('sessionOnly')
    } else {
      sessionStorage.setItem('sessionOnly', '1')
    }

    await new Promise(r => setTimeout(r, 900))
    router.push('/' + (localStorage.getItem('prefPagina') || 'dashboard'))
  } catch {
    errorMessage.value = 'No se pudo conectar con el servidor. Inténtalo de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #ffffff;
}

.login-card {
  width: 100vw;
  min-height: 100vh;
  background: #ffffff;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
  display: grid;
  grid-template-columns: 7fr 5fr;
}

.left-panel {
  background: var(--color-primary);
  padding: 42px 37px;
  display: grid;
  grid-template-rows: 1fr auto;
  justify-items: center;
  align-items: center;
}

.brand-logo {
  width: min(100%, 430px);
  object-fit: contain;
  margin-top: 0;
}

.brand-tagline {
  text-align: center;
  color: #ffffff;
  margin-bottom: 16px;
  align-self: end;
}

.brand-tagline p {
  margin: 0;
  font-size: 30px;
  letter-spacing: -0.9px;
  line-height: 45px;
  font-style: italic;
  font-family: Inter, sans-serif;
}

.brand-tagline span {
  display: block;
  width: 74px;
  height: 5px;
  background: #ffffff;
  margin: 4px auto 0;
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
  width: 100%;
  text-align: center;
  margin-bottom: 50px;

}

.panel-title h1 {
  margin: 0;
  color: var(--color-primary);
  font-family: Manrope, Inter, sans-serif;
  font-size: 48px;
  line-height: 58px;
  letter-spacing: -1.2px;
  white-space: nowrap;
}

.form-container {
  width: 100%;
  max-width: 384px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  
}

.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-group label,
.password-row label {
  color: #757684;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  line-height: 16px;
  text-transform: uppercase;
}

.password-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.password-row a {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-decoration: none;
}

.input-shell {
  position: relative;
  border-radius: 4px;
  background: #f2f4f6;
}

.input-shell::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(196, 197, 213, 0.2);
  border-radius: 4px;
  pointer-events: none;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 16px;
}

.input-icon.lock {
  width: 16px;
  height: 21px;
}

.input-shell input {
  width: 100%;
  border: 0;
  background: transparent;
  color: #757684;
  font-size: 16px;
  line-height: 24px;
  padding: 18px 16px 18px 48px;
  outline: none;
}

.input-shell input::placeholder {
  color: rgba(117, 118, 132, 0.5);
}

.input-shell:focus-within::after {
  border-color: var(--color-primary);
  border-width: 2px;
}

.remember-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #444653;
  font-size: 14px;
  line-height: 20px;
  user-select: none;
}

.remember-row input {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  accent-color: var(--color-primary);
}

.submit-btn {
  width: 100%;
  border: 2px solid transparent;
  border-radius: 4px;
  background: var(--color-primary);
  box-shadow:
    0 10px 15px -3px rgba(0, 40, 142, 0.1),
    0 4px 6px -4px rgba(0, 40, 142, 0.1);
  color: #ffffff;
  padding: 16px;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #ffffff;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.footer {
  border-top: 1px solid rgba(196, 197, 213, 0.1);
  padding-top: 41px;
  text-align: center;
}

.footer p {
  margin: 0;
  color: #757684;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.footer-items {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 24px;
}

.footer-items span {
  color: #3f4946;
  font-size: 10px;
  line-height: 15px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.footer-items img {
  width: 11px;
  height: 11px;
}

.error-msg {
  margin: 0;
  padding: 12px 16px;
  background: #fff0f0;
  border: 1px solid #ffb3b3;
  border-radius: 4px;
  color: #c0392b;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.forgot-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.forgot-modal {
  background: #ffffff;
  border-radius: 12px;
  padding: 40px 36px;
  width: min(420px, 90vw);
  position: relative;
}

.forgot-modal h3 {
  margin: 0 0 8px;
  color: var(--color-primary);
  font-size: 22px;
  font-family: Manrope, Inter, sans-serif;
}

.forgot-modal > p {
  margin: 0 0 24px;
  color: #757684;
  font-size: 14px;
  line-height: 20px;
}

.forgot-success p {
  color: #374151;
  font-size: 14px;
  line-height: 20px;
  background: #e6f4f1;
  border-radius: 8px;
  padding: 16px;
  margin: 0;
}

.forgot-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #9ca3af;
  line-height: 1;
}

.forgot-close:hover {
  color: #374151;
}

@media (max-width: 1100px) {
  .login-card {
    grid-template-columns: 1fr;
    min-height: 100vh;
  }

  .left-panel {
    min-height: 190px;
    padding: 24px 20px;
  }

  .brand-logo {
    width: 220px;
    max-width: 100%;
  }

  .brand-tagline {
    display: none;
  }

  .brand-tagline p {
    font-size: 20px;
    line-height: 30px;
  }

  .right-panel {
    padding: 20px 20px 16px;
  }

  .panel-title {
    margin-bottom: 24px;
  }

  .panel-title h1 {
    font-size: 32px;
    line-height: 38px;
  }

  .form-container {
    gap: 24px;
  }

  .form {
    gap: 16px;
  }

  .field-group {
    gap: 6px;
  }

  .field-group label,
  .password-row label {
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 1px;
  }

  .password-row a {
    font-size: 11px;
    line-height: 14px;
  }

  .input-shell input {
    font-size: 14px;
    line-height: 20px;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .remember-row {
    font-size: 13px;
    line-height: 18px;
  }

  .remember-row input {
    width: 18px;
    height: 18px;
  }

  .submit-btn {
    font-size: 20px;
    line-height: 28px;
    padding: 12px;
  }

  .footer {
    padding-top: 20px;
  }

  .footer p {
    font-size: 10px;
    line-height: 14px;
  }

  .footer-items {
    margin-top: 12px;
    gap: 16px;
  }
}
</style>
