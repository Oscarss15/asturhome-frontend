import { API_URL } from '@/config.js'
const BASE = `${API_URL}/api/users/agentes`

function headers() {
  const token = localStorage.getItem('token')
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

export const agenteService = {
  listar() {
    return fetch(BASE, { headers: headers() }).then(r => r.json())
  },
  crear(datos) {
    return fetch(BASE, { method: 'POST', headers: headers(), body: JSON.stringify(datos) }).then(r => r.json())
  },
  editar(id, datos) {
    return fetch(`${BASE}/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(datos) }).then(r => r.json())
  },
  eliminar(id) {
    return fetch(`${BASE}/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json())
  },
}
