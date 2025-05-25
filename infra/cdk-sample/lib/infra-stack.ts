import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as s3 from "aws-cdk-lib/aws-s3";

import { DatabaseResources } from "./database-nested";
import { S3Resources } from "./s3-nested";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket
    new s3.Bucket(this, "TestBucket", {
      bucketName: "my-test-bucket",
      versioned: true,
    });

    const fn = new lambda.Function(this, "MyFunction", {
      code: lambda.Code.fromAsset("../../apps/lambda-handler"),
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: "index.handler",
    });

    const fn2 = new lambda.Function(this, "from-bucket", {
      code: lambda.Code.fromBucket(
        cdk.aws_s3.Bucket.fromBucketName(this, "MyBucket", "saved-assets"),
        "assets/lambda-handler.zip",
      ),
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: "index.handler",
    });

    const endpoint = new apigw.LambdaRestApi(this, "MyEndpoint", {
      handler: fn,
      restApiName: "HelloApi",
    });

    // we pull in the two stateful nested stacks
    new DatabaseResources(this, "DatabaseResources", {});

    new S3Resources(this, "EventBusResources", {});
  }
}
