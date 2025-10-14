import {token} from '$lib/sanity/api.server'
import {client} from '$lib/sanity/client'

export const serverClient = client.withConfig({
  token,
  useCdn: false,
  stega: true,
})
