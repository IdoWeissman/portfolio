import { about } from '../data/content'
import { RichText, Section } from './ui'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <div className="space-y-5 text-lg leading-relaxed">
          {about.paragraphs.map((p) => (
            <p key={p}>
              <RichText text={p} />
            </p>
          ))}
        </div>
        <div className="space-y-8">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-stone-200 ring-1 ring-stone-200 dark:bg-stone-800 dark:ring-stone-800">
            {about.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-stone-50 p-5 dark:bg-stone-950">
                <dt className="mt-1 text-sm text-stone-500 dark:text-stone-400">{s.label}</dt>
                <dd className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">{s.value}</dd>
              </div>
            ))}
          </dl>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-stone-900 dark:text-stone-100">Education</dt>
              <dd className="mt-1">
                {about.education.degree}, {about.education.school} ({about.education.year})
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-stone-900 dark:text-stone-100">Languages</dt>
              <dd className="mt-1">{about.languages.join(' · ')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  )
}
