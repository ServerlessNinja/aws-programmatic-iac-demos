import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { SecureBucketL3 } from './constructs/s3-secure-bucket-l3';

export interface DemoNagPacksStackProps extends cdk.StackProps {
  defaultBucket: boolean;
  secureBucket: boolean;
};


export class DemoNagPacksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Bucket(this, 'DefaultBucket');

    new SecureBucketL3(this, 'SecureBucket', {
      BusinessUnit: 'team1',
      Environment: 'dev',
      Application: 'app1',
      Component: 'bkt',
    });

  }
}