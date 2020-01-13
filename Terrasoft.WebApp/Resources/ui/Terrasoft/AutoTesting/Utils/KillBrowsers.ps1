"Process killing started..."
if ($Args -ne $null) {
	$currentUser = $Args[0];
} else {
	$currentUser = $Env:UserName
}
$targetProcesses = Get-WmiObject -class win32_process |
	where {
		$_.ProcessName -ieq 'chrome.exe' -or
		$_.ProcessName -ieq 'firefox.exe' -or
		$_.ProcessName -ieq 'iexplore.exe' -or
		$_.ProcessName -ieq 'safari.exe' -or
		$_.ProcessName -ieq 'chromedriver.exe'
	} |
	where { $_.GetOwner().User -eq $currentUser } |
	% { $_.ProcessId };
$currentDate = Get-Date
if ($targetProcesses -ne $null) {
	"[$currentDate, $currentUser] Killing processes: $targetProcesses"
	ps -id $targetProcesses | % { $_.Kill() }
} else {
	"[$currentDate, $currentUser] No processes to kill for user"
}
#BPMonlineBuild