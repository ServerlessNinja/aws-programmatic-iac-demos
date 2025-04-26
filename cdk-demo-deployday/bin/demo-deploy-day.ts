#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoDeployDayStack } from '../lib/demo-deploy-day-stack';

const app = new cdk.App();
const deploymentDay: string = process.env?.CDK_DEPLOYMENT_DAY || '';

new DemoDeployDayStack(app, 'DemoDeployDayStack', deploymentDay, {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION,
  }
});