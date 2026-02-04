<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import Card from '../components/Card.svelte'
  import Welcome from '../components/Welcome.svelte'
  import type {PageProps} from './$types'

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const posts = $derived($query.data)
</script>

<section>
  {#if posts?.length}
    {#each posts as post}
      <Card {post} />
    {/each}
  {:else}
    <Welcome />
  {/if}
</section>
