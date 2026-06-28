import { getSkills } from '@/lib/content';

export function SkillsCloud() {
  const skills = getSkills();

  return (
    <div className="space-y-6">
      {skills.map(category => (
        <div key={category.area}>
          <h3 className="text-sm font-semibold text-text-primary mb-3">{category.area}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map(skill => (
              <span
                key={skill}
                className={`px-3 py-1.5 text-sm rounded-md border ${
                  category.nivel === 'avancado'
                    ? 'bg-accent-qa/10 border-accent-qa/20 text-accent-qa'
                    : category.nivel === 'intermediario'
                    ? 'bg-surface-soft border-border-subtle text-text-secondary'
                    : 'bg-surface-default border-border-subtle text-text-muted'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
