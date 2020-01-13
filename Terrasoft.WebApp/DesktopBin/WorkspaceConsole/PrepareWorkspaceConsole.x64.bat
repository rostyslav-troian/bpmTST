@echo off

Echo Copying
xcopy ..\..\bin .\ /y /f /e /q
xcopy .\x64\Terrasoft.Tools.WorkspaceConsole.exe .\ /y /f /e /q
md Bin
move /y Roslyn Bin

pause;