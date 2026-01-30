# Actualización del Sistema de Búsqueda por Zip Code

## Resumen de Cambios

Se ha actualizado la funcionalidad del buscador por zip code para implementar un flujo de dos pasos que mejora la precisión de la búsqueda.

## Nuevo Flujo de Funcionamiento

### Flujo Anterior:
1. Capturar zip-code del usuario
2. Consultar directamente Strapi filtrando por `locations.ZipCode`
3. Retornar `InstanceLink`

### Nuevo Flujo:
1. **Capturar zip-code** del usuario desde el input
2. **Consultar API externa** para obtener el `LocationKey` (siteid)
3. **Consultar Strapi** usando el `LocationKey` para obtener el `InstanceLink`
4. **Validar** y mostrar resultados o mensajes de error apropiados

## Archivos Modificados

### 1. Queries de GraphQL
- **`src/data/gql_queries/popups_queries/login_popup_query.ts`**
  - Modificado para filtrar por `LocationKey` en lugar de `locations.ZipCode`
  
- **`src/data/gql_queries/popups_queries/tel_popup_query.ts`**
  - Modificado para filtrar por `LocationKey` en lugar de `locations.ZipCode`

### 2. Nuevo Servicio de API
- **`src/services/locationApi.ts`** (NUEVO)
  - `getLocationKeyByZipCode(zipcode: string)`: Obtiene solo el siteid/LocationKey
  - `getLocationDataByZipCode(zipcode: string)`: Obtiene datos completos de ubicación
  - Maneja errores y casos edge apropiadamente

### 3. Componente Popup
- **`src/components/popups/popup_login_form.tsx`**
  - Actualizadas las global actions (`useSubmitFormZip`, `useSubmitFormTel`)
  - Implementado flujo de dos pasos
  - Mejorado el manejo de estados (loading, success, error)
  - Agregados mensajes de error específicos y bilingües

## Estructura de Respuesta de la API Externa

```json
{
  "code": "1",
  "msg": "Customer not found",
  "result": {
    "siteid": "CRY",           // Este es el LocationKey
    "phone": "409-684-7021",
    "location": "Crystal Beach, Hamshire/Fannett, South Houston"
  }
}
```

## Estados de Error Manejados

1. **`location_not_found`**: No se encontró información para el zip code en la API externa
2. **`portal_not_found`**: No se encontró una oficina en Strapi con el LocationKey obtenido
3. **`server_error`**: Error general del servidor o de red

## Mensajes de Error (Bilingües)

| Error | Español | English |
|-------|---------|---------|
| location_not_found | "No se encontró información para este código postal" | "No information found for this zip code" |
| portal_not_found | "Lo sentimos, no hay un portal disponible para su ubicación" | "Sorry, there is no portal available for your location" |
| server_error | "Error del servidor. Por favor, intente nuevamente" | "Server error. Please try again" |

## Configuración Requerida

### Variables de Entorno

Opcionalmente, puedes configurar la URL de la API en las variables de entorno:

```env
PUBLIC_LOCATION_API_URL=https://rtatel.com/planbuilder/api
```

**Nota**: Si no se configura, el sistema usará la URL por defecto.

## Validaciones Implementadas

1. ✅ Validación de que el zip code sea de 5 dígitos (HTML input maxLength)
2. ✅ Validación de respuesta de la API externa
3. ✅ Validación de existencia del LocationKey en Strapi
4. ✅ Manejo de errores de red
5. ✅ Estados de loading apropiados
6. ✅ Mensajes de error específicos y traducidos

## Migración desde la Versión Anterior

### ⚠️ Cambios en Strapi Requeridos

Asegúrate de que la colección `offices` en Strapi tenga el campo `LocationKey` configurado:

```javascript
// Ejemplo de filtro en Strapi
filters: { 
  LocationKey: { 
    eq: "CRY" 
  } 
}
```

### Compatibilidad

- El componente mantiene la misma interfaz (`Props`)
- Los mismos props funcionan sin cambios
- La experiencia de usuario se mantiene igual, solo mejora la precisión

## Testing

Para probar el nuevo flujo:

1. Ingresar un zip code válido (ej: "77650")
2. El sistema debería:
   - Mostrar el spinner de loading
   - Consultar la API externa
   - Obtener el LocationKey
   - Consultar Strapi
   - Mostrar el portal o un mensaje de error apropiado

## Próximos Pasos (Opcional)

- [ ] Agregar caché para LocationKeys consultados frecuentemente
- [ ] Implementar rate limiting para la API externa
- [ ] Agregar analytics para track de búsquedas exitosas/fallidas
- [ ] Implementar sugerencias de zip codes cercanos si no se encuentra
