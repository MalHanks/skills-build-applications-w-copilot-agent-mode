import DataPage from './DataPage'

function Workouts() {
  return (
    <DataPage
      title="Workouts"
      endpointPath="/api/workouts/"
      columns={[
        { key: 'name', label: 'Workout', render: (workout) => workout.name },
        { key: 'difficulty', label: 'Difficulty', render: (workout) => workout.difficulty },
        {
          key: 'durationMinutes',
          label: 'Duration',
          render: (workout) => `${workout.durationMinutes} min`,
        },
        { key: 'description', label: 'Focus', render: (workout) => workout.description },
      ]}
    />
  )
}

export default Workouts