/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "demo-sst-astro",
      stage: input?.stage || "poc",
      removal: input?.stage === "prod" ? "retain" : "remove",
      protect: ["prod"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Astro("Demo", {
      domain: {
        name: `${$app.stage}.aws.serverless.ninja`,
        dns: sst.aws.dns(),
      }
    });
  },
});