#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoNginxStack } from '../lib/demo-nginx-stack';

const app = new cdk.App();
new DemoNginxStack(app, 'DemoNginxStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION,
  },
});