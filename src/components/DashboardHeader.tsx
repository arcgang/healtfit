interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header>
      <h1>Health Management Dashboard</h1>
      <p>{userName}</p>
    </header>
  );
}
