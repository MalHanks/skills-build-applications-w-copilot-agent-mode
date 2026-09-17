import DataPage from './DataPage'

function Teams() {
  return (
    <DataPage
      title="Teams"
      endpointPath="/api/teams/"
      columns={[
        { key: 'name', label: 'Team', render: (team) => team.name },
        { key: 'mascot', label: 'Mascot', render: (team) => team.mascot || 'Pending' },
      ]}
    />
  )
}

export default Teams