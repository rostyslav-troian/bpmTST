@echo off
Setlocal EnableDelayedExpansion
if "%1"=="core" (
	node %2 manual all %3 %4 --verbose %5 %6 %7 %8 %9
	Exit /b
)

shift
set "runtests=%1"

shift

node !runtests! manual all %1 default %2 %3 %4 %5 %6