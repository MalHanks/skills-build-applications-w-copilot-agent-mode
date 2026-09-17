import DataPage from './DataPage'

function Activities() {
  return (
    <DataPage
      title="Activities"
      endpointPath="/api/activities/"
      columns={[
        { key: 'type', label: 'Activity', render: (activity) => activity.type },
        {
          key: 'durationMinutes',
          label: 'Duration',
          render: (activity) => `${activity.durationMinutes} min`,
        },
        {
          key: 'caloriesBurned',
          label: 'Calories',
          render: (activity) => activity.caloriesBurned,
        },
        {
          key: 'completedAt',
          label: 'Completed',
          render: (activity) => new Date(activity.completedAt).toLocaleDateString(),
        },
      ]}
    />
  )
}

export default Activities