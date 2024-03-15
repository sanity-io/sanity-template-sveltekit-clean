import {
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_API_VERSION,
	PUBLIC_SANITY_STUDIO_URL
} from '$env/static/public';

export function assertEnvVar<T>(value: T | undefined, name: string): T {
	if (value === undefined) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value;
}

export const dataset = assertEnvVar(PUBLIC_SANITY_DATASET, 'PUBLIC_SANITY_DATASET');

export const projectId = assertEnvVar(PUBLIC_SANITY_PROJECT_ID, 'PUBLIC_SANITY_PROJECT_ID');

export const apiVersion = PUBLIC_SANITY_API_VERSION || '2024-03-15';

export const studioUrl = PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333';
