@echo off
SetLocal EnableDelayedExpansion EnableExtensions

rem Defaults
set jsDuckLocalDir=c:\DevTools\JSDuck
set jsDuckSharedDir=\\tsbuild-app\JSDuck
set jsDuckDefaultName=jsduck-6.0.0-beta.exe

rem AutoBuild param
set autoBuild=%1
if defined autoBuild (
	echo Running in AutoBuild mode
) else (
	echo Running in Manual mode
)

rem get JSDuck path
call :getJSDuckPath
if defined errorMessage (
	goto :ERROR
)
echo JSDuck used:
echo 	!jsDuckDir!\!jsDuckFileName!

rem proccesing babel files
cd ..\\..\\babel
echo npm install...
call npm install
echo Copy files...
call npm run copy-core > nul
echo Proccesing files with babel...
call npm run babel-t > nul
cd ..\\Resources\\Doc

rem generate docs config
node generate-docs-config.js > nul
set configPath=config.json
echo Docs config created:
echo 	%~dp0%configPath%

rem generate docs
set jsDuckCallString=!jsDuckDir!\!jsDuckFileName! --config=%configPath%
echo JSDuck call string:
echo 	!jsDuckCallString!
echo Running JSDuck...
if defined autoBuild (
	call !jsDuckCallString!
) else (
	call !jsDuckCallString! > log.txt 2>&1
)
echo 	Done
if not defined autoBuild (
	echo See JSDuck log here:
	echo 	%~dp0log.txt
)

rem clean up
if not defined autoBuild (
	del %configPath%
)

echo All Done.

rem program end
goto :END

rem =======================
rem Subroutines
rem =======================

:getJSDuckPath
rem Default to shared dir
set jsDuckDir=%jsDuckSharedDir%
set jsDuckFileName=%jsDuckDefaultName%

rem Prefer local jsduck if it exists
if exist %jsDuckLocalDir% (
	if exist %jsDuckLocalDir%\%jsDuckDefaultName% (
		set jsDuckDir=%jsDuckLocalDir%
	) else (
		rem get highest found version in path
		for /f %%f in ('dir %jsDuckLocalDir%\jsduck*.exe /o:-n /b') do (
			set jsDuckDir=%jsDuckLocalDir%
			set jsDuckFileName=%%f
			goto :EOF
		)
	)
)
if not exist !jsDuckDir!\!jsDuckFileName! (
	set errorMessage=JSDuck not found!
)
goto :EOF

:Error
echo !errorMessage!
goto :EOF

:END
if not defined autoBuild (
	pause
)
EndLocal

