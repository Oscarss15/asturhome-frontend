import { API_URL } from '@/config.js'
const BASE = `${API_URL}/api/estadisticas`

function headers() {
  return {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }
}

export async function getEstadisticas() {
  const res = await fetch(BASE, { headers: headers() })
  if (!res.ok) throw new Error('Error al cargar estadísticas')
  return res.json()
}
