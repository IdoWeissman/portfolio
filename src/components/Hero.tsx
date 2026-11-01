import { profile } from '../data/content'
import { DownloadIcon, GitHubIcon, LinkedInIcon, PinIcon } from './Icons'
import { ButtonLink } from './ui'

export default function Hero() {
  return (
    <section id="top" className="grid items-center gap-12 pt-16 pb-12 sm:pt-24 md:grid-cols-[1fr_auto]">
      <div>
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {profile.availability}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl dark:text-stone-50">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl font-semibold text-accent sm:text-2xl">{profile.title}</p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed">{profile.pitch}</p>
        <p className="mt-4 flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
          <PinIcon width={16} height={16} />
          {profile.location}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={profile.cv} variant="primary" download>
            <DownloadIcon width={18} height={18} /> Download CV
          </ButtonLink>
          <ButtonLink href={profile.github} external>
            <GitHubIcon width={18} height={18} /> GitHub
          </ButtonLink>
          <ButtonLink href={profile.linkedin} external>
            <LinkedInIcon width={18} height={18} /> LinkedIn
          </ButtonLink>
        </div>
      </div>
      <img
        src={profile.photo}
        srcSet={`${profile.photoSmall} 288w, ${profile.photo} 480w`}
        sizes="(min-width: 768px) 18rem, (min-width: 640px) 16rem, 14rem"
        alt={profile.photoAlt}
        width={480}
        height={600}
        fetchPriority="high"
        className="mx-auto w-56 rounded-2xl object-cover shadow-xl shadow-stone-900/10 ring-1 ring-stone-900/5 sm:w-64 md:w-72 dark:shadow-black/40 dark:ring-white/10"
      />
    </section>
  )
}
