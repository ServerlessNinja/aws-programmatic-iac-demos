import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';

export interface CfnLegacyTemplateStackProps extends cdk.StackProps {
  /**
   * Response message from the Lambda function
   * @default 'Hej Košice!'
   */
  readonly responseMessage?: string;
  /**
   * The tag value of the S3 bucket
   * @default 'Legacy Tag'
   */
  readonly bucketTag?: string;
}

/**
 * CDK Migrate Demo - Legacy Template
 */
export class CfnLegacyTemplateStack extends cdk.Stack {
  /**
   * The name of the S3 bucket
   */
  public readonly s3BucketName;

  public constructor(scope: cdk.App, id: string, props: CfnLegacyTemplateStackProps = {}) {
    super(scope, id, props);

    // Applying default props
    props = {
      ...props,
      responseMessage: props.responseMessage ?? 'Hej Košice!',
      bucketTag: props.bucketTag ?? 'Legacy Tag',
    };

    // Resources
    const lambdaExecutionRole = new iam.CfnRole(this, 'LambdaExecutionRole', {
      assumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
            Action: 'sts:AssumeRole',
          },
        ],
      },
      managedPolicyArns: [
        'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
      ],
    });

    const s3Bucket = new s3.CfnBucket(this, 'S3Bucket', {
      publicAccessBlockConfiguration: {
        blockPublicAcls: true,
        blockPublicPolicy: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: true,
      },
      bucketEncryption: {
        serverSideEncryptionConfiguration: [
          {
            serverSideEncryptionByDefault: {
              sseAlgorithm: 'AES256',
            },
          },
        ],
      },
      tags: [
        {
          key: 'Organization',
          value: 'Serverless Ninja',
        },
        {
          key: 'Application',
          value: 'CDK Migrate Demo',
        },
        {
          key: 'DynamicTag',
          value: props.bucketTag!,
        },
      ],
    });

    const helloWorldFunction = new lambda.CfnFunction(this, 'HelloWorldFunction', {
      handler: 'index.lambda_handler',
      runtime: 'python3.11',
      role: lambdaExecutionRole.attrArn,
      code: {
        zipFile: 'import os\ndef lambda_handler(event, context):\n  response_message = os.getenv(\'RESPONSE_MESSAGE\')\n  return {\n    \"statusCode\": 200,\n    \"body\": \"{}\".format(response_message)\n  }\n',
      },
      environment: {
        variables: {
          'RESPONSE_MESSAGE': props.responseMessage!,
        },
      },
    });

    // Outputs
    this.s3BucketName = s3Bucket.ref;
    new cdk.CfnOutput(this, 'CfnOutputS3BucketName', {
      key: 'S3BucketName',
      description: 'The name of the S3 bucket',
      exportName: `${this.stackName}-S3BucketName`,
      value: this.s3BucketName!.toString(),
    });
  }
}
