#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoNagDefaultStack } from '../lib/demo-default-stack';
import { DemoNagSecureStack } from '../lib/demo-secure-stack'
import { AwsSolutionsChecks, PCIDSS321Checks } from 'cdk-nag'
import { Aspects } from 'aws-cdk-lib';

const app = new cdk.App();

const props = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  nag: { 
    verbose: true, 
    logIgnores: true
  }
};

Aspects.of(app).add(new AwsSolutionsChecks(props.nag));
Aspects.of(app).add(new PCIDSS321Checks(props.nag));

new DemoNagDefaultStack(app, 'DemoNagDefaultStack', { env: props.env });
new DemoNagSecureStack(app, 'DemoNagSecureStack', { env: props.env });
