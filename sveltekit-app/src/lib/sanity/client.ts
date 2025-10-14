import {createClient} from '@sanity/sveltekit'
import {apiVersion, projectId, dataset, studioUrl} from '$lib/sanity/api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl,
  },
})
