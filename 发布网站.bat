@echo off
title 幻服网站一键发布
cd /d D:\Dream_web_program
echo ==========================================
echo   幻服网站一键发布
echo ==========================================
echo.
git add -A
set "msg="
set /p msg=请输入本次更新说明（直接回车默认为"更新内容"）：
if "%msg%"=="" set "msg=更新内容"
git -c i18n.commitencoding=gbk commit -m "%msg%"
git push
echo.
echo 完成！1~2 分钟后线上自动更新：https://huanfu-web.pages.dev
echo.
pause
