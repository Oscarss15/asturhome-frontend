import { API_URL } from '@/config.js'
const BASE = `${API_URL}/api/mensajes`

function headers() {
  const token = localStorage.getItem('token')
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

export const mensajeService = {
  listar() {
    return fetch(BASE, { headers: headers() }).then(r => r.json())
  },

  cambiarEstado(id, estado) {
    return fetch(`${BASE}/${id}/estado`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({ estado }),
    }).then(r => r.json())
  },

  responderAgente(id, texto, tipo = 'agente') {
    return fetch(`${BASE}/${id}/respuestas`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ texto, tipo }),
    }).then(r => r.json())
  },

  // Público (página del cliente)
  obtenerPorToken(token) {
    return fetch(`${BASE}/responder/${token}`).then(r => r.json())
  },

  responderCliente(token, texto) {
    return fetch(`${BASE}/responder/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto }),
    })
  },

  // Formulario público de la web
  enviarFormulario(datos) {
    return fetch(`${BASE}/publico`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    }).then(r => r.json())
  },
}
