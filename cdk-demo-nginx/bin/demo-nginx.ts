#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoNginxStack } from '../lib/demo-nginx-stack';

const app = new cdk.App();

const props = {
  zoneName: app.node.tryGetContext('zoneName') as string,
  domainName: app.node.tryGetContext('domainName') as string,
  dockerImage: app.node.tryGetContext('dockerImage') as string,
  taskCount: app.node.tryGetContext('taskCount') as number || 1,
};

new DemoNginxStack(app, 'DemoNginxStack', {
  ...props,
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION,
  },
});