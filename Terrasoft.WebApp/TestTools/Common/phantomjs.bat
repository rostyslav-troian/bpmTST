@echo off
:: get the directory in which the script reside
set DIR=%~dp0

"%6\PhantomJs\phantomjs.exe" "%6\Common\phantomjs-launcher.js" "%DIR%/" %*

