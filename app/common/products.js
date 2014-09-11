'use strict';

function loadProducts() {
    /*jshint validthis:true */
//    console.log(['defining products.js', this, this.moduleName]);
    /*jshint validthis:true */
    window.ResultsModule = {};
    /*jshint validthis:true */
    return window.ResultsModule;
}

/***
 *
 *
 * This is a code that runs both on server side and on client side.
 *
 *
 *****/
(function (exports) {

    exports.suiteNames = [];
    var day = 1000 * 60 * 60 * 24;
    // your code goes here
    function init() {
        var s;
        for (var p in exports.products) {
            var product = exports.products[p];
            var suites = product.suites;
            product.suitesName = [];
            for (s in suites) {
                product.suitesName.push(s); // make all suiteNames available on product.
                exports.suiteNames.push(s);
                suites[s].name = s; // make the key available as "name" attribute.
            }
        }

        for (s in exports.statuses) {
            exports.statuses[s].name = s;
        }
    }

    exports.products = {
        'XAP': {
            type: ['tgrid', 'iTests-XAP'],
            'localTestResultPrefix': 'xap',
            'suites': {
                'Cpp Regression': { 'frequency': 2 * day, 'reports': false, 'labels': {'CppLinux32': 'CPP Linux 32', 'CppLinux64': 'CPP Linux 64'}},
                'CPP_Linux-amd64': { 'frequency': 2 * day, 'label': 'CPP AMD64'},
                'CPP_Linux32': { 'frequency': 2 * day, 'label': 'Sgtest Linux 32'},
                'DISCONNECT': { 'frequency': 2 * day },
//                'DotNet Sanity v2.0':{ 'frequency': 2 * day ,  'labels' : {'dotnet_2.0_x86_Sanity' : 'Sanity : .NET 2.0 x86'} },
//                'DotNet Sanity v4.0':{ 'frequency': 2 * day, 'reports':false, 'labels': { 'dotnet_4.0_x86' : 'Sanity : .NET 4.0 x86'} },
                'DotNet v2.0': { 'frequency': 2 * day, 'reports': false, 'labels': {'dotnet_2.0_x86': '.NET 2.0 x86'} },
                'DotNet v4.0': { 'frequency': 2 * day, 'reports': false, 'labels': { 'dotnet_4.0_x86': '.NET 4.0 x86'}  },
                'Dynamic_Locators': { 'frequency': 2 * day },
                'ESM': { 'frequency': 2 * day },
//                'Java Sanity':{ 'frequency': 2 * day },
                'LocalCLoud_Examples': { 'frequency': 2 * day, 'label': 'Examples Local' },
                'Nightly Regression': { 'frequency': 2 * day, 'reports': false, 'labels': {
                    '4_Sun7_OFF_Heap': 'Off Heap',
                    '6_Sun7_OFF_Heap': 'Off Heap',
                    '6_IBM16': 'IBM 6',
                    '7_IBM17': 'IBM 7',
                    '3_Sun16_Global_Order': 'Sun 6 G.O.',
                    '1_Sun16': 'Sun 6',
                    '4_Sun7': 'Sun 7',
                    '5_Sun8' : 'Sun 8',
                    '9_Sun7_SSD' : 'Sun 7 SSD',
                    'Sun16_Weekend': 'Sun 6 Weekend'} },
                'SECURITY': { 'frequency': 2 * day },
                'ServiceGrid': { 'frequency': 2 * day },
                'WAN': { 'frequency': 2 * day },
                'XAP_Webui_Chrome': { 'frequency': 2 * day, 'label': 'UI Chrome' },
                'XAP_Webui_Firefox': { 'frequency': 2 * day, 'label': 'UI FF'},
                'XAP_Webui_Firefox_Sanity': { 'frequency': 2 * day, 'label': 'Sanity : UI FF ' }
            }
        },
        'CLOUDIFY': {
            type: ['iTests-Cloudify'],
            'localTestResultPrefix': 'cloudify',
            suites: {
                'Cloudify_Webui_Firefox_Security': {'frequency': 2 * day, 'label': 'UI FF Security' },
                'Cloudify_Webui_IE': {'label': 'UI IE'},
                'BigData-Clouds': {'frequency': 2 * day, 'label': 'BD Clouds' },
                'BigData-LocalCloud': {'frequency': 2 * day, 'label': 'BD Local' },
                'BigData_BYON': {'frequency': 2 * day, 'label': 'BD BYON' },
                'BYON': {'frequency': 2 * day, 'label': 'BYON' },
                'BYON_Failover': {'frequency': 2 * day, 'label': 'BYON Failover' },
                'CLOUDIFY': {'frequency': 2 * day, 'label': 'Cloudify' },
                'CLOUDIFY_CLOUDS': {'frequency': 2 * day, 'label': 'Clouds' },
                'CLOUDIFY_CLOUDS_AZURE': {'frequency': 2 * day, 'label': 'Azure' },
                'CLOUDIFY_CLOUDS_EXAMPLES': {'frequency': 2 * day, 'label': 'Examples' },
                'CLOUDIFY_CLOUDS_SCALE': {'frequency': 2 * day, 'label': 'Scale'},
                'CLOUDIFY_CLOUDS_USM_STORAGE_BRANCH': {'frequency': 2 * day, 'label': 'USM Storage Branch' },
                'CLOUDIFY_Mac': {'frequency': 2 * day, 'label': 'Mac'},
                'CLOUDIFY_Mac_LocalCloud': {'frequency': 2 * day, 'label': 'Mac Local' },
                'CLOUDIFY_Sanity': {'frequency': 2 * day, 'label': 'Sanity' },
                'CLOUDIFY_SECURITY': {'frequency': 2 * day, 'label': 'Security' },
                'CLOUDIFY_SECURITY_LDAP': {'frequency': 2 * day, 'label': 'LDAP' },
                'Cloudify_Webui_Chrome': {'frequency': 2 * day, 'label': 'UI Chrome' },
                'Cloudify_Webui_Clouds': {'frequency': 2 * day, 'label': 'UI Clouds' },
                'Cloudify_Webui_Firefox': {'frequency': 2 * day, 'label': 'UI FF' },
                'CLOUDIFY_Win_Clouds': {'frequency': 2 * day, 'label': 'Win Clouds' },
                'CLOUDIFY_WIN_LocalCloud': {'frequency': 2 * day, 'label': 'Win Local' },
                'CLOUDIFY_WIN_LocalCloud_Security': {'frequency': 2 * day, 'label': 'Win Local Security' },
                'CLOUDIFY_XAP': {'frequency': 2 * day, 'label': 'XAP' }
            }
        },
        'UI': {
            type: ['iTests-Cloudify', 'tgrid', 'iTests-XAP'],
            suites: {
                'Cloudify_Webui_Firefox_Security': {'frequency': 2 * day, 'label': 'Cloudify FF Security' },
                'Cloudify_Webui_IE': {'label': 'Cloudify IE'},
//                'XAP_Webui_Chrome':{'frequency': 2 *day, 'label':'XAP Chrome' },
                'XAP_Webui_Firefox': {'frequency': 2 * day, 'label': 'XAP FF' },
//                'XAP_Webui_Firefox_Sanity':{'frequency': 2 *day, 'label':'XAP FF Sanity' },
                'Cloudify_Webui_Chrome': {'frequency': 2 * day, 'label': 'Cloudify Chrome' },
//                'Cloudify_Webui_Clouds':{'frequency': 2 *day, 'label':'Cloudify Clouds' },
                'Cloudify_Webui_Firefox': {'frequency': 2 * day, 'label': 'Cloudify FF' }
            }
        }
    };

    // which versions should I show
//    exports.unifiedDashboard = {'ui':['2.6.0','9.6.0']};
    exports.unifiedDashboard = {
        'xap': [
            ['10.1.0']
        ],
        'cloudify': [
            ['2.7.1']
        ],
        'ui': [
            ['2.7.1', '9.7.1'], ['10.0.0']
        ]

    };
//    exports.unifiedDashboard = { 'xap':[['9.6.0'],['9.5.2']] , 'cloudify':[['2.6.0'],['2.5.2']],'ui':[['2.6.0','9.6.0'],['2.5.2','9.5.2']]};

    exports.ignoreJvmTypes = [ 'Sun16_Weekend' ];

    exports.statuses = {'BROKEN': { 'label': 'Broken'}, 'FAILED': { 'label': 'Failed'}, 'PASSED': {'label': 'Passed'}};

    function getSuiteByName(suiteName, product) {

        if (typeof(product) === 'undefined' || product === null) {
            for (var p in exports.products) {
                if (exports.products[p].suites.hasOwnProperty(suiteName)) {
                    return exports.products[p].suites[suiteName];
                }
            }
        } else if (typeof(product) === 'string' && exports.products.hasOwnProperty(product.toUpperCase())) {
            var productObj = exports.products[product.toUpperCase()];
            return productObj.suites[suiteName];
        } else if (product.suites.hasOwnProperty(suiteName)) {
            return product.suites[suiteName];
        }
        return null;
    }


    exports.detailedResultsLink = function (result) {
        var product = null;
        var possibleProducts = ['XAP', 'CLOUDIFY'];
        for (var v in possibleProducts) {
//            console.log(['searching for mvnTestReport in', possibleProducts[v]]);
            var suite = getSuiteByName(result.suiteName, exports.products[possibleProducts[v]]);
            if (!!suite && suite.reports !== false) {
                product = exports.products[possibleProducts[v]];
            }


        }

        if (!!product) {
            return 'http://testlogs2.gsdev.info/sgtest3.0-' + product.localTestResultPrefix + '/deploy/local-builds/build_' + result.buildNumber + '/' + result.suiteName + '/';
        } else {
            return null;
        }
    };

    exports.label = function (result, product) {
        var suite = getSuiteByName(result.suiteName, product);
        if (suite !== null && suite.hasOwnProperty('labels') && result.jvmType !== '') {
            return suite.labels[result.jvmType];
        } else if (result.jvmType === '' && suite.hasOwnProperty('label')) {
            return suite.label;
        }
        return null;
    };

    // defines the status for a product
    exports.status = function (result) {

        if (typeof(result) === 'undefined') {
            return 'null';
        }
        // reference a preconfigure frequency in which test should run.
        if (result.totalTestsRun === 0 || ( new Date().getTime() - new Date(result.timestamp).getTime() ) > getSuiteByName(result.suiteName).frequency) {
            return exports.statuses.BROKEN;
        } else if (parseInt(result.failedTests,10) > 0) {
            return exports.statuses.FAILED;
        } else {
            return exports.statuses.PASSED;
        }
    };


    init();

})(typeof exports === 'undefined' ? loadProducts() : exports);
