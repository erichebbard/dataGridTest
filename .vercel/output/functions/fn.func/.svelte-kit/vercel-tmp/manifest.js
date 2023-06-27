export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.d63b84e6.js","app":"_app/immutable/entry/app.1f8a15ef.js","imports":["_app/immutable/entry/start.d63b84e6.js","_app/immutable/chunks/index.bd5c734a.js","_app/immutable/chunks/singletons.b18e7d4b.js","_app/immutable/entry/app.1f8a15ef.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.bd5c734a.js"],"stylesheets":[],"fonts":[]},
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
