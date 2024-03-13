# A minimal SvelteKit site with Sanity Studio

This starter uses [SvelteKit](https://kit.svelte.dev/) for the frontend and [Sanity](https://sanity.io/) to handle its content.

## Featuring

- How to fetch content as data from [the Sanity Content Lake](https://www.sanity.io/docs/datastore)
- How to render block content with [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- A [Sanity Studio](https://www.sanity.io/docs/sanity-studio) to create and edit content
- Visual editing with live updates through [Presentation](https://www.sanity.io/docs/presentation)
- How to crop and render images with [Sanity Image URLs](https://www.sanity.io/docs/image-url)

> **Note**
>
> This starter features an `/app` and a `/studio` folder. The `/app` folder contains the frontend code, and the `/studio` folder contains the Sanity Studio code.
>
> It is configured as a monorepo using [pnpm workspaces](https://pnpm.io/workspaces), but you can treat these directories as separate projects if you prefer.

## Prerequisities

- [Node.js](https://nodejs.org/en/) (v14.18 or later)
- [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli) (optional)

## Getting started

Run the following commands from the **root directory** to prepare both applications:

1. Install dependencies

```sh
pnpm install
```

2. Select or create a Sanity project and dataset, and output the details to a `.env.local` file

```sh
cd studio && pnpm sanity init --env .env.local
```

3. Copy environment variable files

```sh
cp ./app/.env.example ./app/.env
cp ./studio/.env.example ./studio/.env
```

4.  Start the development servers:

```sh
pnpm dev
```

- Your SvelteKit app should now be running on [http://localhost:5173/](http://localhost:5173/).
- Your Studio should now be running on [http://localhost:3333/](http://localhost:3333/).

_Feel free to move each of the folders to their own location and check them into version control._

### Add content

1. Visit the Studio and create and publish a new `Post` document
2. Visit the App and refresh the page to see your content rendered on the page

The schema for the `Post` document is defined in the `/studio/schemas` folder. You can add more documents and schemas to the Studio to suit your needs.

## Deployments

The `/app` and `/studio` folders are meant to be deployed separately.

Make sure that after `/app` is deployed the `.env` file in `/studio` is updated with its deployment URL under `SANITY_STUDIO_PREVIEW_URL`.

And `/app` has a `.env` file with `SANITY_STUDIO_URL` that points to the Studio's deployment URL.
