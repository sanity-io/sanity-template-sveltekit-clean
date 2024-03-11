<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';

	export let data: PageData;
	const q = useQuery(data);

	$: ({ data: post } = $q);
</script>

<section class="post">
	{#if post.mainImage}
		<img
			class="post__cover"
			src={urlFor(post.mainImage).url()}
			alt="Cover image for {post.title}"
		/>
	{:else}
		<div class="post__cover--none" />
	{/if}
	<div class="post__container">
		<h1 class="post__title">{post.title}</h1>
		{#if post.excerpt}
			<p class="post__excerpt">{post.excerpt}</p>
		{/if}
		<p class="post__date">
			{formatDate(post._createdAt)}
		</p>
		{#if post.body}
			<div class="post__content">
				<PortableText components={{}} value={post.body} />
			</div>
		{/if}
	</div>
</section>
