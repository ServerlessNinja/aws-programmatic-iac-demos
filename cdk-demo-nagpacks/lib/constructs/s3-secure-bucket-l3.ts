
import { Construct } from "constructs";
import { Stack, StackProps, RemovalPolicy } from "aws-cdk-lib";
import * as s3 from 'aws-cdk-lib/aws-s3';
import { NagSuppressions } from 'cdk-nag';

export interface SecureBucketProps extends StackProps {
  readonly department: string;
  readonly application: string;
  readonly component: string;
  readonly environment: string;
}

// Example of CDK construct (L3) for secure S3 bucket
export class SecureBucketL3 extends Construct {
  public readonly secureBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: SecureBucketProps) {
    super(scope, id);

    const region = Stack.of(this).region;
    
    this.secureBucket = new s3.Bucket(this, 'SecBkt', {
      ...props,
      bucketName: `${props.department}-${props.application}-${props.component}-${props.environment}-${region}`,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.KMS,
      removalPolicy: RemovalPolicy.RETAIN,
      serverAccessLogsPrefix: "logs/",
      autoDeleteObjects: false,
      enforceSSL: true,
      versioned: true,
    });

    NagSuppressions.addResourceSuppressions(this.secureBucket, [
      { id: 'PCI.DSS.321-S3BucketReplicationEnabled', reason: 'Bucket replication not required' },
    ]);
  }
}