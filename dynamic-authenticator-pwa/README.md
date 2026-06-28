# 动态验证器 PWA

一个可安装到手机桌面的动态验证码网页 App，适合作为后续后端版本的前端基线。

## 已实现功能

- 手机网页端使用
- PWA，可添加到主屏幕
- 本地 PIN 解锁
- WebCrypto 本地加密保存验证码密钥
- 扫码导入 `otpauth://totp/...` 二维码
- 从相册识别二维码
- 手动输入密钥
- TOTP 6 位动态验证码
- 倒计时刷新
- 一键复制验证码
- 最近操作记录
- 离线缓存

## Vercel 部署

当前项目放在仓库子目录：

```text
CVprojects/dynamic-authenticator-pwa
```

在 Vercel 导入 GitHub 仓库时请选择：

```text
Repository: 898269703/CVprojects
Root Directory: dynamic-authenticator-pwa
Framework Preset: Other
Build Command: 留空
Output Directory: 留空
Install Command: 留空
```

部署完成后，用 iPhone Safari 打开 Vercel 网址，点击分享按钮，选择“添加到主屏幕”。

## 安全提醒

这是前端本地版验证器。验证码密钥只保存在当前设备浏览器中，并用 PIN 派生密钥加密。请务必保护 GitHub 和 Vercel 账号，避免部署代码被篡改。

正式版建议继续增加：

- 云端端到端加密备份
- 多设备同步
- 导出/导入备份
- 代码版本校验
- 独立后端管理服务
