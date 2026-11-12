# Yuanhao Li 的个人网站

基于 Astro 的纯静态双语个人网站，默认英文，支持 GitHub Pages 的根域名与仓库子目录部署。

## 本地运行

需要 Node.js 22.22 或更高版本。
Astro 固定为 7.4.1，以匹配本地 Node 版本，升级时需同时检查 Node 版本要求。

```bash
npm ci
npm run dev
```

打开终端输出的本地地址即可预览。

```bash
npm run build
npm test
npm run preview
```

`npm test` 检查构建产物，因此需要先构建。

## GitHub Pages 部署

1. 将项目推送到 GitHub 仓库的 `main` 分支。
2. 在仓库的 Settings → Pages → Build and deployment 中，将 Source 设置为 GitHub Actions。
3. 运行 `.github/workflows/deploy.yml`，或推送提交触发部署。

工作流通过 GitHub Pages 配置自动获得域名与路径前缀，不需要为用户站点和项目站点维护两份代码。
自定义域名应先在 GitHub Pages 设置中完成配置。
本项目当前仅准备了部署工作流，尚未创建远端仓库或执行部署。

可在本地验证子目录部署：

```bash
SITE_URL=https://erwinliyh.github.io BASE_PATH=/my-personal-web npm run build
BASE_PATH=/my-personal-web npm test
BASE_PATH=/my-personal-web npm run preview
```

## 内容与样式

- `src/data/site.ts`：中英文文案、论文、教育与技能。
- `src/data/dev.ts`：Dev 双语内容、插件分组、上游链接和附加系统提示词。
- `src/components/DevPage.astro`：Dev 共用目录和页面正文。
- `src/components/CodeBlock.astro`：白色代码框与复制按钮。
- `src/styles/dev.css`：Dev 文档式布局与移动端折叠导航。
- `src/components/About.astro`：主页内容结构。
- `src/components/Profile.astro`：个人欢迎终端和共用的个人信息元素。
- `src/styles/global.css`：全站视觉、导航与空白页。
- `src/styles/home.css`：个人主页与响应式布局。
- `src/styles/profile.css`：欢迎终端、停靠侧栏与移动端样式。
- `src/scripts/site.ts`：滚动动效和语言偏好。
- `public/images/portrait.jpg`：由大原图生成的 768×768 方形头像，保留头肩构图并移除附带元数据。

字号使用 `rem`，可在 `src/styles/global.css` 的 `:root` 中统一调节 `font-size`，当前为 `110%`。

Dev 提供 Pi 配置、系统提示词、社区 Skills 和 Custom skills 四个页面，其中 Custom skills 暂时留空。
Vibe Coding 页面仍为空状态，没有示例项目。
论文状态依据提供的 CV 整理，未独立核验，公开前请确认。
中文版使用姓名“李元昊”，英文版使用“Yuanhao Li”，统一在 `src/data/site.ts` 中维护。
网站不展示生日和性别，也不包含原始 CV PDF。

## 语言与交互

`/en/` 与 `/zh/` 均为独立生成的 HTML 页面。
根路径默认进入英文页面；访客主动切换语言后，根路径优先采用此浏览器保存的偏好。
显式访问某个语言的 URL 不会被偏好覆盖。
语言切换保留当前页面和章节锚点，不保证保留未带锚点的任意滚动位置。
浏览器禁用存储时，语言链接仍然有效。

主页顺序为关于我、教育经历、研究方向、论文、技术工具箱和荣誉。
首屏是包含头像与个人信息的白色终端，页面使用纸白底色与冷灰蓝文字。
命令 `yhintro --welcome` 是网站专用的虚构展示名称，取自 Yuanhao 与 introduction，不会执行任何程序。
终端底部循环逐字显示当前语言的下滑提示，每次打完停留 3 秒，再清空重打，光标持续闪烁。
终端淡出或离开视野时取消打字；减少动效模式直接显示完整提示并停止光标闪烁。
仅在宽度至少 1100px、高度至少 760px 且未开启减少动效时，启用终端拆解动画。
滚动时终端外壳淡出，头像先缩小移出，文字随后移动并停靠到左栏；向上滚动时反向还原。
欢迎页和侧栏使用同一组内容节点，脚本测量两种布局的位置，仅用位移、头像缩放和外壳透明度完成过渡。
英文版停靠头像以姓名实际文字（不含末尾装饰点）居中，另向左微调 2px。
中文版按身份信息与研究方向的实际文字范围居中，不把短中文名或容器空白作为基准。
两种语言的光学校正值可在 `src/styles/profile.css` 的 `--portrait-optical-offset` 中分别调整。
手机与窄屏采用放大的头像居左、姓名与职位机构及地点居右的紧凑终端，研究方向和链接在下方展开。
滚动提示预留宽度以避免打字时布局跳动。
较矮窗口、减少动效或禁用 JavaScript 时保留静态欢迎页，不固定侧栏。
窗口缩放或字体加载后会重新测量位置，带锚点访问和刷新也能直接恢复对应动画进度。
所有核心图片和代码由本站提供，不依赖第三方 CDN。

## Dev 页面

`/{en,zh}/dev/` 默认展示 Pi 配置，子页面为 `system-prompt/`、`skills/` 和 `custom-skills/`。
桌面端目录固定在左侧，宽度小于 800px 时默认折叠，可通过按钮展开或按 Escape 收起。
禁用 JavaScript 时目录完整可见，正文和页面链接仍可使用。
代码支持复制，长命令只在代码框内横向滚动，系统提示词自动换行。
插件按 Basic、Optional 和 Codex related 分组，每组安装命令使用 `&&` 连接独立的 `pi install`。
插件名称和 npm scope 来自本机已安装包，功能和仓库链接对照上游项目核实。
中文附加系统提示词为本机原文快照，英文为忠实翻译，均保留默认中文的个人偏好。
网页只展示安装命令和提示词，不会执行安装，也不读取或公开账户密钥。
更新内容只需修改项目内的数据文件，构建不依赖本机 Pi 配置。

## 发布前确认

- 确认头像是否用于公开网站。
- 确认论文发表及投稿状态。
- 确认中英文介绍。
- 如需下载简历，先准备去除不必要个人信息的公开版 PDF。
