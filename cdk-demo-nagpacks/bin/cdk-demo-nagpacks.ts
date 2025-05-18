#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoNagPacksStack } from '../lib/cdk-demo-nagpacks-stack';
import { AwsSolutionsChecks, PCIDSS321Checks } from 'cdk-nag'
import { Aspects } from 'aws-cdk-lib';

const app = new cdk.App();

Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true, logIgnores: true }));
Aspects.of(app).add(new PCIDSS321Checks({ verbose: true, logIgnores: true }));

new DemoNagPacksStack(app, 'DemoNagPacksStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION,
  }
});