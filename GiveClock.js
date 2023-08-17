//监听进服事件
mc.listen("onJoin", (player) => {
  //进服提示
  joinPrompt(player);
  //进服给钟
  giveClock(player);
});

//注册指令：注册获取钟的顶层指令
const getClockCommand = mc.newCommand('getclock', `${Format.Italics}${Format.DarkGreen}获取钟`, PermType.Any, 0x80, 'gc');
//配置指令：新增一条指令重载
getClockCommand.overload([])
//配置指令：设置指令回调函数(执行指令就会执行回调函数)
getClockCommand.setCallback((cmd, origin, output, results) => {
  let player = origin.player;
  //非玩家执行指令不会给钟
  if (player === null) {
    return false;
  }
  giveClock(player);
})
//安装指令：安装指令
getClockCommand.setup()

//显示插件信息
showPluginInfo(true)

/**
 * 进服提示
 * @param {Player} player 要提示的玩家
 */
function joinPrompt(player) {
  player.tell(`${Format.Italics}${Format.DarkGreen}获取钟请输入：/getclock 或 /gc`);
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
function showPluginInfo(isShow) {
  if (!isShow) {
    return false;
  }
  log('给钟插件已加载！');
  log('version:1.0.0');
  log('插件开源地址(gitee)：');
  log('插件开源地址(github)：');
}
