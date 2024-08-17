/**
 * 自定义一个 plugin，功能是往 html 上加 meta 标签
 */
class AddMetaPlugin {
  constructor(options) {
    this.options = options || {};
  }
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("AddMetaPlugin", (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: "AddMetaPlugin",
          stage: compilation.constructor.PROCESS_ASSETS_STAGE_ADDITIONS,
          additionalAssets: true,
        },
        (assets) => this.addMetaTags(assets, compilation)
      );
    });
  }

  addMetaTags(assets, compilation) {
    return new Promise((resolve) => {
      const { meta } = this.options || {};
      const metaTags = Object.keys(meta)
        .map((key) => {
          return `<meta ${key}="${meta[key]}" />`;
        })
        .join("");
      const assetKeys = Object.keys(assets).filter((key) =>
        key.endsWith(".html")
      );
      for (const assetKey of assetKeys) {
        let htmlContent = compilation.assets[assetKey].source();
        htmlContent = htmlContent.replace("</head>", metaTags + "</head>");
        compilation.assets[assetKey] = {
          source: () => htmlContent,
          size: () => htmlContent.length,
        };
      }
      resolve();
    });
  }
}

module.exports = AddMetaPlugin;
