// 检测当前node，npm的版本号是否符合package.json中的要求

//粉笔  设置终端字符串样式
var chalk = require('chalk')
//与版本号有关
var semver = require('semver')
var packageConfig = require('../package.json')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}
// process.version 当前node的版本号
var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),//只留数字小数点
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
]

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    // satisfies(version, range): Return true if the version satisfies the range.
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    // 退出进程 >0标识失败   =0标识成功
    process.exit(1)
  }
}
