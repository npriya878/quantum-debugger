import { Universe } from '../types';
import { UniverseCard } from './UniverseCard';

interface UniverseSolutionsProps {
  universes: Universe[];
  theme: 'green' | 'magenta' | 'cyan' | 'amber';
}

const themeColors = {
  green: 'text-green-400 border-green-600',
  magenta: 'text-pink-400 border-pink-600',
  cyan: 'text-cyan-400 border-cyan-600',
  amber: 'text-amber-400 border-amber-600',
};

export function UniverseSolutions({ universes, theme }: UniverseSolutionsProps) {
  const colors = themeColors[theme];

  return (
    <div className="mt-12">
      <div className="mb-8">
        <h2 className={`text-2xl font-mono font-bold ${colors} mb-1 uppercase`}>
          [ Parallel Universe Solutions ]
        </h2>
        <div className={`h-1 ${colors.split(' ')[1]} w-32`} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {universes.map((universe, index) => (
          <UniverseCard key={index} universe={universe} index={index + 1} theme={theme} />
        ))}
      </div>

      <div className={`mt-8 bg-black/50 border-2 ${colors} rounded-lg p-4 font-mono text-sm`}>
        <p className={colors.split(' ')[0]}>
          {'> '}ANALYSIS: Each universe represents a different approach. Consider chaos ratings and trade-offs
          before deploying. Sometimes the cursed solution is exactly what you need.
        </p>
      </div>
    </div>
  );
}
