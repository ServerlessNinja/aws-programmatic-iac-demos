import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from 'aws-cdk-lib/aws-s3';
import { NagSuppressions } from 'cdk-nag';

export interface SecureBucketProps {
  BusinessUnit: string;
  Environment: string;
  Application: string;
  Component: string;
}

// Example of CDK construct (L3) for secure S3 bucket
export class SecureBucketL3 extends Construct {
  constructor(scope: Construct, id: string, props: SecureBucketProps) {
    super(scope, id);

    const region = cdk.Stack.of(this).region;
    
    const secureBucket = new s3.Bucket(this, 'SecBkt', {
      bucketName: `${props.BusinessUnit}-${props.Environment}-${props.Application}-${props.Component}-${region}`,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.KMS,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      serverAccessLogsPrefix: "logs/",
      autoDeleteObjects: false,
      enforceSSL: true,
      versioned: true,
    });

    NagSuppressions.addResourceSuppressions(secureBucket, [
      { id: 'PCI.DSS.321-S3BucketReplicationEnabled', reason: 'Bucket replication not required' },
    ]);
  }
}