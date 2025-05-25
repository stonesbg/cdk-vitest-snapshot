import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";

import { Construct } from "constructs";

interface S3ResourcesProps extends cdk.NestedStackProps {}

export class S3Resources extends cdk.NestedStack {
  constructor(scope: Construct, id: string, props: S3ResourcesProps) {
    super(scope, id, props);

    // S3 Bucket
    new s3.Bucket(this, "TestBucket", {
      bucketName: "my-test-bucket",
      versioned: true,
    });
  }
}
