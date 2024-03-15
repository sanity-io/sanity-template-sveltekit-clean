<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';

	import LiveMode from '../components/LiveMode.svelte';
</script>

<div class="container">
	<header class="header">
		<a class="header__title" href="/">SvelteKit + Sanity</a>
	</header>
	<main>
		<slot />
	</main>
	<footer class="footer">
		<p class="footer__text">
			Made with <svg
				data-sanity-icon="heart-filled"
				width="1em"
				height="1em"
				viewBox="0 0 25 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
					fill="currentColor"
					stroke="currentColor"
					stroke-width="1.2"
				/></svg
			> at Sanity
		</p>
	</footer>
</div>

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}

<style>
	.container {
		margin: 0 auto;
	}

	main {
		margin-top: 45px;
	}

	.header {
		display: flex;
		padding: 0 var(--space-1);
		border-bottom: 1px solid #ced2d9;

		z-index: 10;
		background: var(--white);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
	}

	.header .header__title {
		font-weight: 800;
		font-size: var(--font-size-3);
		line-height: var(--line-height-1);
		padding-left: var(--space-2);
		margin: var(--space-3) 0;
		text-decoration: none;
		color: var(--black);
	}

	.footer {
		display: flex;
		justify-content: flex-end;
		padding: 0 var(--space-3);
	}

	.footer .footer__text {
		font-size: var(--font-size-1);
		line-height: var(--line-height-1);
		display: flex;
		align-items: center;
		gap: 2px;
	}

	@media (min-width: 575px) {
		.container {
			max-width: var(--max-width-1);
			padding: 0 var(--space-4);
		}

		main {
			margin-top: unset;
		}

		.header {
			position: unset;
			border-bottom: none;
			margin: var(--space-3) 0;
			padding: var(--space-2) 0;
			background: unset;
		}

		.header .header__title {
			margin: var(--space-3) 0 var(--space-2);
			font-size: var(--font-size-5);
		}

		.footer {
			margin: var(--space-3) 0;
		}
	}
</style>
