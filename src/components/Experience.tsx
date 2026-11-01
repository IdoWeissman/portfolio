import { experience } from '../data/content'
import { RichText, Section } from './ui'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-14">
        {experience.map((role) => (
          <li key={role.company + role.period} className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-8">
            <p className="text-sm font-medium text-stone-500 md:pt-1 dark:text-stone-400">{role.period}</p>
            <div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-50">{role.title}</h3>
              <p className="mt-1 font-medium text-accent">
                {role.company}
                {role.companyNote && (
                  <span className="font-normal text-stone-500 dark:text-stone-400"> · {role.companyNote}</span>
                )}
              </p>
              <ul className="mt-5 space-y-3 leading-relaxed">
                {role.bullets.map((b) => (
                  <li key={b} className="relative pl-5">
                    <span aria-hidden className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-accent/70" />
                    <RichText text={b} />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
