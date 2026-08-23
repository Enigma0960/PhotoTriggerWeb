// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const localePersistenceScript = `
(() => {
	const match = window.location.pathname.match(/^\\/(en|ru)(?:\\/|$)/);

	if (!match) {
		return;
	}

	document.cookie = [
		'iris_locale=' + match[1],
		'Path=/',
		'Max-Age=' + 60 * 60 * 24 * 365,
		'SameSite=Lax',
	].join('; ');
})();
`;

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Project Iris Documentation',
			head: [
				{
					tag: 'script',
					content: localePersistenceScript,
				},
			],
			defaultLocale: 'en',
			locales: {
				en: {
					label: 'English',
					lang: 'en',
				},
				ru: {
					label: 'Русский',
					lang: 'ru',
				},
			},
			sidebar: [
				{
					label: 'Guides',
					translations: {
						ru: 'Руководства',
					},
					items: [
						{ slug: 'guides/example' },
					],
				},
				{
					label: 'Hardware',
					translations: {
						ru: 'Аппаратная часть',
					},
					items: [
						{
							label: 'Triggers',
							translations: {
								ru: 'Триггеры',
							},
							items: [{ slug: 'hardware/triggers/lightning' }],
						},
					],
				},
				{
					label: 'Reference',
					translations: {
						ru: 'Справочник',
					},
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
