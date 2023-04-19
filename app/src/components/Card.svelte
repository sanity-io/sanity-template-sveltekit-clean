<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import type { Post } from '$lib/utils/sanity';

	export let post: Post;
</script>

<div class="card">
	{#if post.mainImage}
		<img
			class="card__cover"
			src={urlFor(post.mainImage).width(500).height(300).url()}
			alt="Cover image for {post.title}"
		/>
	{:else}
		<div class="card__cover--none" />
	{/if}

	<div class="card__container">
		<h3 class="card__title">
			<a class="card__link" href={`/post/${post.slug.current}`}>
				{post.title}
			</a>
		</h3>
		<p class="card__excerpt">{post.excerpt}</p>
		<p class="card__date">
			{formatDate(post._createdAt)}
		</p>
	</div>
</div>
