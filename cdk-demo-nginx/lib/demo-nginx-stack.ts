import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export class DemoNginxStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Access CDK context variable
    const zoneName = this.node.tryGetContext('zoneName') as string;
    const domainName = this.node.tryGetContext('domainName') as string;
    const dockerImage = this.node.tryGetContext('dockerImage') as string;
    const taskCount = this.node.tryGetContext('taskCount') as number || 1;

    // Use existing Route 53 Hosted Zone
    const hostedZone = HostedZone.fromLookup(this, 'Zone', {
      domainName: zoneName,
      privateZone: false,
    });

    // Deploy ECS service with Fargate on ARM64 
    new ApplicationLoadBalancedFargateService(this, 'EcsNginx', {
      desiredCount: taskCount,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry(dockerImage)
      },
      runtimePlatform: {
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
        cpuArchitecture: ecs.CpuArchitecture.ARM64,
      },
      protocol: ApplicationProtocol.HTTPS,
      domainName: domainName,
      domainZone: hostedZone,
    })
  }
}