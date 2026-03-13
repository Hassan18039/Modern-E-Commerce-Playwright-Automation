const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: 'reports/cucumber_html_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "Test Environment": "STAGING",
        "Browser": "Playwright",
        "Platform": process.platform,
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};

reporter.generate(options);
