import { expect } from "vitest";

const config = {
  env: {
    account: "234234234",
    region: "us-east-1",
  },
};

const bucketMatch = /cdk-[\da-z]{9}-assets-.*/;
const assetMatch = /[0-9a-f]{64}\.zip/;
const templateUrl = /[0-9a-f]{64}\.json/;

// ignore Asset Zip and bucket by regex
expect.addSnapshotSerializer({
  test: (val) =>
    typeof val === "string" &&
    (val.match(bucketMatch) != null ||
      val.match(assetMatch) != null ||
      val.match(templateUrl) != null),
  print: (val) => {
    // Substitute both the bucket part and the asset zip part
    let sval = `${val}`;
    sval = sval.replace(bucketMatch, "[ASSET BUCKET]");
    sval = sval.replace(assetMatch, "[ASSET ZIP]");
    sval = sval.replace(templateUrl, "[ASSET TEMPLATEURL]");
    return `"${sval}"`;
  },
});

// Code Removed
expect.addSnapshotSerializer({
  test(val) {
    return (
      val &&
      typeof val === "object" &&
      val.Properties &&
      val.Properties.Code &&
      val.Properties.Code !== "[CODE REMOVED]"
    );
  },
  serialize(val, config, indentation, depth, refs, printer) {
    return printer(
      {
        ...val,
        Properties: {
          ...val.Properties,
          Code: "[CODE REMOVED]",
        },
      },
      config,
      indentation,
      depth,
      refs,
    );
  },
});

// Image Removed
expect.addSnapshotSerializer({
  test(val) {
    return (
      val &&
      typeof val === "object" &&
      val.Properties &&
      val.Properties.Image &&
      val.Properties.Image !== "[IMAGE REMOVED]"
    );
  },
  serialize(val, config, indentation, depth, refs, printer) {
    return printer(
      {
        ...val,
        Properties: {
          ...val.Properties,
          Image: "[IMAGE REMOVED]",
        },
      },
      config,
      indentation,
      depth,
      refs,
    );
  },
});
