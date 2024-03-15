<script lang="ts">
	import { onMount } from 'svelte';
	import { useLiveMode } from '@sanity/svelte-loader';
	import { client } from '$lib/sanity/client';

	onMount(() => useLiveMode({ client }));
</script>
