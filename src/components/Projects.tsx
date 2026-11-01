import { projects, type Project } from '../data/content'
import { ExternalIcon, GitHubIcon } from './Icons'
import { Section, Tag } from './ui'

function ProjectCard({ project }: { project: Project }) {
  const linkClass =
    'inline-flex items-center gap-1.5 text-sm font-semibold text-stone-700 hover:text-accent dark:text-stone-300'

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-lg hover:shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 dark:hover:shadow-black/30">
      <div className="aspect-video overflow-hidden bg-accent-soft">
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <div aria-hidden className="flex size-full items-center justify-center text-5xl font-bold text-accent/40">
            {project.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">{project.name}</h3>
        <p className="mt-2 flex-1 leading-relaxed">{project.description}</p>
        <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
        {(project.repo || project.demo) && (
          <div className="mt-6 flex gap-5 border-t border-stone-100 pt-4 dark:border-stone-800">
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GitHubIcon width={16} height={16} /> Code
                <span className="sr-only">for {project.name} (opens in a new tab)</span>
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <ExternalIcon width={16} height={16} /> Live demo
                <span className="sr-only">of {project.name} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </Section>
  )
}
