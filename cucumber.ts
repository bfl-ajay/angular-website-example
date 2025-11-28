import * as fs from 'fs';
import * as path from 'path';

export interface CucumberConfig {
  require: string[];
  format: string[];
  parallel?: number;
}

export const getCucumberConfig = (): CucumberConfig => {
  return {
    require: [
      'dist/tests/steps/**/*.js',
    ],
    format: [
      'progress-bar',
      'html:cucumber-report.html',
      'json:cucumber-report.json',
    ],
    parallel: 2,
  };
};

/**
 * Cucumber configuration for BDD testing
 * This config is used to run feature files with step definitions
 */
export const cucumberConfig: CucumberConfig = {
  require: [
    './tests/steps/**/*.ts',
  ],
  format: [
    'progress-bar',
    'html:./test-results/cucumber-report.html',
    'json:./test-results/cucumber-report.json',
    'junit:./test-results/cucumber-report.xml',
  ],
  parallel: 2,
};

export default cucumberConfig;
