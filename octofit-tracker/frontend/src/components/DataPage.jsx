import { useEffect, useState } from 'react'
import { endpointUrl, normalizeCollection } from '../api'

function DataPage({ columns, resource, title }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const url = endpointUrl(resource)

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      try {
        setStatus('loading')
        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        setItems(normalizeCollection(await response.json()))
        setStatus('ready')
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return
        }

        setError(requestError.message)
        setStatus('error')
      }
    }

    loadItems()

    return () => controller.abort()
  }, [url])

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">OctoFit data</p>
          <h1 className="page-title">{title}</h1>
        </div>
        <div className="endpoint-chip">{url}</div>
      </div>

      <div className="data-panel">
        {status === 'loading' && <div className="loading-state">Loading {title.toLowerCase()}...</div>}
        {status === 'error' && <div className="error-state text-danger">{error}</div>}
        {status === 'ready' && items.length === 0 && <div className="empty-state">No records found.</div>}
        {status === 'ready' && items.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    {columns.map((column) => (
                      <td key={column.key}>{column.render(item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default DataPage