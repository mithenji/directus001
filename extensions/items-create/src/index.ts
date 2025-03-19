import { defineHook } from '@directus/extensions-sdk';

export default defineHook(({ action }, { services, database, logger, getSchema }) => {
	const { NotificationsService } = services;

	action('items.create', async (meta, context) => {
		const { collection, key, payload } = meta;
		logger.info(`New item created in ${collection} with ID: ${key}`);
		
		try {
			// 获取通知服务实例
			const schema = await getSchema();
			const notificationsService = new NotificationsService({
				schema: schema,
				knex: database,
			});
			
			// 计算项目名称 (使用标题字段，或者回退到 ID)
			let itemName = key;
			if (payload && (payload.title || payload.name)) {
				itemName = payload.title || payload.name;
			}
			
			// 获取创建者信息
			const userId = context.accountability?.user;
			
			// 创建通知内容
			const message = `新项目创建成功: "${itemName}" 在集合 "${collection}"`;
			
			// 发送通知给当前用户
			if (userId) {
				await notificationsService.createOne({
					recipient: userId,
					sender: userId,
					subject: '项目创建通知',
					message: message,
					collection: collection,
					item: key
				});
				logger.info(`Notification sent to user ${userId}`);
			}
		} catch (error) {
			logger.error(`Failed to send notification: ${error}`);
		}
	});
});
