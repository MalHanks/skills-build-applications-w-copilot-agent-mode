import DataPage from './DataPage'

function Leaderboard() {
  return (
    <DataPage
      title="Leaderboard"
      endpointPath="/api/leaderboard/"
      columns={[
        {
          key: 'points',
          label: 'Points',
          render: (entry) => <span className="badge badge-soft rounded-pill">{entry.points}</span>,
        },
        { key: 'userId', label: 'User', render: (entry) => entry.userId },
        { key: 'teamId', label: 'Team', render: (entry) => entry.teamId || 'Unassigned' },
      ]}
    />
  )
}

export default Leaderboard