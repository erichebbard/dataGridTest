export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.463d4656.js","app":"_app/immutable/entry/app.412efac5.js","imports":["_app/immutable/entry/start.463d4656.js","_app/immutable/chunks/index.bd5c734a.js","_app/immutable/chunks/singletons.a7494422.js","_app/immutable/entry/app.412efac5.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.bd5c734a.js"],"stylesheets":[],"fonts":[]},
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
