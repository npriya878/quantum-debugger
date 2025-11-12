interface ThemeSelectorProps {
  currentTheme: 'green' | 'magenta' | 'cyan' | 'amber';
  onThemeChange: (theme: 'green' | 'magenta' | 'cyan' | 'amber') => void;
}

const themes = [
  { id: 'green' as const, name: 'Neon Green', icon: '🟢' },
  { id: 'magenta' as const, name: 'Magenta', icon: '💜' },
  { id: 'cyan' as const, name: 'Cyan', icon: '🔵' },
  { id: 'amber' as const, name: 'Amber', icon: '🟠' },
];

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-gray-600 rounded-lg">
      <span className="text-xs font-mono text-gray-400">[THEME]</span>
      <div className="flex gap-1">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`px-2 py-1 text-xs font-mono rounded transition-all ${
              currentTheme === theme.id
                ? 'bg-white/20 border border-white/50'
                : 'hover:bg-white/10'
            }`}
            title={theme.name}
          >
            {theme.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
