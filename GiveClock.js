// LiteLoader-AIDS automatic generated
/// <reference path="e:/code/LLSE/dts/helperlib/src/index.d.ts"/> 

regesterPlugin()

function regesterPlugin() {
  ll.registerPlugin(
    "GiveClock",
    "进服检测背包自动给钟，指令获取钟，建议配合钟菜单使用。",
    [1, 0, 1, Version.Release],
    {
      "author": "XCLHove",
      "github": "https://github.com/xclhove/LiteLoaderPlugins-GiveClock",
      "gitee": "https://gitee.com/xclhove/LiteLoaderPlugins-GiveClock"
    }
  )
  registerCommands()
  showPluginInfo()
}

/**
 * 注册命令
 */
function registerCommands() {
  //读取配置文件
  let config = redConfig()
  //进服给钟
  mc.listen("onJoin", (player) => {
    //进服给钟
    giveClock(player);
  })
  //进服提示
  let message = `${Format.Italics}${Format.DarkGreen}获取钟请输入：/${config.getClockCommand} 或 /${config.getClockCommandAlias}`
  joinPrompt(message);

  //注册指令：注册获取钟的顶层指令
  const getClockCommand = mc.newCommand(config.getClockCommand, `${Format.Italics}${Format.DarkGreen}获取钟`, PermType.Any, 0x80, config.getClockCommandAlias)
  //配置指令：新增一条指令重载
  getClockCommand.overload([])
  //配置指令：设置指令回调函数(执行指令就会执行回调函数)
  getClockCommand.setCallback((cmd, origin, output, results) => {
    //非玩家执行命令不给钟
    if (origin.type !== OriginType.Player) {
      return false;
    }
    let player = origin.player
    //给予执行指令的玩家钟
    giveClock(player);
  })
  //安装指令：安装指令
  getClockCommand.setup()
  //玩家使用钟时执行命令
  if (config.runCommandOnUseClock) {
    onUseClockRunCommand(config.onUseClockRunCommand)
  }
  //玩家对方块使用钟时执行命令
  if (config.runCommandOnUseClockOn) {
    onUseClockOnRunCommand(config.onUseClockOnRunCommand)
  }
}

/**
 * 读取配置文件
 * @returns 返回配置文件的Json对象
 */
function redConfig() {
  let defaultConfig = {
    config: {
      getClockCommand: "getclock",
      getClockCommandAlias: "gc",
      runCommandOnUseClock: 0,
      onUseClockRunCommand: 'list',
      runCommandOnUseClockOn: 0,
      onUseClockOnRunCommand: 'list'
    }
  }
  let jsonConfigFile = new JsonConfigFile("plugins/GiveClock/config.json", JSON.stringify(defaultConfig))
  let config = JSON.parse(JSON.stringify(jsonConfigFile.get('config')))
  jsonConfigFile.close()
  return config
}

/**
 * 进服提示
 * @param {string} message 要提示的信息
 */
function joinPrompt(message) {
  mc.listen("onJoin", (player) => {
    player.tell(message);
  })
}

/**
 * 进服给钟
 * @param {Player} player 要发放钟的玩家
 */
function giveClock(player) {
  const clock = mc.newItem("minecraft:clock", 1);
  let playerBackpack = player.getInventory();

  //检查玩家背包空间是否充足
  if (!playerBackpack.hasRoomFor(clock)) {
    //背包空间不足则提示
    player.tell(`${Format.Italics}${Format.DarkGreen}背包空间不足，请清理后再获取！`);
    return false;
  }

  //检查玩家背包中是否有钟
  for (let index = 0; index < playerBackpack.size; index++) {
    let item = playerBackpack.getItem(index);
    if (item.match(clock)) {
      //背包中有钟则提示
      player.tell(`${Format.Italics}${Format.DarkGreen}背包中已有钟！`);
      return false;
    }
  }

  //给玩家发放钟并提示
  player.giveItem(clock);
  player.tell(`${Format.Italics}${Format.DarkGreen}钟已发放，请查看背包!`);

  return true;
}

/**
 * 显示插件信息
 * @param {Boolean} isShow 是否显示插件信息
 */
function showPluginInfo(isShow = true) {
  if (!isShow) {
    return false;
  }
  colorLog('green', '给钟插件已加载！')
  colorLog('green', '插件开源地址(gitee)：https://gitee.com/xclhove/LiteLoaderPlugins-GiveClock')
  colorLog('green', '插件开源地址(github)：https://github.com/xclhove/LiteLoaderPlugins-GiveClock')
}

/**
 * 玩家使用钟时让玩家执行指定命令
 * @param {String} command 执行的命令
 */
function onUseClockRunCommand(command) {
  const clock = mc.newItem("minecraft:clock", 1);
  mc.listen("onUseItem", (player, item) => {
    if (item.type === clock.type) {
      player.runcmd(command)
    }
  })
}

/**
 * 玩家对方块使用钟时让玩家执行指定命令
 * @param {String} command 执行的命令
 */
function onUseClockOnRunCommand(command) {
  const clock = mc.newItem("minecraft:clock", 1);
  mc.listen("onUseItemOn", (player, item) => {
    if (item.type === clock.type) {
      player.runcmd(command)
    }
  })
}