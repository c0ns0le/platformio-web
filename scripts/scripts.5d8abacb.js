!function(){"use strict";angular.module("siteApp",["ngAnimate","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","viewhead","angulartics","angulartics.google.analytics","hljs","ngDisqus","relativeDate","ngTable"]).constant("siteConfig",{apiURL:9013===parseInt(location.port)?"http://localhost:8080":"http://api.platformio.org"})}(),function(){"use strict";function a(a,b){return{responseError:function(c){return 404===c.status&&b.path("/404"),a.reject(c)}}}function b(a,b,c,d){a.html5Mode(!0),c.setShortname("platformio"),d.interceptors.push("httpErrorInterceptor"),d.defaults.cache=!0,b.when("/",{templateUrl:"views/home.html"}).when("/get-started/:gsType?",{templateUrl:"views/get_started.html",controller:"GetStartedController",controllerAs:"vm"}).when("/platforms/:platformType?",{templateUrl:"views/platforms.html",controller:"PlatformsController",controllerAs:"vm",resolve:{platformsList:["dataService",function(a){return a.getPlatforms().$promise}],packagesList:["dataService",function(a){return a.getPackages().$promise}],frameworksList:["dataService",function(a){return a.getFrameworks().$promise}]}}).when("/frameworks/:frameworkType?",{templateUrl:"views/frameworks.html",controller:"FrameworksController",controllerAs:"vm",resolve:{frameworksList:["dataService",function(a){return a.getFrameworks().$promise}],platformsList:["dataService",function(a){return a.getPlatforms().$promise}]}}).when("/boards",{templateUrl:"views/boards.html",controller:"BoardsController",controllerAs:"vm",resolve:{boardsList:["dataService",function(a){return a.getBoards().$promise}],platformsList:["dataService",function(a){return a.getPlatforms().$promise}],frameworksList:["dataService",function(a){return a.getFrameworks().$promise}]}}).when("/lib",{templateUrl:"views/lib_main.html",controller:"LibMainController",controllerAs:"vm",resolve:{libStats:["dataService",function(a){return a.getLibStats().$promise}]}}).when("/lib/search",{templateUrl:"views/lib_search.html",controller:"LibSearchController",controllerAs:"vm",resolve:{searchResult:["$location","dataService",function(a,b){var c=a.search();return b.getLibSearchResult({query:c.query,page:c.page?parseInt(c.page):1}).$promise}]}}).when("/lib/examples",{templateUrl:"views/lib_examples.html",controller:"LibExamplesController",controllerAs:"vm",resolve:{searchResult:["$location","dataService",function(a,b){var c=a.search();return b.getLibExamples({query:c.query,page:c.page?parseInt(c.page):1}).$promise}]}}).when("/lib/show/:libId/:libName/:activeTab?",{templateUrl:"views/lib_show.html",controller:"LibShowController",controllerAs:"vm",resolve:{libInfo:["$route","dataService",function(a,b){return b.getLibInfo(a.current.params.libId).$promise}],frameworksList:["dataService",function(a){return a.getFrameworks().$promise}],platformsList:["dataService",function(a){return a.getPlatforms().$promise}]}}).when("/who-uses",{templateUrl:"views/who_uses.html"}).when("/platformio-ide",{templateUrl:"views/platformio-ide.html"}).when("/donate",{templateUrl:"views/donate.html"}).when("/contact",{templateUrl:"views/contact.html"}).when("/404",{templateUrl:"views/404.html"}).otherwise({redirectTo:"/404"})}angular.module("siteApp").factory("httpErrorInterceptor",a).config(b),a.$inject=["$q","$location"],b.$inject=["$locationProvider","$routeProvider","$disqusProvider","$httpProvider"]}(),function(){"use strict";function a(a,b){function c(c){return a(b.apiURL+"/lib/search",c).get()}function d(c){return a(b.apiURL+"/lib/examples",c).get()}function e(c){return a(b.apiURL+"/lib/info/"+c).get()}function f(c){return a(b.apiURL+"/lib/download/"+c).get()}function g(){return a(b.apiURL+"/lib/stats").get()}function h(){return a(b.apiURL+"/boards").query()}function i(){return a(b.apiURL+"/frameworks").query()}function j(){return a(b.apiURL+"/platforms").query()}function k(){return a(b.apiURL+"/packages").get()}function l(){return[{image:"http://docs.platformio.org/en/stable/_images/platformio-demo-wiring.gif",title:"Blink Project",icon:"lightbulb-o"},{image:"http://docs.platformio.org/en/stable/_images/platformio-demo-platforms.gif",title:"Platform Manager",icon:"laptop"},{image:"http://docs.platformio.org/en/stable/_images/platformio-demo-lib.gif",title:"Library Manager",icon:"code"}]}function m(){return[{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-eclipse.png",title:"Eclipse"},{image:"http://docs.platformio.org/en/stable/_images/ide-sublime-text-deviot.gif",title:"Sublime Text"},{image:"http://docs.platformio.org/en/stable/_images/ide-vs-platformio-newproject-8.png",title:"Visual Studio"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-clion.png",title:"CLion"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-netbeans.png",title:"NetBeans"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-codeblocks.png",title:"CodeBlocks"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-qtcreator-7.png",title:"Qt Creator"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-vim.png",title:"VIM"},{image:"http://docs.platformio.org/en/stable/_images/ide-platformio-emacs.png",title:"Emacs"},{image:"http://docs.platformio.org/en/stable/_images/ide-atom-platformio.png",title:"Atom"}]}return{getLibSearchResult:c,getLibExamples:d,getLibInfo:e,getLibDlUrl:f,getLibStats:g,getFrameworks:i,getPackages:k,getPlatforms:j,getBoards:h,getCLIDemos:l,getIDEDemos:m}}angular.module("siteApp").factory("dataService",a),a.$inject=["$resource","siteConfig"]}(),function(){"use strict";function a(a){function b(b){a.open({templateUrl:"views/lib_search_examples.html",controller:"LibModalSEController",controllerAs:"vm",size:"lg",resolve:{searchPath:function(){return b}}})}function c(){return-1!==navigator.appVersion.indexOf("Macintosh")?"Macintosh":-1!==navigator.appVersion.indexOf("Windows")?"Windows":-1!==navigator.appVersion.indexOf("Linux")?"Linux":""}return{showSearchExamples:b,osType:c()}}angular.module("siteApp").factory("siteUtils",a),a.$inject=["$uibModal"]}(),function(){"use strict";function a(a){function b(b,c,d){a(function(){if("undefined"!=typeof addthis){var a=b.lib.frameworks.join(" #"),d=b.lib.keywords.join(" #");a.length>0&&(a="#"+a),d.length>0&&(d="#"+d);var e={data_track_clickback:!1,data_track_addressbar:!1,data_ga_property:"UA-1768265-8",data_ga_social:!0},f={url:"http://platformio.org/lib/show/"+b.lib.id+"/"+b.lib.name,title:b.lib.name+" library"+(a?" for ":"")+a,description:b.lib.description+" "+d,templates:{twitter:"{{title}} {{url}} via @PlatformIO_Org "+d},url_transforms:{shorten:{twitter:"bitly"}}};addthis.init(),addthis.toolbox(c[0],e,f)}})}var c={link:b,restrict:"A",transclude:!0,replace:!0,scope:{lib:"="},template:"<div ng-transclude></div>"};return c}angular.module("siteApp").directive("addthisLib",a),a.$inject=["$timeout"]}(),function(){"use strict";function a(a){function b(b,c,d){c.on("click",function(){a.getSelection().toString()||this.setSelectionRange(0,this.value.length)})}var c={link:b,restrict:"A"};return c}angular.module("siteApp").directive("selectOnClick",a),a.$inject=["$window"]}(),function(){"use strict";function a(){return function(a,b){switch(b){case"frequency":a=a/1e6+" MHz";break;case"size":a%1024===0?a/=1024:a=Math.round(a/1024*10)/10,a+=" kB"}return a}}angular.module("siteApp").filter("embeddedFormatter",a)}(),function(){"use strict";function a(){return function(a,b){var c=a;return angular.forEach(b,function(b){"type"in b&&"name"in b&&b.type===a&&(c=b.name)}),c}}angular.module("siteApp").filter("typeToName",a)}(),function(){"use strict";function a(){return function(a,b,c){if(isNaN(b))return a;if(0>=b)return"";if(a&&a.length>b){if(a=a.substring(0,b),c)for(;" "===a.charAt(a.length-1);)a=a.substr(0,a.length-1);else{var d=a.lastIndexOf(" ");-1!==d&&(a=a.substr(0,d))}return a+"…"}return a}}angular.module("siteApp").filter("truncate",a)}(),function(){"use strict";function a(a,b,c,d){function e(a){return new RegExp(a).test(b.path())}var f=this;f.viewAutoScroll=!0,f.isNavBarCollapsed=!0,f.isRouteActive=e,f.isPhJSCrawler=-1!==c.navigator.userAgent.indexOf("PhantomJS"),f.siteUtils=d,a.$on("$routeChangeStart",function(a,b,c){if(f.viewAutoScroll=!0,c){var d=["GetStartedController","PlatformsController","FrameworksController","LibShowController"];angular.forEach(d,function(a){b.controller===a&&c.controller===a&&(f.viewAutoScroll=!1)})}})}angular.module("siteApp").controller("MainController",a),a.$inject=["$rootScope","$location","$window","siteUtils"]}(),function(){"use strict";function a(a,b,c,d,e,f){var g=this;g.gsType="ide",b.hasOwnProperty("gsType")&&(g.gsType=b.gsType),g.siteUtils=f,g.cliDemos=e.getCLIDemos(),g.cliDemoActive=0,g.ideDemos=e.getIDEDemos(),g.ideDemoActive=0,g.ideDemoInterval=5e3,g.slideHeight=c.innerHeight?Math.ceil(c.innerHeight/2):240,g.ideDlUrl="",a.search().dl&&(g.ideDlUrl="https://dl.bintray.com/platformio/ide-bundles/"+a.search().dl,c.location.href=g.ideDlUrl)}angular.module("siteApp").controller("GetStartedController",a),a.$inject=["$location","$routeParams","$window","$analytics","dataService","siteUtils"]}(),function(){"use strict";function a(a,b,c,d,e){function f(a){b.path("/platforms/"+a)}function g(a,b){var d=!1;return angular.forEach(c,function(c){c.type===b&&angular.forEach(c.packages,function(b){-1!==b.indexOf("framework-"+a)&&(d=!0)})}),d}var h=this;h.changePlatform=f,h.isCompatibleFramework=g,h.platforms=c,h.packages=d,h.frameworks=e,h.activeGroup=0,h.activePlatform=0,a.hasOwnProperty("platformType")&&(h.activeGroup=2,h.activePlatform=-1,angular.forEach(c,function(b,c){a.platformType===b.type&&(h.activeGroup=b.forDesktop?1:0,h.activePlatform=c)}))}angular.module("siteApp").controller("PlatformsController",a),a.$inject=["$routeParams","$location","platformsList","packagesList","frameworksList"]}(),function(){"use strict";function a(a,b,c,d){function e(a){b.path("/frameworks/"+a)}function f(a,b){var c=!1;return angular.forEach(d,function(d){d.type===a&&angular.forEach(d.packages,function(a){-1!==a.indexOf("framework-"+b)&&(c=!0)})}),c}var g=this;g.changeFramework=e,g.isCompatiblePlatform=f,g.active=0,g.frameworks=c,g.platforms=d,a.hasOwnProperty("frameworkType")&&angular.forEach(c,function(b,c){a.frameworkType===b.type&&(g.active=c)})}angular.module("siteApp").controller("FrameworksController",a),a.$inject=["$routeParams","$location","frameworksList","platformsList"]}(),function(){"use strict";function a(a,b,c,d,e,f,g,h,i,j){function k(){o.tableParams.sorting(o.sortBy,o.sortOrder)}function l(){o.sortBy="vendor",o.sortOrder="asc",o.tableParams.filter({}),o.applySorting()}function m(a){o.shareUrl=d.protocol()+"://"+d.host(),80!==parseInt(d.port())&&(o.shareUrl+=":"+d.port()),o.shareUrl+="/boards?"+b(a)}function n(a){var b=e.defer(),c=[];return angular.forEach("platforms"===a?i:j,function(b){"platforms"===a&&b.forDesktop||angular.isObject(b)&&"name"in b&&c.push({id:b.type,title:b.name})}),b.resolve(c),b}var o=this;o.groupBy="vendor",o.sortBy="vendor",o.sortOrder="asc",o.shareUrl="",o.platforms=i,o.frameworks=j,o.getFilterData=n,o.applySorting=k,o.resetSettings=l,o.updateShareUrl=m;var p={};p[o.sortBy]=o.sortOrder,o.tableParams=new g(angular.extend({page:1,count:-1!==f.navigator.userAgent.indexOf("PhantomJS")?1e3:15,sorting:p},d.search()),{counts:[15,30,50,100,1e3],groupBy:function(a){return a[o.groupBy]},total:h.length,getData:function(a,b){o.updateShareUrl(b.url());var d=b.sorting()?c("orderBy")(h,o.tableParams.orderBy()):h;d=b.filter()?c("filter")(d,b.filter()):d,b.total(d.length),a.resolve(d.slice((b.page()-1)*b.count(),b.page()*b.count()))}}),a.$watch("vm.groupBy",function(){o.tableParams.reload()}),a.$watch("vm.sortBy",o.applySorting),a.$watch("vm.sortOrder",o.applySorting)}angular.module("siteApp").controller("BoardsController",a),a.$inject=["$scope","$httpParamSerializerJQLike","$filter","$location","$q","$window","ngTableParams","boardsList","platformsList","frameworksList"]}(),function(){"use strict";function a(a,b){function c(){a.url("/lib/search?query="+encodeURIComponent(d.searchQuery))}var d=this;d.submitSearchForm=c,d.searchQuery="",d.stats=b,d.searchPath="/lib/search",d.searchInputPlaceholder="Search for library ..."}angular.module("siteApp").controller("LibMainController",a),a.$inject=["$location","libStats"]}(),function(){"use strict";function a(a,b,c){function d(c){a.path(e.searchPath+"?query="+c),b.close()}var e=this;e.searchPath=c,e.search=d}angular.module("siteApp").controller("LibModalSEController",a),a.$inject=["$location","$uibModalInstance","searchPath"]}(),function(){"use strict";function a(a,b,c,d,e){function f(){var a={description:[],keywords:[]};return angular.forEach(h.searchResult.items,function(c){a.description.push(c.name),a.keywords=a.keywords.concat(c.name.split("-")),angular.forEach(["frameworks","platforms"],function(d){angular.forEach(c[d],function(c){var e=b("typeToName")(c,h[d]);a.description.push(e),a.keywords=a.keywords.concat([c,e])})})}),angular.forEach(["description","keywords"],function(b){a[b]=a[b].filter(function(a,b,c){return c.indexOf(a)===b})}),a.description=a.description.join(", "),a.keywords=a.keywords.join(", "),a}function g(){a.search({query:encodeURIComponent(h.searchQuery),page:h.searchResult.page})}var h=this,i=a.search();h.siteUtils=d,h.frameworks=c.getFrameworks(),h.platforms=c.getPlatforms(),h.searchQuery="",h.searchResult=e,h.meta=f(),h.submitSearchForm=g,h.pageChanged=g,h.searchPath="/lib/search",h.searchInputPlaceholder="Search for library ...",i.query&&i.query.length&&(h.searchQuery=decodeURIComponent(i.query))}angular.module("siteApp").controller("LibSearchController",a),a.$inject=["$location","$filter","dataService","siteUtils","searchResult"]}(),function(){"use strict";function a(a,b,c,d,e,f,g,h,i){function j(){var a={title:p.lib.name,keywords:p.lib.keywords.slice(0),description:p.lib.description},b=[];angular.forEach(p.lib.authors,function(a){b.push(a.name)}),b.length&&(a.title+=" by "+b.join(", "));var d=[];return angular.forEach(["frameworks","platforms"],function(a){angular.forEach(p.lib[a],function(b){var e=c("typeToName")(b,p[a]);d.push(e)})}),d.length&&(a.keywords=a.keywords.concat(d),a.description+=" for "+d.join(", ")),a.keywords=a.keywords.join(", "),a}function k(){var a=[];return p.lib.examples.length?(angular.forEach(p.lib.examples,function(b){var c=b.split("/");a.push({url:b,name:c[c.length-1]})}),a):a}function l(){e.eventTrack("Download",{category:"Library",label:"#"+p.lib.id+" "+p.lib.name});var b=f.getLibDlUrl(p.lib.id).$promise;b.then(function(b){a.location.href=b.url+"?filename="+[p.lib.name.replace(/[\s]+/g,"-"),p.lib.version.name,p.lib.id].join("_")})}function m(b){if(e.eventTrack("Edit",{category:"Library",label:"#"+p.lib.id+" "+p.lib.name}),0===b.indexOf("https://raw.githubusercontent.com")){var c=b.match(new RegExp("content.com/([^/]+/[^/]+)/(.+)$"));if(c)return void(a.location.href="https://github.com/"+c[1]+"/blob/"+c[2])}a.location.href=b}function n(a){p.activeTab!==q.indexOf(a)&&b.url("/lib/show/"+d.libId+"/"+d.libName+"/"+a)}function o(){if(!d.hasOwnProperty("activeTab"))return 0;var a=q.indexOf(d.activeTab);return-1!==a?a:0}var p=this,q=["examples","installation","manifest","discussion"];p.frameworks=h,p.platforms=i,p.lib=g,p.meta=j(),p.examples=k(),p.activeTab=o(),p.currentExample={},p.downloadLib=l,p.editLibraryConf=m,p.changeTab=n,"discussion"!==d.activeTab&&0===b.hash().indexOf("comment-")&&b.url("/lib/show/"+d.libId+"/"+d.libName+"/discussion#"+b.hash()),p.examples.length&&(p.currentExample=p.examples[0]);var r=b.search();r.file&&angular.forEach(p.examples,function(a){return a.name===r.file?void(p.currentExample=a):void 0})}angular.module("siteApp").controller("LibShowController",a),a.$inject=["$window","$location","$filter","$routeParams","$analytics","dataService","libInfo","frameworksList","platformsList"]}(),function(){"use strict";function a(a,b,c,d,e,f,g){function h(){var a={description:[],keywords:[]};return angular.forEach(l.searchResult.items,function(b){a.description=a.description.concat([b.lib.name,b.name]),a.keywords=a.keywords.concat(b.name.split(/[\-\_\.]/))}),a.description=a.description.filter(k),a.keywords=a.keywords.filter(k),a.description=a.description.join(", "),a.keywords=a.keywords.join(", "),a}function i(){a.search({query:encodeURIComponent(l.searchQuery),page:l.searchResult.page})}function j(a){var e,f,g=20;a.showFullCode=!1,a.shortCode="Loading...",e=c.get(a.url),e||(f=d.defer(),b.get(a.url,{cache:c,transformResponse:function(a,b){return a}}).success(function(a){f.resolve(a)}).error(function(a){console.log(a),f.resolve("Can't load an example code")}),e=f.promise),d.when(e).then(function(b){angular.isArray(b)?b=b[1]:angular.isObject(b)&&(b=b.data),b=b.replace(/(?:\s*\/\*[\s\S]+?\*\/\s*|\s*\/\/[\s\S]+?$\s)/m,""),a.shortCode=b.split("\n",g).splice(0,g).join("\n")})}function k(a,b,c){return c.indexOf(a)===b}var l=this,m=a.search();l.siteUtils=f,l.frameworks=e.getFrameworks(),l.platforms=e.getPlatforms(),l.searchQuery="",l.searchResult=g,l.meta=h(),l.submitSearchForm=i,l.pageChanged=i,l.searchPath="/lib/examples",l.searchInputPlaceholder="Search for example ...",m.query&&m.query.length&&(l.searchQuery=decodeURIComponent(m.query)),angular.forEach(l.searchResult.items,function(a){j(a)})}angular.module("siteApp").controller("LibExamplesController",a),a.$inject=["$location","$http","$templateCache","$q","dataService","siteUtils","searchResult"]}();