import { API_URL } from '@/config.js'
const BASE = `${API_URL}/api/propiedades`

function headers() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}

export default {
  getAll() {
    return fetch(BASE, { headers: headers() }).then(r => {
      if (!r.ok) throw new Error(`Error ${r.status}`)
      return r.json()
    })
  },
  getById(id) {
    return fetch(`${BASE}/${id}`, { headers: headers() }).then(r => r.json())
  },
  create(data) {
    return fetch(BASE, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json())
  },
  update(id, data) {
    return fetch(`${BASE}/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(data) }).then(r => r.json())
  },
  delete(id) {
    return fetch(`${BASE}/${id}`, { method: 'DELETE', headers: headers() })
  }
}
