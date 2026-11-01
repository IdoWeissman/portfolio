import { useEffect, useRef, type ReactNode } from 'react'

/** Adds `is-visible` to the element the first time it scrolls into view (pairs with `.reveal` in index.css). */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/** Renders `**bold**` segments from content strings as <strong>. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-stone-900 dark:text-stone-100">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="reveal py-20 sm:py-28">
      <h2
        id={`${id}-title`}
        className="mb-10 flex items-center gap-4 text-sm font-semibold tracking-[0.2em] text-accent uppercase"
      >
        {title}
        <span aria-hidden className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
      </h2>
      {children}
    </section>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">{children}</li>
  )
}

const buttonStyles = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover',
  secondary:
    'border border-stone-300 text-stone-800 hover:border-accent hover:text-accent dark:border-stone-700 dark:text-stone-200',
}

export function ButtonLink({
  href,
  variant = 'secondary',
  external,
  download,
  children,
}: {
  href: string
  variant?: keyof typeof buttonStyles
  external?: boolean
  download?: boolean
  children: ReactNode
}) {
  return (
    <a
      href={href}
      download={download || undefined}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${buttonStyles[variant]}`}
    >
      {children}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  )
}
