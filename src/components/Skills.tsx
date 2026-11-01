import { skills } from '../data/content'
import { Section, Tag } from './ui'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.name}>
            <dt className="mb-3 font-semibold text-stone-900 dark:text-stone-100">{group.name}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
