import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DemoDeployDayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get currend day of the week
    const weekDay = new Date().toLocaleString('en-US', { weekday: 'short' });
    const deployDay = 'Wed';

    // Deploy DynamoDB table conditionally
    if (weekDay === deployDay) {
      console.log(`It's deployment day, it's ${deployDay}! 🚀`);

      new dynamodb.TableV2(this, 'Table', {
        partitionKey: {
          name: 'id',
          type: dynamodb.AttributeType.STRING,
        },
        billing: dynamodb.Billing.onDemand(),
        removalPolicy: cdk.RemovalPolicy.RETAIN,
      });

    } else {
      console.warn(`It's not deployment day, it's ${weekDay}! 💣`);
    }
  }
}
