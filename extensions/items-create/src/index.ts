import { defineHook } from '@directus/extensions-sdk';

export default defineHook(({ action}, {logger}) => {
	action('items.create', async (meta) => {
		const { collection, key } = meta;
		logger.info(`New item created in ${collection} with ID: ${key}`);
	  });
});
