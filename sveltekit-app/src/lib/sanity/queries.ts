import type {PortableTextBlock} from '@portabletext/types'
import type {SanityImageObject} from '@sanity/sveltekit/image'
import {groq} from '@sanity/sveltekit'

/**
 * `<Image>` needs the Studio crop and hotspot, plus the asset URL and LQIP.
 * Custom GROQ functions have to be declared at the start of every query that calls them.
 */
const imageFunctions = /* groq */ `
fn image::asset($asset) = $asset->{url, metadata{lqip}};
fn image::field($image) = $image{crop, hotspot, "asset": image::asset(asset)};
`

export const postQuery = groq`${imageFunctions}
*[_type == "post" && slug.current == $slug][0]{
  _type,
  _createdAt,
  title,
  slug,
  excerpt,
  body,
  "mainImage": image::field(mainImage)
}`

export const postsQuery = groq`${imageFunctions}
*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
  _type,
  _createdAt,
  title,
  slug,
  excerpt,
  "mainImage": image::field(mainImage)
}`

export interface Post {
  _type: 'post'
  _createdAt: string
  title?: string
  slug: {current: string}
  excerpt?: string
  mainImage?: SanityImageObject | null
  body?: PortableTextBlock[]
}
