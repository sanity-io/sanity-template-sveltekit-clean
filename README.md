# Minimal SvelteKit Site with Sanity Studio

A streamlined starter template using [SvelteKit](https://kit.svelte.dev/) for the frontend and [Sanity](https://sanity.io/) for robust content management.

![Screenshot of the SvelteKit and Sanity starter template](https://cdn.sanity.io/images/fkfgfb3d/production/c2d160119421bb5059b5e9229e7afa5ab6acfc1b-833x467.png?auto=format)

## Features

* Fetch content seamlessly with [Sanity Content Lake](https://www.sanity.io/docs/datastore).
* Render beautiful block content using [Portable Text](https://www.sanity.io/docs/presenting-block-text).
* Manage and create content with the intuitive [Sanity Studio](https://www.sanity.io/docs/sanity-studio).
* Live visual editing through [Sanity's Presentation tools](https://www.sanity.io/docs/presentation).
* Advanced image cropping and rendering via [Sanity Image URLs](https://www.sanity.io/docs/image-url).

## Demo

[Try the live demo](https://sanity-template-sveltekit-clean.sanity.build/)

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/) (v18.13 or later)
* [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli) (optional)

### Install the template

This template includes a SvelteKit app and a Sanity Studio – an open-source React application that connects to your project’s hosted dataset. The Studio is configured locally and then deployed for content collaborators. Content and assets from the hosted dataset can be queried from Sanity’s APIs.

#### 1. Initialize template with Sanity CLI

Run the command in your Terminal to initialize this template on your local computer.

See the documentation if you are [having issues with the CLI](https://www.sanity.io/help/cli-errors).

```shell
npm create sanity@latest -- --template sanity-template-sveltekit-clean
```

#### 2. Run the application and Sanity Studio

Navigate to the template directory using `cd <your app name>`, and start the development servers by running the following command

```shell
npm run dev
```

#### 3. Open the app and sign in to the Studio

Open the SvelteKit app running locally in your browser on [http://localhost:5173](http://localhost:5173).

Open the Studio running locally in your browser on [http://localhost:3333](http://localhost:3333). You should now see a screen prompting you to log in to the Studio. Use the same service (Google, GitHub, or email) that you used when you logged in to the CLI.

### Adding content with Sanity
The template comes pre-defined with a schema containing a `Post` document type.


#### Publish your first document
From the Studio, click "+ Create" and select the `Post` document type. Go ahead and create and publish the document.

Your content should now appear in your SvelteKit app ([http://localhost:3000](http://localhost:3000)) as well as in the Studio on the "Presentation" Tab

#### Extending the Sanity schema
The schema for the `Post` document type is defined in the `studio/src/schemaTypes/post.ts` file. You can [add more document types](https://www.sanity.io/docs/schema-types) to the schema to suit your needs.

### Deploying your application and inviting editors
Your SvelteKit frontend (`/sveltekit-app`) and Sanity Studio (`/studio`) are still only running on your local computer. It's time to deploy and get it into the hands of other content editors.

#### Deploy Sanity Studio

Back in your Studio directory (`/studio`), run the following command to deploy your Sanity Studio.

```shell
npx sanity deploy
```

#### Deploy SvelteKit app to Vercel

You have the freedom to deploy your SvelteKit app to your hosting provider of choice. With Vercel and GitHub being a popular choice, we'll cover the basics of that approach.

1. Create a GitHub repository from this project. [Learn more](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).
2. Create a new Vercel project and connect it to your Github repository.
3. Set the `Root Directory` to your SvelteKit app.
4. Configure your Environment Variables.

#### Invite a collaborator
Now that you’ve deployed your SvelteKit application and Sanity Studio, you can optionally invite a collaborator to your Studio. Open up [Manage](https://www.sanity.io/manage), select your project and click "Invite project members"

They will be able to access the deployed Studio, where you can collaborate together on creating content.


## Resources

* [SvelteKit Documentation](https://svelte.dev/docs/kit/introduction/)
* [Sanity.io Documentation](https://www.sanity.io/docs/)
* [Portable Text Guide](https://www.sanity.io/docs/presenting-block-text)
* [Join the Sanity Community](https://slack.sanity.io)
