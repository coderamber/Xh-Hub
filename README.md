# HUB API
<p>
<a><img alt="npm type definitions" src="https://img.shields.io/badge/types-Javascript-yellow"></a>
<a><img src="https://img.shields.io/badge/npm-v6.14.11-blue" alt="Version"></a>
<a><img src="https://img.shields.io/badge/node-v14.16.0-red" alt="Version"></a>
<a><img src="https://img.shields.io/badge/frame-Koa-green" alt="frame"></a>
</p>

## 1. 简介
* 这是一个 node 练习项目，主要学习如何 koa 原生开发接口

* 该项目实现了一个博客系统后台，包含一些常见的接口，接口风格采用 restful


## 2. 如何跑通项目
> 确保您的服务器已安装 node ！！
1. 根目录下创建文件 `.env`，输入下列配置信息

    ```powershell
    APP_HOST=服务器地址
    APP_PORT=服务器端口

    MYSQL_HOTS=数据库地址
    MYSQL_PORT=数据库端口
    MYSQL_DATABASE=连接数据库名
    MYSQL_USER=数据库用户名
    MYSQL_PASSWORD=数据库密码
    ```

2. 执行 `npm install` 安装依赖
3. 安装 `pm2`
    ```powershell
    npm install pm2 -g
    ```
4. 运行项目
    ```powershell
    pm2 start ./src/main.js
    ```
> 更多 pm2 的内容请阅读相关官方文档，pm2 支持负载均衡等

## 3. 接口截图
<img src="https://mxh-1257393241.cos.ap-nanjing.myqcloud.com//markdownimage-20221003012254011.png" alt="image-20221003012254011" style="zoom:50%;" />
