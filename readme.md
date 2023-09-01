# 给钟插件

## 简介

给钟插件，玩家进服自动检测背包是否有钟，没有钟则会给玩家一个钟，建议配合钟菜单相关的插件使用。

## 安装

将`GiveClock.js`放入`plugins`文件夹后重启服务器即可。

## 功能

- 进服自动给钟并提示
- 使用游戏内指令`/getclock`或`/gc`可以获取钟

## 配置说明

配置文件路径：`plugins/GiveClock/config.json`

```json
{
  "config": {
    //获取钟的命令
    "getClockCommand": "getclock",
    //获取钟的命令别名，‘gc’与‘getclock’等效
    "getClockCommandAlias": "gc",
    //是否要在使用钟后执行命令，0:否 1:是
    "runCommandOnUseClock": 0,
    //使用钟后执行的命令
    "onUseClockRunCommand": "list",
    //是否要在对方块使用钟后执行命令，0:否 1:是
    "runCommandOnUseClockOn": 0,
    //对方块使用钟后执行的命令
    "onUseClockOnRunCommand": "menu"
  }
}
```

## 开源地址

[开源地址(gtitee)](https://gitee.com/xclhove/LiteLoaderPlugins-GiveClock)

[开源地址(github)](https://github.com/xclhove/LiteLoaderPlugins-GiveClock)

## 最新版下载链接

[gitee](https://gitee.com/xclhove/LiteLoaderBDSPlugins-GiveClock/releases/download/v1.1.0/GiveClock.js)

[github](https://github.com/xclhove/LiteLoaderBDSPlugins-GiveClock/releases/latest/download/GiveClock.js)
