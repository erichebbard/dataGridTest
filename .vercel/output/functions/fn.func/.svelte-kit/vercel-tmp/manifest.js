export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.e4e47253.js","app":"_app/immutable/entry/app.997dea8d.js","imports":["_app/immutable/entry/start.e4e47253.js","_app/immutable/chunks/index.741e112f.js","_app/immutable/chunks/singletons.25b0e361.js","_app/immutable/entry/app.997dea8d.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.741e112f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
