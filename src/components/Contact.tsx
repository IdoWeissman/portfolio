import { contact, profile } from '../data/content'
import { LinkedInIcon, MailIcon } from './Icons'
import { ButtonLink, Section } from './ui'

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="max-w-2xl">
        <p className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">
          {contact.heading}
        </p>
        <p className="mt-4 text-lg leading-relaxed">{contact.text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${profile.email}`} variant="primary">
            <MailIcon width={18} height={18} /> {profile.email}
          </ButtonLink>
          <ButtonLink href={profile.linkedin} external>
            <LinkedInIcon width={18} height={18} /> LinkedIn
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
