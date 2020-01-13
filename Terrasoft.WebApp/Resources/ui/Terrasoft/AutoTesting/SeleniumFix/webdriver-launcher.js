//============================================================================================================
// some simple setup 

var isWindows       = java.lang.System.getProperty("os.name").indexOf("Windows") != -1
var isMacOS         = java.lang.System.getProperty('os.name').indexOf("Mac") != -1
var is64            = java.lang.System.getProperty('os.arch').indexOf("64") != -1
var isDebug         = false
var noColor         = false

var debug = function (text) {
    if (isDebug) safePrint(text) 
}

var safePrint = function (text) {
    if (noColor) text = String(text).replace(/\x1B\[\d+m([\s\S]*?)\x1B\[\d+m/mg, '$1')
    
    print(text)
}

var sleep = function (time) {
    java.lang.Thread.currentThread().sleep(time)
}


//============================================================================================================
// setting path to chrome driver server

var setChromeDriverServerPath   = function (binDir) {
    
    if (isWindows) 
        java.lang.System.setProperty("webdriver.chrome.driver", binDir + "\\binary\\chromedriver_win\\chromedriver.exe")
    else if (isMacOS)
        java.lang.System.setProperty("webdriver.chrome.driver", binDir + "/binary/chromedriver_mac/chromedriver")
    else {
        // linux branch
        if (is64)
            java.lang.System.setProperty("webdriver.chrome.driver", binDir + "/binary/chromedriver_linux64/chromedriver")
        else
            java.lang.System.setProperty("webdriver.chrome.driver", binDir + "/binary/chromedriver_linux32/chromedriver")
    }
}

var setIEDriverServerPath   = function (binDir) {
    
    if (!isWindows) return
    
    if (is64)
        java.lang.System.setProperty("webdriver.ie.driver", binDir + "\\binary\\iedriver_win64\\IEDriverServer.exe")
    else
        java.lang.System.setProperty("webdriver.ie.driver", binDir + "\\binary\\iedriver_win32\\IEDriverServer.exe")
}

var setFirefoxBinaryServerPath = function() {
	if (!isWindows) {
		return;
	}
	var firefoxBinPath = "c:\\Program Files\\Mozilla Firefox\\firefox.exe";
	var firefoxBin = new java.io.File(firefoxBinPath);
	if (!firefoxBin.isFile()) {
		firefoxBinPath = "c:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe";
	}
	java.lang.System.setProperty("webdriver.firefox.bin", firefoxBinPath);
};

var getProceduralInterface = function (webDriver, browserName, reportOptions) {
//    var timer               = new java.util.Timer()
    
    var currentDriver       = webDriver;
    
    var width, height;
    
    return {
        
        browserName     : browserName,
        
        debug : function (text) {
            debug(text)
        },
        
        
        print : function (text) {
            safePrint(text)
        },
        
        
        open : function (url, callback) {
            currentDriver   = currentDriver || getDriverInstance(browserName);
            
            currentDriver.manage().window().setSize(new Packages.org.openqa.selenium.Dimension(width, height));
            
            currentDriver.get(url)
            
            sleep(1000)
            
            // webdriver doesn't know anything about HTTP status of page loading, it accepts 404 pages just fine
            // "feature testing" that loading has successed and Siesta is presented on harness page
            var siestaIsOnPage = String(this.executeScript("return typeof Siesta != 'undefined'")) == 'true'
            
            if (!siestaIsOnPage) {
                print("[ERROR] Can't find Siesta on the harness page - page loading failed?")
                
                currentDriver.quit()
                
                quit(5)
            }
            
            var siestaIsAutomated   = String(this.executeScript("try { return typeof Siesta.Harness.Browser.Automation != 'undefined' } catch(e) { return false } ")) == 'true'
            
            if (!siestaIsAutomated) {
                print("[ERROR] The harness page you are targeting contains Siesta Lite distribution. To use automation facilities, \nmake sure harness page uses `siesta-all.js` from Standard or Trial packages")
                
                currentDriver.quit()
                
                quit(5)
            }
            
            callback()
        },
        
        
        close : function () {
            // IE driver as everything related to IE sporadically throws exceptions when closing the browser.. 
            try {
                currentDriver.quit()
            } catch (e) {
            }
            
            sleep(1000)
            
            currentDriver = null
        },
        
        
        setWindowSize : function (w, h) {
            width       = w
            height      = h
        },
        
        
        executeScript   : function (text) {
            // IE driver as everything related to IE sporadically throws exceptions when executing the code
            // it also throws exception when trying to execute the script on 404 page (all other drivers are ok)
            try {
                return currentDriver.executeScript(text)
            } catch (e) {
                print("<Exception from launcher>")
                print("    While running: " + text)
                print("    Exception: " + e)
                print("</Exception from launcher>")
                
                return null
            }
        },
        
        
        sleep : function (timeout, func) {
//            var task    = new JavaAdapter(java.util.TimerTask, { run : func })
//            
//            timer.schedule(task, timeout);
            
            sleep(timeout)
            
            func()
        },
        
        
        saveReport : function (content) {
            var reportFilePrefix    = reportOptions.filePrefix
            
            var match       = /(.*?)\.([^.]*?)$/.exec(reportFilePrefix)
            
            var filename
            
            if (match)      
                filename    = match[ 1 ] + browserName + '.' + match[ 2 ]
            else
                filename    = reportFilePrefix + browserName
            
            var out         = new java.io.BufferedWriter(new java.io.FileWriter(filename))
            out.write(content)
            out.close()
        }
    };
}


//============================================================================================================
// processing args 


var args            = processArguments(arguments)
var options         = args.options

var binDir          = args.argv[ 0 ].replace(/\\\/?$/, '')

if (options.version) {
    var siestaAll   = new java.util.Scanner(new java.io.File(binDir + (isWindows ? '\\..\\siesta-all.js' : '/../siesta-all.js')), "UTF-8").useDelimiter("\\A").next()
    var match       = /^\/\*[\s\S]*?Siesta (\d.+)\n/.exec(siestaAll)
    
    var jar         = new java.util.jar.JarFile(new java.io.File(binDir + (isWindows ? '\\binary\\selenium-server-standalone-2.31.0.jar' : '/binary/selenium-server-standalone-2.31.0.jar')))
    
    print("Selenium : " + jar.getManifest().getAttributes('Build-Info').getValue('Selenium-Version'))
    if (match) print("Siesta   : " + match[ 1 ])
    
    phantom.exit(8);
}


if (args.argv.length == 1 || options.help) {
    print([
        'Usage: webdriver url [OPTIONS]',
        'The `url` should point to your `tests/index.html` file',
        '',
        'Options (all are optional):',
        '--help                     - prints this help message',
        '--version                  - prints versions of Siesta and Selenium Webdriver',
        '',
        '--browser browsername      - should be exactly one of the "firefox / chrome / ie / safari"',
        '                             this option can be repeated several times',
        '                             default value is *, meaning all available browsers',
        '--filter regexp            - a regexp to filter the urls of tests',
        '--verbose                  - enable the output from all assertions (not only from failed ones)',
        '--debug                    - enable diagnostic messages',
        '--report-format            - create a report for each browser after the test suite execution',
        '                             recognizable formats are: "JSON, JUnit"',
        '--report-file-prefix       - required when `report-format` is provided. ',
        '                             Specifies the initial part of file name to save the report to.',
        '                             The browser name will be used as the second part, extension will be preserved.',
        '                             For example, specifying: --report-file-prefix=report_.json will save the reports to: ',
        '                             report_firefoxproxy.json, report_iexploreproxy.json, etc',
        '--report-file              - Alias for `--report-file-prefix`',
        '--width                    - width of the viewport, in pixels',
        '--height                   - height of the viewport, in pixels',
        '--no-color                 - disable the coloring of the output',
        '--pause                    - pause between individual tests, in milliseconds, default value is 3000',
        '--page-pause               - pause between tests pages, in milliseconds, default value is 3000',
        '--host                     - host, running the RemoteWebDriver server, when provided test suite will be launched',
        '                             on that host. Note, that harness url will be accessed from remote host.',
        '--port                     - port number on the host with RemoteWebDriver server, default value is 4444',
        
        // empty line to add line break at the end
        ''
        
//        XXX not yet supported
//        ,
//        '--aggregate-reports        - when this option is provided, the reports from different browsers ',
//        '                             will be saved to a single file, in the aggregated format.',
//        '                             The `--report-file-prefix` will be used as the full file name.'              
    ].join('\n'));
    
    quit(6)
}

var harnessURL          = args.argv[ 1 ]

var browser             = options.browser || '*'
if (browser == '*') browser = [ 'firefox', 'chrome', 'ie', 'safari' ]

if (!(browser instanceof Array)) browser = [ browser ]


var reportFormat        = options[ 'report-format' ]
var reportFilePrefix    = options[ 'report-file-prefix' ] || options[ 'report-file' ]

////        XXX not yet supported
//var aggregateReports    = options[ 'aggregate-reports' ]

if (reportFormat && reportFormat != 'JSON' && reportFormat != 'JUnit') {
    print([
        'Unrecognized report format: ' + reportFormat
    ].join('\n'));
    
    quit(6)
}

if (reportFormat && !reportFilePrefix) {
    print([
        '`report-file-prefix` option is required, when `report-format` option is specified'
    ].join('\n'));
    
    quit(6)
}

if (reportFilePrefix && !reportFormat) reportFormat = 'JSON'


var host                = options.host
var port                = options.port || 4444


isDebug                 = options.debug || false
noColor                 = options[ 'no-color' ] || isWindows

setChromeDriverServerPath(binDir)
setIEDriverServerPath(binDir)
setFirefoxBinaryServerPath()

//============================================================================================================
// starting the test suites 

var browserConfigs    = {
    firefox         : {
        javaClass           : 'org.openqa.selenium.firefox.FirefoxDriver',
        capabilitiesMethod  : 'firefox'
    },
    
    ie              : {
        javaClass           : 'org.openqa.selenium.ie.InternetExplorerDriver',
        capabilitiesMethod  : 'internetExplorer'
    },
    
    safari          : {
        javaClass           : 'org.openqa.selenium.safari.SafariDriver',
        capabilitiesMethod  : 'safari'
    },
    
    chrome          : {
        javaClass           : 'org.openqa.selenium.chrome.ChromeDriver',
        capabilitiesMethod  : 'chrome'
    }
}

var getBrowserClass = function (className) {
    var parts       = className.split('.')
    
    var cls         = Packages
    
    for (var i = 0; i < parts.length; i++) {
        cls         = cls[ parts[ i ]]
        
        if (cls === undefined) return null
    }
    
    return cls
}

var getDriverInstance = function (browserName) {
    var config  = browserConfigs[ browserName ]
    
    if (!config) {
        debug("Unknown browser: " + browserName)
        
        return null
    }
    
    debug("Trying to create a WebDriver instance for browser: " + browserName)
    
    // when host is presented, in theory, required driver class can present remotely
    if (!host) {
        var driverClass         = getBrowserClass(config.javaClass)
        
        if (!driverClass) {
            debug("Browser class is missing: " + config.javaClass)
            
            return null;
        }
    }
    
    var driver          = null
    
    try {
        if (host) {
            // prepend potentially missing "http://" prefix in "constructURL"
            var url             = new java.net.URL(constructURL(host, {}) + ':' + port + '/wd/hub')
            var capabilities    = Packages.org.openqa.selenium.remote.DesiredCapabilities[ config.capabilitiesMethod ]();
            
            debug("Host option is provided, switching to RemoteWebDriver, on host: " + url)
            
            driver              = new Packages.org.openqa.selenium.remote.RemoteWebDriver(url, capabilities);
        } else
            driver              = new driverClass()
    } catch (e) {
        debug("WebDriver instatiation failed: " + browserName)
        debug("Failed with: " + e)
        
        try {
            driver.quit()
        } catch (ex) {
        }
        
        return null
    }
    debug("WebDriver instantiated successfully")
    
    return driver
}




var browserCounter      = 0

var reportOptions       = reportFormat ? {
    format      : reportFormat,
    filePrefix  : reportFilePrefix
} : null

var exitCodeSum         = 0



for (var i = 0; i < browser.length; i++) {
    var browserName         = browser[ i ]
    
    var driver              = getDriverInstance(browserName)
    
    if (!driver) {
        debug("Ignoring browser, webdriver instatiation failed: " + browserName)
        continue;
    }
    
    browserCounter++
    
    print("Launching test suite for browser: " + browserName);
    
    runBrowser(getProceduralInterface(driver, browserName, reportOptions), {
        harnessURL      : harnessURL,
        query           : {
            selenium    : true,
            verbose     : options.verbose,
            filter      : options.filter,
            pause       : options.pause,
            pagePause   : options[ 'page-pause' ]
        },
        viewportWidth   : options.width || 1200,
        viewportHeight  : options.height || 800,
        reportOptions   : reportOptions,
        sync            : true
    }, function (exitCode) {
        exitCodeSum += exitCode
        
        if (i == browser.length - 1) quit(exitCodeSum > 0 ? 7 : 0)
    })
}

if (!browserCounter) {
    print("No supported browsers available, exiting")
    quit(3)
}

// additional quit in case the last browser was ignored
quit(exitCodeSum > 0 ? 7 : 0)

//// sleep forever to allow scheduled tasks to run
//sleep(1e10)