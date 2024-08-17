const isProduction = process.env.NODE_ENV;
const reg = /(console.log()(.*)())/g;

function replaceConsole(prefix, match) {
  return match.replace("console.log(", `console.log("${prefix}",`);
}

// 自定义一个 loader，给 console.log 加上来自哪个文件的前缀
module.exports = function (source) {
  const options = this.getOptions();
  const { prefix } = options || {};
  if (isProduction) {
    source = source.replace(reg, (...params) =>
      replaceConsole(prefix, ...params)
    );
  }
  this.callback(null, source);
};
