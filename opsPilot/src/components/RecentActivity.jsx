import useRecentActivity from "../hooks/useRecentActivity";

export default function RecentActivity() {
  const activities = useRecentActivity();
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity}>{activity}</li>
      ))}
    </ul>
  );
}
