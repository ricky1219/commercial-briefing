# 日报发布守护设计

## 目标

避免“日报本地已生成或任务被中断，但 GitHub Pages 仍停留旧日期”长期不被发现。

## 根因

本次中断发生在内容生成与 Git 推送之间。站点没有独立发布状态文件、远端与 Pages 日期核验，也没有在 9:00 对未更新日报执行一次补发检查。

## 方案

1. `scripts/publication-guard.mjs` 是唯一的发布状态校验器。它接收目标出版日（默认中国时区当天），校验本地 `index.html` 的出版日和昨日范围；可选地校验远端分支和 Pages 页面是否已显示同一出版日。
2. `scripts/daily-recovery.mjs` 在本地 9:00 运行，只做低成本检查。若站点已更新则退出；若未更新，写入一个带时间戳的恢复请求文件，并使用本地通知提示需要补发。它不自行抓取新闻，不产生模型调用或重复 Token 消耗。
3. `~/Library/LaunchAgents/com.chenyao.commercial-briefing.guard.plist` 每日 9:00 调用恢复检查，保存 stdout/stderr 到 `/tmp/chenyao-commercial-briefing-guard.log`。同日只触发一次，并以锁文件防止并发。
4. 每次人工或自动发布在推送后运行 `publication-guard.mjs --remote --pages`；只有三个日期一致才在任务回报“发布完成”。

## 边界

- 守护任务不会自行生成或发布内容，正常日不会增加采集或模型 Token。
- 网络核验失败会返回非零状态并明确记录原因，不把未知状态视为成功。
- 页面检查使用带版本参数的 URL，避开 CDN 缓存；不修改永久网址。
- 所有日期以 Asia/Shanghai 计算。
