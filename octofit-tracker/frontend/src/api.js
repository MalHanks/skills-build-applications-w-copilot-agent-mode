const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function endpointUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const collection = payload.results || payload.data || payload.items || payload.docs
  return Array.isArray(collection) ? collection : []
}