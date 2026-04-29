import { onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { bus } from '@/composables/eventBus.js'

export const DEFAULT_SHORTCUTS = {
  navDashboard:      'd',
  navPropiedades:    'p',
  navEstadisticas:   'e',
  navMensajes:       'm',
  navConfiguracion:  'c',
  navLogout:         'l',
  nuevaPropiedad:    'n',
  buscarPropiedades: 'b',
  buscarMensajes:    'h',
  vistaTablero:      't',
  vistaLista:        'i',
  guardarPerfil:     'g',
  alternarTema:      'v',
}

function getShortcuts() {
  try {
    const saved = localStorage.getItem('shortcutsCustom')
    return saved ? { ...DEFAULT_SHORTCUTS, ...JSON.parse(saved) } : { ...DEFAULT_SHORTCUTS }
  } catch {
    return { ...DEFAULT_SHORTCUTS }
  }
}

function goAndEmit(router, route, event) {
  if (router.currentRoute.value.path === route) {
    bus.emit(event)
  } else {
    router.push(route).then(() => nextTick(() => bus.emit(event)))
  }
}

export function useKeyboardShortcuts() {
  const router = useRouter()

  function handleKeydown(e) {
    if (localStorage.getItem('prefAtajos') === 'false') return
    const tag = e.target.tagName
    const type = e.target.type
    if (tag === 'TEXTAREA') return
    if (tag === 'INPUT' && type !== 'checkbox' && type !== 'radio') return
    if (!e.altKey) return

    const key = e.key.toLowerCase()
    const sc = getShortcuts()
    const action = Object.keys(sc).find(a => sc[a] === key)
    if (!action) return

    e.preventDefault()

    switch (action) {
      case 'navDashboard':      router.push('/dashboard'); break
      case 'navPropiedades':    router.push('/propiedades'); break
      case 'navEstadisticas':   router.push('/estadisticas'); break
      case 'navMensajes':       router.push('/mensajes'); break
      case 'navConfiguracion':  router.push('/configuracion'); break
      case 'navLogout':
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('userName')
        router.push('/login')
        break
      case 'nuevaPropiedad':    goAndEmit(router, '/propiedades',   'shortcut:nueva-propiedad'); break
      case 'buscarPropiedades': goAndEmit(router, '/propiedades',   'shortcut:buscar'); break
      case 'buscarMensajes':    goAndEmit(router, '/mensajes',      'shortcut:buscar'); break
      case 'vistaTablero':      goAndEmit(router, '/mensajes',      'shortcut:vista-tablero'); break
      case 'vistaLista':        goAndEmit(router, '/mensajes',      'shortcut:vista-lista'); break
      case 'guardarPerfil':     goAndEmit(router, '/configuracion', 'shortcut:guardar-perfil'); break
      case 'alternarTema': {
        const tema = localStorage.getItem('tema') === 'oscuro' ? 'claro' : 'oscuro'
        localStorage.setItem('tema', tema)
        document.documentElement.classList.toggle('dark', tema === 'oscuro')
        break
      }
    }
  }

  onMounted(()  => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
}
