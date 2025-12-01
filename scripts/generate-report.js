const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Ensure reports directory exists
const reportsDir = path.join(__dirname, '../reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(reportsDir, 'cucumber-report.json'),
  output: path.join(reportsDir, 'cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'Development',
    'Browser': 'Chromium',
    'Platform': process.platform,
    'Executed': 'Local'
  }
};

try {
  if (fs.existsSync(options.jsonFile)) {
    reporter.generate(options);
    console.log('✅ HTML Report generated successfully at:', options.output);
  } else {
    console.log('⚠️  No cucumber JSON report found. Run tests first with: npm run test:cucumber');
  }
} catch (error) {
  console.error('❌ Error generating report:', error);
  process.exit(1);
}
