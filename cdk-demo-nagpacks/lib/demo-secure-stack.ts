import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { SecureBucketL3 } from './constructs/s3-secure-bucket-l3';

export class DemoNagSecureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new SecureBucketL3(this, 'SecureBucket', {
      department: 'team1',
      environment: 'prod',
      application: 'app1',
      component: 'data',
    });

  }
}