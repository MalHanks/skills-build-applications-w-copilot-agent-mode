import DataPage from './DataPage'

function Users() {
  return (
    <DataPage
      title="Users"
      resource="users"
      columns={[
        { key: 'displayName', label: 'Name', render: (user) => user.displayName },
        { key: 'username', label: 'Username', render: (user) => user.username },
        { key: 'email', label: 'Email', render: (user) => user.email },
        { key: 'teamId', label: 'Team', render: (user) => user.teamId || 'Unassigned' },
      ]}
    />
  )
}

export default Users