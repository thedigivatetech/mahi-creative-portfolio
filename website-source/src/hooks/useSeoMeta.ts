/**
 * useSeoMeta — Dynamically sets <title>, <meta description> and Open Graph tags.
 *
 * Call at the top of any page component. The updates run on every render where
 * the values change, so navigation between project detail pages will always pick
 * up the correct title and description.
 *
 * Usage:
 *   useSeoMeta({
 *     title: 'Beautyworld Dubai 2026 — Video Reel | Mahi Hossain',
 *     description: 'Cinematic brand film capturing the global fragrance trade summit...',
 *   })
 */

import { useEffect } from 'react'

export interface SeoMetaProps {
  title?: string
  description?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  /** Canonical URL — supply full absolute URL when known */
  canonical?: string
  /** Additional JSON-LD structured data to inject */
  jsonLd?: object
}

const SITE_NAME = 'Syed Hussain'
const DEFAULT_TITLE = 'Syed Hussain — Creative Director & Video Editor | UK'
const DEFAULT_DESCRIPTION =
  'Premium video editing, short-form content, creative direction and digital services for UK businesses. From concept to delivery — I lead the creative vision.'
const DEFAULT_OG_IMAGE = '/images/profile/mahi-portrait.jpg'

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name'
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function injectJsonLd(data: object, id: string) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data, null, 0)
}

export function useSeoMeta({
  title,
  description,
  ogImage,
  ogType = 'website',
  canonical,
  jsonLd,
}: SeoMetaProps = {}) {
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const resolvedDesc = description || DEFAULT_DESCRIPTION
  const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE

  useEffect(() => {
    // Page title
    document.title = resolvedTitle

    // Primary meta
    setMeta('description', resolvedDesc)
    setMeta('author', SITE_NAME)

    // Open Graph
    setMeta('og:type', ogType, true)
    setMeta('og:title', resolvedTitle, true)
    setMeta('og:description', resolvedDesc, true)
    setMeta('og:image', resolvedOgImage, true)
    setMeta('og:site_name', SITE_NAME, true)
    setMeta('og:locale', 'en_GB', true)

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', resolvedTitle)
    setMeta('twitter:description', resolvedDesc)
    setMeta('twitter:image', resolvedOgImage)

    // Canonical
    if (canonical) setLink('canonical', canonical)

    // Structured data
    if (jsonLd) injectJsonLd(jsonLd, 'page-json-ld')
  }, [resolvedTitle, resolvedDesc, resolvedOgImage, ogType, canonical, jsonLd])
}
