import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = (event) => {
  const {previewEnabled} = event.locals.sanity
  // The `event.locals.sanity.previewEnabled` value received here is set by the
  // helper function in `hooks.server.ts`. It indicates whether the app is in
  // preview mode or not. As `event.locals` is only available on the server, we
  // can expose the value to the client by returning it here.
  return {previewEnabled}
}
