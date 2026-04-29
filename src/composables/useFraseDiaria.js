export const DEFAULT_FRASES = [
  'Recarga energía hoy, {name}. Mañana el mercado vuelve a moverse.',
  'Nueva semana, nuevas operaciones sobre la mesa. ¡A cerrar, {name}!',
  'Cada llamada puede ser el cliente que cambie tu mes. ¡Marca la diferencia, {name}!',
  'A mitad de semana y con la agenda llena de visitas. ¡Eso es trabajo, {name}!',
  'El mejor inmueble de la cartera está a punto de encontrar dueño. ¡Tú lo sabes, {name}!',
  'Última jornada de la semana, pero no la menos importante. ¡Cierra fuerte, {name}!',
  'Los clientes también buscan en fin de semana. ¡Sé el primero en responder, {name}!',
]

export function loadFrases() {
  try {
    const saved = localStorage.getItem('fraseDiaria')
    const parsed = saved ? JSON.parse(saved) : null
    if (Array.isArray(parsed) && parsed.length === 7) {
      return parsed.map((f, i) => (typeof f === 'string' && f.trim() ? f : DEFAULT_FRASES[i]))
    }
  } catch { /* empty */ }
  return [...DEFAULT_FRASES]
}

export function getFraseHoy(nombre) {
  const frases = loadFrases()
  const raw = frases[new Date().getDay()]
  return raw.replace(/\{name\}/g, nombre)
}
