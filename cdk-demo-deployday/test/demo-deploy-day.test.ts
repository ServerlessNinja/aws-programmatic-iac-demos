import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as DemoDeployDay from '../lib/demo-deploy-day-stack';

const app = new cdk.App();
const stack = new DemoDeployDay.DemoDeployDayStack(app, 'TestDeployDayStack');
const template = Template.fromStack(stack);

// Test if resource is defined in the output template
test('DynamoDB table is defined', () => {
  template.resourceCountIs('AWS::DynamoDB::GlobalTable', 1);
});

// Test if resource has properties defined in output template
test('DynamoDB table is protected', () => {
  template.hasResource('AWS::DynamoDB::GlobalTable', {
    UpdateReplacePolicy: 'Retain',
    DeletionPolicy: 'Retain',
  });
});