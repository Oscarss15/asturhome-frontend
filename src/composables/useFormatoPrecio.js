import { ref } from 'vue'

const formatoPrecio = ref(localStorage.getItem('prefFormatoPrecio') || 'EUR')

const formatos = {
  EUR:     { locale: 'es-ES', currency: 'EUR', decimals: 0 },
  USD:     { locale: 'en-US', currency: 'USD', decimals: 0 },
  EUR_DEC: { locale: 'es-ES', currency: 'EUR', decimals: 2 },
}

export function useFormatoPrecio() {
  function formatPrecio(valor, modalidad) {
    if (!valor && valor !== 0) return '—'
    const num = typeof valor === 'string' ? parseFloat(valor.replace(/[^\d.,-]/g, '').replace(',', '.')) : Number(valor)
    if (isNaN(num)) return '—'
    const fmt = formatos[formatoPrecio.value] || formatos.EUR
    const str = new Intl.NumberFormat(fmt.locale, {
      style: 'currency',
      currency: fmt.currency,
      minimumFractionDigits: fmt.decimals,
      maximumFractionDigits: fmt.decimals,
    }).format(num)
    return modalidad?.toUpperCase() === 'ALQUILER' ? str + '/mes' : str
  }

  function setFormato(val) {
    formatoPrecio.value = val
    localStorage.setItem('prefFormatoPrecio', val)
  }

  return { formatoPrecio, formatPrecio, setFormato }
}
