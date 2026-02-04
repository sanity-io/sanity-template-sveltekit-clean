import {postQuery as query, type Post} from '$lib/sanity/queries'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals, params}) => {
  const {loadQuery} = locals.sanity
  const {slug} = params
  const initial = await loadQuery<Post>(query, {slug})

  // We pass the data in a format that is easy for `useQuery` to consume in the
  // corresponding `+page.svelte` file, but you can return the data in any
  // format you like.
  return {
    query,
    params: {slug},
    options: {initial},
  }
}
