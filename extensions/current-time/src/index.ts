import { defineEndpoint } from '@directus/extensions-sdk';

export default defineEndpoint((router) => {
	router.get('/', (_req, res) => {
		const now = new Date();
		const timeStr = now.toLocaleString('zh-CN');
		res.json({
			currentTime: timeStr,
			timestamp: now.getTime(),
			message: '这是来自 current-time 端点的数据'
		});
	});
});
