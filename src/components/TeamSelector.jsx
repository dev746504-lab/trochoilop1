export default function TeamSelector({ teams, currentTeamId, onSelect, disabled }) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {teams.map((team) => (
        <button
          key={team.id}
          disabled={disabled}
          onClick={() => onSelect(team.id)}
          className={`tab-team btn-cartoon px-3 py-2 text-sm md:text-base ${currentTeamId === team.id ? 'active' : ''}`}
          style={{ background: team.color }}
        >
          {team.emoji} {team.label}
        </button>
      ))}
    </div>
  );
}
