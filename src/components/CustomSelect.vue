<template>
  <div class="cs-wrap" ref="wrap">
    <button type="button" class="cs-trigger" @click="toggle" :class="{ open: isOpen }">
      <span :class="modelValue ? 'cs-value' : 'cs-placeholder'">
        {{ selectedLabel }}
      </span>
      <svg class="cs-arrow" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <ul v-show="isOpen" class="cs-dropdown">
      <li
        v-for="opt in options"
        :key="opt.value"
        class="cs-option"
        :class="{ selected: modelValue === opt.value }"
        @click="select(opt)"
      >
        {{ opt.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, required: true },
  placeholder: { type: String, default: 'Seleccionar...' }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const wrap = ref(null)

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found ? found.label : props.placeholder
})

function toggle() { isOpen.value = !isOpen.value }

function select(opt) {
  emit('update:modelValue', opt.value)
  isOpen.value = false
}

function onClickOutside(e) {
  if (wrap.value && !wrap.value.contains(e.target)) isOpen.value = false
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<style scoped>
.cs-wrap {
  position: relative;
  width: 100%;
}

.cs-trigger {
  width: 100%;
  padding: 9px 32px 9px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.15s;
  outline: none;
}

.cs-trigger:hover,
.cs-trigger.open { border-color: var(--color-primary); }

.cs-placeholder { color: #9ca3af; }
.cs-value { color: #374151; }

.cs-arrow {
  flex-shrink: 0;
  color: #9ca3af;
  transition: transform 0.2s;
}

.cs-trigger.open .cs-arrow { transform: rotate(180deg); }

.cs-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  z-index: 50;
  list-style: none;
  margin: 0;
  padding: 4px;
  max-height: 220px;
  overflow-y: auto;
}

.cs-option {
  padding: 8px 12px;
  font-size: 14px;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}

.cs-option:hover {
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
}

.cs-option.selected {
  background: color-mix(in srgb, var(--color-primary) 15%, transparent);
  color: var(--color-primary);
  font-weight: 600;
}
</style>

<style>
html.dark .cs-trigger          { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .cs-trigger:hover,
html.dark .cs-trigger.open     { border-color: var(--color-primary); }
html.dark .cs-placeholder      { color: #64748b; }
html.dark .cs-value            { color: #e2e8f0; }
html.dark .cs-arrow            { color: #64748b; }
html.dark .cs-dropdown         { background: #1e2333; border-color: #2d3348; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
html.dark .cs-option           { color: #94a3b8; }
html.dark .cs-option:hover     { background: color-mix(in srgb, var(--color-primary) 15%, transparent); color: var(--color-primary); }
html.dark .cs-option.selected  { background: color-mix(in srgb, var(--color-primary) 20%, transparent); color: var(--color-primary); }
</style>
