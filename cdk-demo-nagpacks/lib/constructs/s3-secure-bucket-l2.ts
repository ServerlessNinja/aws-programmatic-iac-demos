import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from 'aws-cdk-lib/aws-s3';

// Example of CDK construct (L2) for secure S3 bucket
export class SecureBucketL2 extends s3.Bucket {
  constructor(scope: Construct, id: string, props?: s3.BucketProps) {
    
    super(scope, id, { 
      ...props, 
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.KMS,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      serverAccessLogsPrefix: "logs/",
      autoDeleteObjects: false,
      enforceSSL: true,
      versioned: true,
    });
  }
}