let _ctx = null
function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)()
  return _ctx
}

function resumeCtx(ctx) {
  if (ctx.state === 'suspended') ctx.resume()
}

function playClick() {
  const ctx = getCtx()
  resumeCtx(ctx)
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.setValueAtTime(900, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.06)
  gain.gain.setValueAtTime(0.25, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.08)
}

function playChime() {
  const ctx = getCtx()
  const frequencies = [660, 880, 1100]
  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.connect(gain)
    gain.connect(ctx.destination)
    const t = ctx.currentTime + i * 0.07
    osc.frequency.setValueAtTime(freq, t)
    gain.gain.setValueAtTime(0.18, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5)
    osc.start(t)
    osc.stop(t + 0.5)
  })
}

function playWhoosh() {
  const ctx = getCtx()
  const bufferSize = Math.floor(ctx.sampleRate * 0.22)
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1

  const source = ctx.createBufferSource()
  source.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(300, ctx.currentTime)
  filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.22)
  filter.Q.value = 1.5

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.22, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)

  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(ctx.currentTime)
  source.stop(ctx.currentTime + 0.22)
}

async function playCustom() {
  const b64 = localStorage.getItem('prefSonidoCustom')
  if (!b64) return
  try {
    const ctx = getCtx()
    if (ctx.state === 'suspended') await ctx.resume()
    const res = await fetch(b64)
    const arrayBuffer = await res.arrayBuffer()
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
    const source = ctx.createBufferSource()
    const gain = ctx.createGain()
    gain.gain.value = 0.7
    source.buffer = audioBuffer
    source.connect(gain)
    gain.connect(ctx.destination)
    source.start(ctx.currentTime)
  } catch (e) {
    console.error('Error reproduciendo sonido custom:', e)
  }
}

const sounds = {
  click:  playClick,
  chime:  playChime,
  whoosh: playWhoosh,
  custom: playCustom,
}

export function useSound() {
  function playSound() {
    if (localStorage.getItem('prefSonido') === 'false') return
    const selected = localStorage.getItem('prefSonidoTipo') || 'chime'
    sounds[selected]?.()
  }

  function previewSound(tipo) {
    sounds[tipo]?.()
  }

  return { playSound, previewSound }
}
