#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoDeployDayStack } from '../lib/demo-deploy-day-stack';

const app = new cdk.App();

new DemoDeployDayStack(app, 'DemoDeployDayStack', 'Wed', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION,
  }
});