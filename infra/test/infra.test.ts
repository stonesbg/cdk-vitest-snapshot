import { test, expect } from "vitest";
import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as CdkAppSample from "../lib/infra-stack";

test("CDK Sample App Stack", () => {
  const app = new cdk.App();
  const stack = new CdkAppSample.InfraStack(app, "CdkAppSampleStack");
  const template = Template.fromStack(stack);

  expect(template).toMatchSnapshot();
});
