<template>
  <div class="propiedades-root">
    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('propiedades.title') }}</h1>
        <p class="page-subtitle">{{ $t('propiedades.subtitle') }}</p>
      </div>
      <div class="page-actions">
        <button class="btn-outline" @click="exportarExcel">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          {{ $t('propiedades.exportar') }}
        </button>
        <button class="btn-primary" @click="openNueva">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          {{ $t('propiedades.nueva') }}
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-card">
      <div class="filters-row">
        <div class="filter-group">
          <label>{{ $t('propiedades.filtros.tipo') }}</label>
          <CustomSelect v-model="filters.tipo" :placeholder="$t('propiedades.filtros.todosTipos')" :options="[
            {value:'',label:$t('propiedades.filtros.todosTipos')},{value:'Piso',label:'Piso'},
            {value:'Chalet',label:'Chalet'},{value:'Apartamento',label:'Apartamento'},{value:'Casa',label:'Casa'}
          ]"/>
        </div>
        <div class="filter-group">
          <label>{{ $t('propiedades.filtros.ciudad') }}</label>
          <CustomSelect v-model="filters.ciudad" :placeholder="$t('propiedades.filtros.cualquierUbicacion')" :options="[
            {value:'',label:$t('propiedades.filtros.cualquierUbicacion')},{value:'Oviedo',label:'Oviedo'},
            {value:'Gijón',label:'Gijón'},{value:'Avilés',label:'Avilés'}
          ]"/>
        </div>
        <div class="filter-group">
          <label>{{ $t('propiedades.filtros.precioMax') }}</label>
          <input class="filter-input" type="text" v-model="filters.precio" placeholder="Ej: 500.000€" />
        </div>
        <div class="filter-group">
          <label>{{ $t('propiedades.filtros.habitaciones') }}</label>
          <CustomSelect v-model="filters.habitaciones" :placeholder="$t('propiedades.filtros.cualquierNro')" :options="[
            {value:'',label:$t('propiedades.filtros.cualquierNro')},{value:'1',label:'1'},{value:'2',label:'2'},
            {value:'3',label:'3'},{value:'4',label:'4'},{value:'5+',label:'5+'}
          ]"/>
        </div>
        <div class="filter-group">
          <label>{{ $t('propiedades.filtros.modalidad') }}</label>
          <CustomSelect v-model="filters.modalidad" :placeholder="$t('propiedades.filtros.ventaAlquiler')" :options="[
            {value:'',label:$t('propiedades.filtros.ventaAlquiler')},{value:'VENTA',label:$t('propiedades.filtros.venta')},{value:'ALQUILER',label:$t('propiedades.filtros.alquiler')}
          ]"/>
        </div>
      </div>
      <div class="filters-row2">
        <div class="filter-group estado-group">
          <label>{{ $t('propiedades.filtros.estado') }}</label>
          <CustomSelect v-model="filters.estado" :placeholder="$t('propiedades.filtros.cualquierEstado')" :options="[
            {value:'',label:$t('propiedades.filtros.cualquierEstado')},{value:'disponible',label:$t('propiedades.filtros.disponible')},
            {value:'reservado',label:$t('propiedades.filtros.reservado')},{value:'alquilado',label:$t('propiedades.filtros.alquilado')},{value:'vendido',label:$t('propiedades.filtros.vendido')}
          ]"/>
        </div>
        <button class="filter-icon-btn" title="Limpiar filtros" @click="filters = { tipo: '', ciudad: '', precio: '', habitaciones: '', modalidad: '', estado: '' }">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M7 8h10M10 12h4"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 16l4 4m0-4l-4 4"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-card">
      <div class="props-table-wrap">
      <table class="props-table">
        <thead>
          <tr>
            <th>{{ $t('propiedades.tabla.propiedad') }}</th>
            <th>{{ $t('propiedades.tabla.tipo') }}</th>
            <th>{{ $t('propiedades.tabla.detalles') }}</th>
            <th>{{ $t('propiedades.tabla.precio') }}</th>
            <th>{{ $t('propiedades.tabla.modalidad') }}</th>
            <th>{{ $t('propiedades.tabla.estado') }}</th>
            <th>{{ $t('propiedades.tabla.acciones') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in paginatedProperties" :key="prop.id" class="data-row">
            <td>
              <div class="prop-cell">
              <img :src="prop.image" :alt="prop.name" class="prop-img" />
              <div class="prop-info">
                <span class="prop-name">{{ prop.name }}</span>
                <span class="prop-id">ID: {{ prop.id }}</span>
                <span class="prop-location">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {{ prop.location }}
                </span>
              </div>
              </div>
            </td>
            <td class="type-cell">{{ prop.type }}</td>
            <td class="details-cell">
              <span class="detail-item">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9V19M3 13H21M21 19V11C21 9.9 20.1 9 19 9H13V13H3M7 9V7C7 5.9 7.9 5 9 5H15C16.1 5 17 5.9 17 7V9"/></svg>
                {{ prop.rooms }} {{ $t('propiedades.tabla.hab') }}
              </span>
              <span class="detail-item">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12H20M20 12V17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17V12M20 12C20 12 20 8 17 8C17 8 17 6 15 6M9 19V21M15 19V21"/></svg>
                {{ prop.baths }} {{ $t('propiedades.tabla.banos') }}
              </span>
              <span class="detail-item">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                {{ prop.surface }} m²
              </span>
            </td>
            <td class="price-cell">{{ prop.price }}</td>
            <td>
              <span :class="['badge-modal', prop.modalidad === 'ALQUILER' ? 'badge-alquiler' : 'badge-venta']">
                {{ prop.modalidad }}
              </span>
            </td>
            <td>
              <span :class="['badge-status', `badge-${prop.statusKey}`]">
                <span class="status-dot"></span>
                {{ prop.status }}
              </span>
            </td>
            <td>
              <div class="actions-cell">
              <button class="action-btn action-btn-ver" title="Ver" @click="openModal(prop)">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="action-btn action-btn-editar" title="Editar" @click="openEditar(prop)">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button class="action-btn action-btn-danger" title="Eliminar" @click="eliminar(prop)">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
              </div>
            </td>
          </tr>
          <tr v-for="i in PAGE_SIZE - paginatedProperties.length" :key="'empty-' + i" class="empty-row">
            <td colspan="7"></td>
          </tr>
        </tbody>
      </table>
      </div>

      <!-- Cards móvil -->
      <div class="mobile-cards">
        <div v-for="prop in paginatedProperties" :key="prop.id" class="mobile-card">
          <img :src="prop.image" :alt="prop.name" class="mobile-card-img" />
          <div class="mobile-card-body">
            <div class="mobile-card-top">
              <span class="prop-name">{{ prop.name }}</span>
              <span :class="['badge-modal', prop.modalidad === 'ALQUILER' ? 'badge-alquiler' : 'badge-venta']">{{ prop.modalidad }}</span>
            </div>
            <span class="prop-id">{{ prop.refId }} · {{ prop.location }}</span>
            <div class="mobile-card-details">
              <span class="detail-item"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9V19M3 13H21M21 19V11C21 9.9 20.1 9 19 9H13V13H3M7 9V7C7 5.9 7.9 5 9 5H15C16.1 5 17 5.9 17 7V9"/></svg>{{ prop.rooms }}</span>
              <span class="detail-item"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12H20M20 12V17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17V12M20 12C20 12 20 8 17 8C17 8 17 6 15 6M9 19V21M15 19V21"/></svg>{{ prop.baths }}</span>
              <span class="detail-item"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>{{ prop.surface }} m²</span>
            </div>
            <div class="mobile-card-footer">
              <span class="price-cell">{{ prop.price }}</span>
              <div class="actions-cell">
                <button class="action-btn action-btn-ver" @click="openModal(prop)"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                <button class="action-btn action-btn-editar" @click="openEditar(prop)"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                <button class="action-btn action-btn-danger" @click="eliminar(prop)"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <span class="pagination-info">{{ $t('propiedades.paginacion.mostrando') }} {{ paginatedProperties.length }} {{ $t('propiedades.paginacion.de') }} {{ filteredProperties.length }} {{ $t('propiedades.paginacion.propiedades') }}</span>
        <div class="pagination-pages">
          <button class="page-btn nav-btn" :disabled="currentPage === 1" @click="currentPage--">&#8249;</button>
          <template v-for="p in visiblePages" :key="p">
            <span v-if="p === '...'" class="page-dots">...</span>
            <button v-else :class="['page-btn', p === currentPage ? 'page-active' : '']" @click="currentPage = p">{{ p }}</button>
          </template>
          <button class="page-btn nav-btn" :disabled="currentPage === totalPages" @click="currentPage++">&#8250;</button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon stat-teal-bg"
          @mouseenter="showTooltip($event, 'Porcentaje de propiedades ya vendidas o alquiladas sobre el total')"
          @mouseleave="hideTooltip">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <div class="stat-body">
          <span class="stat-label">{{ $t('propiedades.stats.ratioVenta') }}</span>
          <span class="stat-value color-teal">{{ ratioVenta }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-brown-bg"
          @mouseenter="showTooltip($event, 'Promedio de días que llevan en reserva las propiedades actualmente reservadas')"
          @mouseleave="hideTooltip">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div class="stat-body">
          <span class="stat-label">{{ $t('propiedades.stats.mediaReservas') }}</span>
          <span class="stat-value color-orange">{{ mediaReservasDias }} {{ $t('propiedades.stats.dias') }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-gray-bg"
          @mouseenter="showTooltip($event, 'Número de consultas de clientes recibidas hoy')"
          @mouseleave="hideTooltip">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <div class="stat-body">
          <span class="stat-label">{{ $t('propiedades.stats.nuevosLeads') }}</span>
          <span class="stat-value color-dark">{{ nuevosLeadsHoy }} {{ $t('propiedades.stats.hoy') }}</span>
        </div>
      </div>

      <Teleport to="body">
        <div v-if="tooltip.visible" class="stat-tooltip-global" :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }">
          {{ tooltip.text }}
        </div>
      </Teleport>
    </div>
    <!-- Modal Confirmar Eliminar -->
    <div v-if="propAEliminar" class="modal-overlay" @click.self="propAEliminar = null">
      <div class="modal modal-confirm">
        <div class="confirm-icon">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#dc2626"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </div>
        <h2 class="confirm-title">{{ $t('propiedades.modal.eliminarTitulo') }}</h2>
        <p class="confirm-msg">{{ $t('propiedades.modal.eliminarMsg', { name: propAEliminar.name }) }}</p>
        <div class="confirm-actions">
          <button class="btn-outline" @click="propAEliminar = null">{{ $t('propiedades.modal.cancelar') }}</button>
          <button class="btn-danger" @click="confirmarEliminar" :disabled="eliminando">
            {{ eliminando ? $t('propiedades.modal.eliminando') : $t('propiedades.modal.confirmarEliminar') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Nueva Propiedad -->
    <div v-if="showNueva" class="modal-overlay" @click.self="closeNueva">
      <div class="modal modal-form">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">{{ $t('propiedades.form.nuevaTitulo') }}</h2>
            <span class="modal-id">{{ $t('propiedades.form.nuevaSubtitulo') }}</span>
          </div>
          <button class="modal-close" @click="closeNueva">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="form-body">
          <div class="form-grid">
            <div class="form-group form-group-full">
              <label>{{ $t('propiedades.form.nombre') }}</label>
              <input v-model="nuevaForm.nombre" type="text" placeholder="Ej: Piso en el centro de Oviedo" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.tipo') }}</label>
              <select v-model="nuevaForm.tipo">
                <option value="">{{ $t('propiedades.form.seleccionar') }}</option>
                <option>Piso</option>
                <option>Chalet</option>
                <option>Apartamento</option>
                <option>Casa</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.ubicacion') }}</label>
              <input v-model="nuevaForm.ubicacion" type="text" placeholder="Ej: Oviedo" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.modalidad') }}</label>
              <select v-model="nuevaForm.modalidad">
                <option value="">{{ $t('propiedades.form.seleccionar') }}</option>
                <option value="VENTA">{{ $t('propiedades.form.venta') }}</option>
                <option value="ALQUILER">{{ $t('propiedades.form.alquiler') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.estado') }}</label>
              <select v-model="nuevaForm.estado">
                <option value="">{{ $t('propiedades.form.seleccionar') }}</option>
                <option value="disponible">{{ $t('propiedades.form.disponible') }}</option>
                <option value="reservado">{{ $t('propiedades.form.reservado') }}</option>
                <option value="alquilado">{{ $t('propiedades.form.alquilado') }}</option>
                <option value="vendido">{{ $t('propiedades.form.vendido') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.precio') }}</label>
              <input v-model.number="nuevaForm.precio" type="number" placeholder="Ej: 150000" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.habitaciones') }}</label>
              <input v-model.number="nuevaForm.habitaciones" type="number" placeholder="Ej: 3" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.banos') }}</label>
              <input v-model.number="nuevaForm.banos" type="number" placeholder="Ej: 2" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.superficie') }}</label>
              <input v-model.number="nuevaForm.superficie" type="number" placeholder="Ej: 90" />
            </div>
            <div class="form-group form-group-full">
              <label>{{ $t('propiedades.form.imagenes') }}</label>
              <label class="upload-area" :class="{ 'upload-dragging': dragging }"
                @dragover.prevent="dragging = true" @dragleave="dragging = false"
                @drop.prevent="onDrop">
                <input type="file" multiple accept="image/*" class="upload-input" @change="onFileChange" />
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                <span>{{ $t('propiedades.form.uploadText') }} <u>{{ $t('propiedades.form.uploadLink') }}</u></span>
              </label>
              <div v-if="previews.length" class="upload-previews">
                <div v-for="(p, i) in previews" :key="i" class="preview-item">
                  <img :src="p" />
                  <button type="button" class="preview-remove" @click="removePreview(i)">×</button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-outline" @click="closeNueva">{{ $t('propiedades.form.cancelar') }}</button>
            <button class="btn-primary" @click="guardarNueva" :disabled="guardando">
              {{ guardando ? $t('propiedades.form.guardando') : $t('propiedades.form.guardarPropiedad') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Editar Propiedad -->
    <div v-if="showEditar" class="modal-overlay" @click.self="closeEditar">
      <div class="modal modal-form">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">{{ $t('propiedades.form.editarTitulo') }}</h2>
            <span class="modal-id">{{ editarForm.nombre }}</span>
          </div>
          <button class="modal-close" @click="closeEditar">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="form-body">
          <div class="form-grid">
            <div class="form-group form-group-full">
              <label>{{ $t('propiedades.form.nombre') }}</label>
              <input v-model="editarForm.nombre" type="text" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.tipo') }}</label>
              <select v-model="editarForm.tipo">
                <option>Piso</option><option>Chalet</option><option>Apartamento</option><option>Casa</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.ubicacion') }}</label>
              <input v-model="editarForm.ubicacion" type="text" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.modalidad') }}</label>
              <select v-model="editarForm.modalidad">
                <option value="VENTA">{{ $t('propiedades.form.venta') }}</option><option value="ALQUILER">{{ $t('propiedades.form.alquiler') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.estado') }}</label>
              <select v-model="editarForm.estado">
                <option value="disponible">{{ $t('propiedades.form.disponible') }}</option><option value="reservado">{{ $t('propiedades.form.reservado') }}</option>
                <option value="alquilado">{{ $t('propiedades.form.alquilado') }}</option><option value="vendido">{{ $t('propiedades.form.vendido') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.precio') }}</label>
              <input v-model.number="editarForm.precio" type="number" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.habitaciones') }}</label>
              <input v-model.number="editarForm.habitaciones" type="number" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.banos') }}</label>
              <input v-model.number="editarForm.banos" type="number" />
            </div>
            <div class="form-group">
              <label>{{ $t('propiedades.form.superficie') }}</label>
              <input v-model.number="editarForm.superficie" type="number" />
            </div>
            <div class="form-group form-group-full">
              <label>{{ $t('propiedades.form.imagenes') }}</label>
              <div class="upload-previews" v-if="editarExistentes.length || editarPreviews.length">
                <div v-for="(url, i) in editarExistentes" :key="'ex-'+i" class="preview-item">
                  <img :src="url" />
                  <button type="button" class="preview-remove" @click="editarExistentes.splice(i,1)">×</button>
                </div>
                <div v-for="(p, i) in editarPreviews" :key="'new-'+i" class="preview-item">
                  <img :src="p" />
                  <button type="button" class="preview-remove" @click="removeEditarPreview(i)">×</button>
                </div>
              </div>
              <label class="upload-area" style="margin-top: 8px">
                <input type="file" multiple accept="image/*" class="upload-input" @change="onEditarFileChange" />
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                <span>{{ $t('propiedades.form.anadirImagenes') }}</span>
              </label>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-outline" @click="closeEditar">{{ $t('propiedades.form.cancelar') }}</button>
            <button class="btn-primary" @click="guardarEditar" :disabled="guardandoEditar">
              {{ guardandoEditar ? $t('propiedades.form.guardando') : $t('propiedades.form.guardarCambios') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ver Propiedad -->
    <div v-if="modalProp" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <!-- Header -->
        <div class="modal-header">
          <div>
            <h2 class="modal-title">{{ modalProp.name }}</h2>
            <span class="modal-id">ID: {{ modalProp.id }}</span>
          </div>
          <button class="modal-close" @click="closeModal">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Carousel -->
        <div class="carousel">
          <button class="carousel-btn carousel-prev" @click="prevImg" :disabled="modalImgIndex === 0">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <img :src="modalProp.images[modalImgIndex]" class="carousel-img" :alt="modalProp.name" />
          <button class="carousel-btn carousel-next" @click="nextImg" :disabled="modalImgIndex === modalProp.images.length - 1">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <div class="carousel-dots">
            <span v-for="(_, i) in modalProp.images" :key="i" :class="['carousel-dot', i === modalImgIndex ? 'dot-active' : '']" @click="modalImgIndex = i"></span>
          </div>
          <span class="carousel-counter">{{ modalImgIndex + 1 }} / {{ modalProp.images.length }}</span>
        </div>

        <!-- Details grid -->
        <div class="modal-details">
          <div class="detail-row">
            <div class="detail-block">
              <span class="detail-label">{{ $t('propiedades.ver.tipo') }}</span>
              <span class="detail-val">{{ modalProp.type }}</span>
            </div>
            <div class="detail-block">
              <span class="detail-label">{{ $t('propiedades.ver.modalidad') }}</span>
              <span :class="['badge-modal', modalProp.modalidad === 'ALQUILER' ? 'badge-alquiler' : 'badge-venta']">{{ modalProp.modalidad }}</span>
            </div>
            <div class="detail-block">
              <span class="detail-label">{{ $t('propiedades.ver.estado') }}</span>
              <span :class="['badge-status', `badge-${modalProp.statusKey}`]">
                <span class="status-dot"></span>{{ modalProp.status }}
              </span>
            </div>
          </div>
          <div class="detail-row">
            <div class="detail-block">
              <span class="detail-label">{{ $t('propiedades.ver.habitaciones') }}</span>
              <span class="detail-val">{{ modalProp.rooms }}</span>
            </div>
            <div class="detail-block">
              <span class="detail-label">{{ $t('propiedades.ver.banos') }}</span>
              <span class="detail-val">{{ modalProp.baths }}</span>
            </div>
            <div class="detail-block">
              <span class="detail-label">{{ $t('propiedades.ver.superficie') }}</span>
              <span class="detail-val">{{ modalProp.surface }} m²</span>
            </div>
          </div>
          <div class="detail-row">
            <div class="detail-block">
              <span class="detail-label">{{ $t('propiedades.ver.ubicacion') }}</span>
              <span class="detail-val">{{ modalProp.location }}</span>
            </div>
            <div class="detail-block detail-block-wide">
              <span class="detail-label">{{ $t('propiedades.ver.precio') }}</span>
              <span class="detail-val detail-price">{{ modalProp.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { API_URL } from '@/config.js'
import { bus } from '@/composables/eventBus.js'
import { useI18n } from 'vue-i18n'
import propiedadService from '@/services/propiedadService.js'
import { getEstadisticas } from '@/services/estadisticasService.js'
import CustomSelect from '@/components/CustomSelect.vue'
import { useSearch } from '@/composables/useSearch.js'
import { useFormatoPrecio } from '@/composables/useFormatoPrecio.js'
import * as XLSX from 'xlsx'

const { formatPrecio } = useFormatoPrecio()

const { t } = useI18n()
const { searchTerm } = useSearch()

const filters = ref({ tipo: '', ciudad: '', precio: '', habitaciones: '', modalidad: '', estado: '' })

const properties = ref([])
const loading = ref(false)

const ratioVenta = ref('—')
const mediaReservasDias = ref('—')
const nuevosLeadsHoy = ref('—')

const tooltip = ref({ visible: false, text: '', x: 0, y: 0 })

function showTooltip(event, text) {
  const rect = event.currentTarget.getBoundingClientRect()
  tooltip.value = {
    visible: true,
    text,
    x: rect.left + rect.width / 2,
    y: rect.top - 12,
  }
}

function hideTooltip() {
  tooltip.value.visible = false
}

async function loadProperties() {
  loading.value = true
  try {
    const data = await propiedadService.getAll()
    properties.value = data.map(p => ({
      id: p.id,
      refId: `AST-${String(p.id).padStart(4, '0')}`,
      name: p.nombre,
      image: p.imagenes?.[0] || 'https://picsum.photos/seed/default/56/56',
      images: p.imagenes?.length ? p.imagenes : ['https://picsum.photos/seed/default/800/450'],
      type: p.tipo,
      rooms: p.habitaciones,
      baths: p.banos,
      surface: p.superficie,
      location: p.ubicacion,
      rawPrecio: p.precio,
      price: formatPrice(p.precio, p.modalidad),
      modalidad: p.modalidad?.toUpperCase(),
      status: estadoLabel(p.estado),
      statusKey: p.estado?.toLowerCase(),
    }))
  } finally {
    loading.value = false
  }
}

function formatPrice(precio, modalidad) {
  return formatPrecio(precio, modalidad)
}

function estadoLabel(estado) {
  const key = estado?.toLowerCase()
  const valid = ['disponible', 'reservado', 'alquilado', 'vendido']
  return valid.includes(key) ? t('estados.' + key) : estado
}

function exportarExcel() {
  const fecha = new Date().toLocaleDateString('es-ES')
  const filas = filteredProperties.value.map(p => ({
    'Referencia':    p.refId,
    'Nombre':        p.name,
    'Tipo':          p.type,
    'Ubicación':     p.location,
    'Habitaciones':  p.rooms ?? '',
    'Baños':         p.baths ?? '',
    'Superficie m²': p.surface ?? '',
    'Precio':        p.price,
    'Modalidad':     p.modalidad,
    'Estado':        p.status,
  }))

  const ws = XLSX.utils.json_to_sheet(filas)
  ws['!cols'] = [14, 32, 14, 20, 14, 8, 16, 18, 12, 14].map(w => ({ wch: w }))

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Propiedades')

  const nombre = `propiedades-asturhome-${fecha.replace(/\//g, '-')}.xlsx`
  XLSX.writeFile(wb, nombre)
}

onMounted(async () => {
  loadProperties()
  bus.on('shortcut:nueva-propiedad', () => { showNueva.value = true })
  try {
    const stats = await getEstadisticas()
    ratioVenta.value = stats.ratioVenta + '%'
    mediaReservasDias.value = stats.mediaReservasDias
    nuevosLeadsHoy.value = '+' + stats.nuevosLeadsHoy
  } catch { /* si falla el backend muestra — */ }
})
onUnmounted(() => bus.off('shortcut:nueva-propiedad'))

const PAGE_SIZE = 5
const currentPage = ref(1)

const filteredProperties = computed(() => {
  const q = searchTerm.value.toLowerCase().trim()
  return properties.value.filter(p => {
    if (q) {
      const match = p.name?.toLowerCase().includes(q) ||
                    p.location?.toLowerCase().includes(q) ||
                    String(p.refId)?.toLowerCase().includes(q)
      if (!match) return false
    }
    if (filters.value.tipo && p.type !== filters.value.tipo) return false
    if (filters.value.ciudad && p.location !== filters.value.ciudad) return false
    if (filters.value.modalidad && p.modalidad !== filters.value.modalidad) return false
    if (filters.value.estado && p.statusKey !== filters.value.estado) return false
    if (filters.value.habitaciones && String(p.rooms) !== filters.value.habitaciones) return false
    if (filters.value.precio) {
      const max = parseFloat(filters.value.precio.replace(/[^\d]/g, ''))
      if (!isNaN(max) && p.rawPrecio > max) return false
    }
    return true
  })
})

const totalPages = computed(() => Math.ceil(filteredProperties.value.length / PAGE_SIZE))

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredProperties.value.slice(start, start + PAGE_SIZE)
})

watch(filters, () => { currentPage.value = 1 }, { deep: true })
watch(searchTerm, () => { currentPage.value = 1 })

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  if (cur <= 3) return [1, 2, 3, '...', total]
  if (cur >= total - 2) return [1, '...', total - 2, total - 1, total]
  return [1, '...', cur - 1, cur, cur + 1, '...', total]
})

const propAEliminar = ref(null)
const eliminando = ref(false)

function eliminar(prop) { propAEliminar.value = prop }

async function confirmarEliminar() {
  eliminando.value = true
  try {
    await propiedadService.delete(propAEliminar.value.id)
    await loadProperties()
    propAEliminar.value = null
  } finally {
    eliminando.value = false
  }
}

const showNueva = ref(false)
const guardando = ref(false)
const dragging = ref(false)
const previews = ref([])
const selectedFiles = ref([])
const nuevaFormVacio = () => ({ nombre: '', tipo: '', modalidad: '', estado: '', ubicacion: '', precio: null, habitaciones: null, banos: null, superficie: null })
const nuevaForm = ref(nuevaFormVacio())

function openNueva() { showNueva.value = true }
function closeNueva() { showNueva.value = false; nuevaForm.value = nuevaFormVacio(); previews.value = []; selectedFiles.value = [] }

function onFileChange(e) { addFiles(Array.from(e.target.files)) }
function onDrop(e) { dragging.value = false; addFiles(Array.from(e.dataTransfer.files)) }

function addFiles(files) {
  files.forEach(f => {
    selectedFiles.value.push(f)
    const reader = new FileReader()
    reader.onload = e => previews.value.push(e.target.result)
    reader.readAsDataURL(f)
  })
}

function removePreview(i) {
  previews.value.splice(i, 1)
  selectedFiles.value.splice(i, 1)
}

async function uploadImages() {
  const urls = []
  for (const file of selectedFiles.value) {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: fd
    })
    const data = await res.json()
    urls.push(data.url)
  }
  return urls
}

async function guardarNueva() {
  guardando.value = true
  try {
    const imagenes = await uploadImages()
    await propiedadService.create({ ...nuevaForm.value, imagenes })
    await loadProperties()
    closeNueva()
  } finally {
    guardando.value = false
  }
}

const showEditar = ref(false)
const guardandoEditar = ref(false)
const editarForm = ref({})
const editarExistentes = ref([])
const editarPreviews = ref([])
const editarFiles = ref([])
let editarId = null

function openEditar(prop) {
  editarId = prop.id
  editarForm.value = {
    nombre: prop.name,
    tipo: prop.type,
    modalidad: prop.modalidad,
    estado: prop.statusKey,
    ubicacion: prop.location,
    precio: prop.rawPrecio,
    habitaciones: prop.rooms,
    banos: prop.baths,
    superficie: prop.surface,
  }
  editarExistentes.value = [...(prop.images || [])]
  editarPreviews.value = []
  editarFiles.value = []
  showEditar.value = true
}

function closeEditar() {
  showEditar.value = false
}

function onEditarFileChange(e) {
  Array.from(e.target.files).forEach(f => {
    editarFiles.value.push(f)
    const reader = new FileReader()
    reader.onload = e => editarPreviews.value.push(e.target.result)
    reader.readAsDataURL(f)
  })
}

function removeEditarPreview(i) {
  editarPreviews.value.splice(i, 1)
  editarFiles.value.splice(i, 1)
}

async function guardarEditar() {
  guardandoEditar.value = true
  try {
    const nuevasUrls = []
    for (const file of editarFiles.value) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: fd
      })
      const data = await res.json()
      nuevasUrls.push(data.url)
    }
    const imagenes = [...editarExistentes.value, ...nuevasUrls]
    await propiedadService.update(editarId, { ...editarForm.value, imagenes })
    await loadProperties()
    closeEditar()
  } finally {
    guardandoEditar.value = false
  }
}

const modalProp = ref(null)
const modalImgIndex = ref(0)

function openModal(prop) {
  modalProp.value = prop
  modalImgIndex.value = 0
}

function closeModal() {
  modalProp.value = null
}

function prevImg() {
  if (modalImgIndex.value > 0) modalImgIndex.value--
}

function nextImg() {
  if (modalImgIndex.value < modalProp.value.images.length - 1) modalImgIndex.value++
}

</script>

<style scoped>
/* ── Root layout ─────────────────────────────────── */
.propiedades-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  gap: 16px;
}

.table-card {
  display: flex;
  flex-direction: column;
}

.props-table-wrap {
  flex: 1;
  min-height: 0;
}

/* ── Page header ─────────────────────────────────── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.page-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.page-subtitle {
  margin-top: 4px;
  color: #6b7280;
  font-size: 14px;
}

.page-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 18px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-outline:hover { background: #f9fafb; }

.btn-primary {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn-primary:hover { opacity: 0.9; }

/* ── Filters card ─────────────────────────────────── */
.filters-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.filters-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filters-row2 {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 120px;
}

.filter-group label {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.select-wrap {
  position: relative;
}

.select-wrap select {
  width: 100%;
  padding: 9px 32px 9px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  appearance: none;
  cursor: pointer;
  outline: none;
}

.select-wrap select:focus { border-color: var(--color-primary); outline: none; }
.select-wrap select:hover { border-color: var(--color-primary); }

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.filter-input {
  padding: 9px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  outline: none;
  width: 100%;
}

.filter-input::placeholder { color: #9ca3af; }
.filter-input:focus { border-color: var(--color-primary); outline: none; }
.filter-input:hover { border-color: var(--color-primary); }

.estado-group { flex: 1; }

.filter-icon-btn {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: flex-end;
}

/* ── Table card ─────────────────────────────────── */
.table-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  overflow: hidden;
  min-height: 0;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
}

.props-table thead tr { border-bottom: 1px solid #f3f4f6; }

.props-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.props-table tbody tr {
  border-bottom: 1px solid #f9fafb;
  transition: background 0.1s;
  height: 62px;
  max-height: 62px;
  overflow: hidden;
}

.props-table tbody tr:last-child { border-bottom: none; }
.empty-row { height: 62px; max-height: 62px; }
.empty-row td { border: none; }
.props-table tbody tr:hover { background: #fafafa; }

.props-table td {
  padding: 0 14px;
  height: 62px;
  font-size: 13px;
  color: #374151;
  vertical-align: middle;
}

.prop-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.prop-img {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  background: #e5e7eb;
}

.prop-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.prop-name {
  font-weight: 700;
  color: #111827;
  font-size: 13px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.prop-id {
  font-size: 12px;
  color: #9ca3af;
}

.prop-location {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 1px;
}

.type-cell {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.details-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  height: 62px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
}

.price-cell { font-weight: 700; color: #111827; }

/* ── Badges ─────────────────────────────────────── */
.badge-modal {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.badge-venta { background: #f3f4f6; color: #374151; }
.badge-alquiler { background: #fff; color: #374151; border: 1.5px solid #d1d5db; }

.badge-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 20px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.badge-disponible { background: #f0fdf4; color: #16a34a; }
.badge-disponible .status-dot { background: #22c55e; }

.badge-reservado { background: #fff7ed; color: #ea580c; }
.badge-reservado .status-dot { background: #f97316; }

.badge-alquilado { background: #eff6ff; color: #2563eb; }
.badge-alquilado .status-dot { background: #3b82f6; }

.badge-vendido { background: #f9fafb; color: #6b7280; }
.badge-vendido .status-dot { background: #9ca3af; }

/* ── Actions ─────────────────────────────────────── */
.actions-cell {
  display: flex;
  gap: 6px;
  align-items: center;
}

.action-btn {
  width: 26px;
  height: 26px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}

.action-btn:hover { background: #f3f4f6; color: #111827; }
.action-btn-ver:hover { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
.action-btn-editar:hover { background: #fffbeb; color: #d97706; border-color: #fde68a; }
.action-btn-danger:hover { background: #fef2f2; color: #dc2626; border-color: #fecaca; }

/* ── Pagination ─────────────────────────────────── */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-top: 1px solid #f3f4f6;
}

.pagination-info { font-size: 13px; color: #9ca3af; }

.pagination-pages {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
}

.page-btn:hover { background: #f3f4f6; }

.page-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.page-active:hover { background: var(--color-primary); }

.nav-btn { font-size: 18px; color: #6b7280; }

.page-dots { padding: 0 4px; color: #9ca3af; font-size: 14px; }

/* ── Stats ─────────────────────────────────────── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-teal-bg { background: var(--color-primary); }
.stat-brown-bg { background: #92400e; }
.stat-gray-bg { background: #6b7280; }

.stat-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
}

.color-teal { color: var(--color-primary); }
.color-orange { color: #ea580c; }
.color-dark { color: #111827; }

/* ── Modal ───────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 24px;
}

.modal {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 720px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f3f4f6;
}

.modal-title {
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
}

.modal-id {
  font-size: 12px;
  color: #9ca3af;
  display: block;
  margin-top: 2px;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.1s;
}

.modal-close:hover { background: #f3f4f6; color: #111827; }

/* Carousel */
.carousel {
  position: relative;
  background: #f9fafb;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: background 0.15s;
  z-index: 2;
}

.carousel-btn:hover { background: #fff; }
.carousel-btn:disabled { opacity: 0.3; cursor: default; }
.carousel-prev { left: 12px; }
.carousel-next { right: 12px; }

.carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.carousel-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: background 0.15s;
}

.dot-active { background: #fff; }

.carousel-counter {
  position: absolute;
  top: 10px;
  right: 12px;
  background: rgba(0,0,0,0.45);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 20px;
}

/* Details */
.modal-details {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  gap: 24px;
}

.detail-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-block-wide { flex: 2; }

.detail-label {
  font-size: 10px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.detail-val {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.detail-price {
  font-size: 20px;
  color: var(--color-primary);
}

/* ── Modal Confirm ───────────────────────────────── */
.modal-confirm {
  max-width: 400px;
  padding: 32px 28px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.confirm-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #fef2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-title {
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.confirm-msg {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.confirm-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.btn-danger {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #dc2626;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn-danger:hover { opacity: 0.9; }
.btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }

/* ── Modal Form ──────────────────────────────────── */
.modal-form { max-width: 640px; }

.form-body { padding: 20px 24px 24px; }

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group-full { grid-column: 1 / -1; }

.form-group label {
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.label-hint {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: #9ca3af;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 9px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  outline: none;
  background: #fff;
  transition: border-color 0.15s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: var(--color-primary); }

.form-group textarea { resize: vertical; font-family: inherit; }

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  color: #9ca3af;
  font-size: 13px;
  transition: border-color 0.15s, background 0.15s;
}

.upload-area:hover,
.upload-dragging {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 5%, transparent);
  color: var(--color-primary);
}

.upload-input { display: none; }

.upload-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.preview-item {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-remove {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: none;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 4px;
  border-top: 1px solid #f3f4f6;
}

/* ── Mobile cards (ocultas en escritorio) ────────── */
.mobile-cards { display: none; }

/* ── Tablet (≤ 1024px) ───────────────────────────── */
@media (max-width: 1024px) {
  .propiedades-root { height: auto; min-height: 0; overflow: visible; }
  .table-card       { overflow: hidden; height: auto; }
  .props-table-wrap { flex: none; overflow-x: auto; }
  .empty-row        { display: none; }

  .filters-row { flex-wrap: wrap; }
  .filter-group { min-width: calc(50% - 6px); flex: none; }

  .props-table th:nth-child(3),
  .props-table td:nth-child(3) { display: none; }

  .props-table th   { padding: 10px 8px; }
  .props-table td   { padding: 0 8px; font-size: 12px; }
  .props-table tbody tr { height: 54px; max-height: 54px; }

  .props-table { border-bottom: 1px solid #f3f4f6; }

  .stats-row { grid-template-columns: 1fr 1fr; }
}

/* ── Móvil (≤ 640px) ─────────────────────────────── */
@media (max-width: 640px) {
  .page-header { flex-direction: column; align-items: center; gap: 12px; text-align: center; }
  .page-actions { width: 100%; justify-content: center; }
  .page-title { font-size: 22px; }

  .filter-group { min-width: 100%; }
  .filters-row2 { flex-wrap: wrap; }
  .estado-group { min-width: calc(100% - 54px); }

  .props-table-wrap { display: none; }
  .empty-row { display: none; }
  .mobile-cards { display: flex; flex-direction: column; gap: 10px; padding: 12px; }

  .mobile-card {
    display: flex;
    gap: 12px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #f3f4f6;
    padding: 12px;
    align-items: flex-start;
  }

  .mobile-card-img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .mobile-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .mobile-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .mobile-card-details {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .mobile-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
  }

  .stats-row { grid-template-columns: 1fr; }

  .pagination { flex-direction: column; gap: 10px; align-items: center; }

  .modal-overlay {
    padding: 12px;
    align-items: flex-end;
  }

  .modal, .modal-form {
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 16px 16px 12px 12px;
  }

  .carousel { height: 200px; }

  .detail-row { flex-wrap: wrap; gap: 12px; }

  .form-grid { grid-template-columns: 1fr; }
}

.stat-tooltip-global {
  position: fixed;
  transform: translate(-50%, -100%);
  background: #1e293b;
  color: #f1f5f9;
  font-size: 12px;
  line-height: 1.4;
  padding: 8px 12px;
  border-radius: 6px;
  width: 200px;
  text-align: center;
  pointer-events: none;
  z-index: 9999;
}
</style>

<style>
html.dark .propiedades-root .filters-card,
html.dark .propiedades-root .table-card,
html.dark .propiedades-root .stat-card,
html.dark .propiedades-root .mobile-card  { background: #1e2333; border-color: #2d3348; }
html.dark .propiedades-root .carousel     { background: #242938; }
html.dark .propiedades-root .modal        { background: #1e2333; }
html.dark .propiedades-root .page-subtitle { color: #94a3b8; }
html.dark .propiedades-root .btn-outline  { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .propiedades-root .action-btn   { background: #2d3348; border-color: #3d4460; color: #94a3b8; }
html.dark .propiedades-root .action-btn:hover { color: #e2e8f0; }
html.dark .propiedades-root .page-btn     { background: #2d3348; border-color: #3d4460; color: #94a3b8; }
html.dark .propiedades-root .nav-btn      { color: #94a3b8; }
html.dark .propiedades-root .page-dots    { color: #64748b; }
html.dark .propiedades-root .pagination-info { color: #64748b; }
html.dark .propiedades-root .modal-close  { background: #2d3348; color: #94a3b8; }
html.dark .propiedades-root .carousel-btn { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .propiedades-root .filter-group label { color: #64748b; }
html.dark .propiedades-root .select-wrap select,
html.dark .propiedades-root .filter-input { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .propiedades-root .filter-input::placeholder { color: #64748b; }
html.dark .propiedades-root .select-arrow { color: #64748b; }
html.dark .propiedades-root .props-table th   { color: #64748b; border-bottom-color: #2d3348; }
html.dark .propiedades-root .props-table td   { color: #94a3b8; border-bottom-color: #2d3348; }
html.dark .propiedades-root .props-table thead tr { border-bottom-color: #2d3348; }
html.dark .propiedades-root .props-table tbody tr { border-bottom-color: #2d3348; }
@media (max-width: 1024px) {
  html.dark .propiedades-root .props-table { border-bottom-color: #2d3348; }
}
html.dark .propiedades-root .prop-name    { color: #e2e8f0; }
html.dark .propiedades-root .prop-id,
html.dark .propiedades-root .prop-location { color: #64748b; }
html.dark .propiedades-root .type-cell    { color: #94a3b8; }
html.dark .propiedades-root .price-cell   { color: #e2e8f0; }
html.dark .propiedades-root .badge-venta  { color: #94a3b8; }
html.dark .propiedades-root .stat-label   { color: #64748b; }
html.dark .propiedades-root .stat-value   { color: #e2e8f0; }
html.dark .propiedades-root .modal-title  { color: #e2e8f0; }
html.dark .propiedades-root .modal-id     { color: #64748b; }
html.dark .propiedades-root .detail-label { color: #64748b; }
html.dark .propiedades-root .detail-val   { color: #e2e8f0; }
html.dark .propiedades-root .detail-item  { color: #94a3b8; }
html.dark .propiedades-root .confirm-title { color: #e2e8f0; }
html.dark .propiedades-root .confirm-msg  { color: #94a3b8; }
html.dark .propiedades-root .form-group label { color: #94a3b8; }
html.dark .propiedades-root .form-group input,
html.dark .propiedades-root .form-group select { background: #2d3348; border-color: #3d4460; color: #e2e8f0; }
html.dark .propiedades-root .upload-area  { color: #64748b; border-color: #3d4460; }
html.dark .propiedades-root .props-table tbody tr:hover { background: #2d3348; }
html.dark .propiedades-root .page-btn:hover   { background: #374151; }
html.dark .propiedades-root .action-btn:hover  { background: #374151; }
html.dark .propiedades-root .modal-close:hover { background: #374151; color: #e2e8f0; }
html.dark .propiedades-root .btn-outline:hover { background: #374151; }
</style>
