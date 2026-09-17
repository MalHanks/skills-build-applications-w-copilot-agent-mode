const codespaceName =
  import.meta.env.VITE_CODESPACE_NAME ||
  window.location.hostname.match(/^(.+)-5173\.app\.github\.dev$/)?.[1]

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function endpointUrl(endpointPath) {
  return `${apiBaseUrl}${endpointPath}`
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