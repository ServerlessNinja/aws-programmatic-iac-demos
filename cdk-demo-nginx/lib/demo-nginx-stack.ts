import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export interface DemoNginxStackProps extends cdk.StackProps {
  readonly zoneName: string;
  readonly domainName: string;
  readonly dockerImage: string;
  readonly taskCount: number;
};

export class DemoNginxStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DemoNginxStackProps) {
    super(scope, id, props);

    // Use existing Route 53 Hosted Zone
    const hostedZone = HostedZone.fromLookup(this, 'Zone', {
      domainName: props.domainName,
      privateZone: false,
    });

    // Deploy ECS service with Fargate on ARM64 
    new ApplicationLoadBalancedFargateService(this, 'EcsNginx', {
      desiredCount: props.taskCount,
      domainName: props.domainName,
      domainZone: hostedZone,
      protocol: ApplicationProtocol.HTTPS,
      minHealthyPercent: 0,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry(props.dockerImage)
      },
      runtimePlatform: {
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
        cpuArchitecture: ecs.CpuArchitecture.ARM64,
      }
    })
  }
}