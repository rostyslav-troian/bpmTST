@echo off
set autoBuild=%1
set destination=%2
if not defined autoBuild (
	echo Error: AutoBuild not set
	exit /b 255
)
if not %autoBuild%==AutoBuild (
	echo Error: AutoBuild not set
	exit /b 255
)
if not defined destination (
	echo Error: destination not set
	exit /b 254
)
rd /s /q %destination%
robocopy ..\..\Resources\Docs %destination% /E /NP /MIR
echo %errorlevel%
if errorlevel 16 echo ***FATAL ERROR*** & goto fail
if errorlevel 15 echo OKCOPY + FAIL + MISMATCHES + XTRA & goto fail
if errorlevel 14 echo FAIL + MISMATCHES + XTRA & goto fail
if errorlevel 13 echo OKCOPY + FAIL + MISMATCHES & goto fail
if errorlevel 12 echo FAIL + MISMATCHES& goto fail
if errorlevel 11 echo OKCOPY + FAIL + XTRA & goto fail
if errorlevel 10 echo FAIL + XTRA & goto fail
if errorlevel 9 echo OKCOPY + FAIL & goto fail
if errorlevel 8 echo FAIL & goto fail
if errorlevel 7 echo OKCOPY + MISMATCHES + XTRA & goto success
if errorlevel 6 echo MISMATCHES + XTRA & goto success
if errorlevel 5 echo OKCOPY + MISMATCHES & goto success
if errorlevel 4 echo MISMATCHES & goto success
if errorlevel 3 echo OKCOPY + XTRA & goto success
if errorlevel 2 echo XTRA & goto success
if errorlevel 1 echo OKCOPY & goto success
if errorlevel 0 echo No Change & goto success

:success
exit /b 0

:fail
exit /b %errorlevel%
