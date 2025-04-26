/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "demo-sst-astro",
      region: input?.region || "eu-north-1",
      stage: input?.stage || "poc",
      removal: input?.stage === "prod" ? "retain" : "remove",
      protect: ["prod"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Astro("Demo", {
      domain: {
        name: 'astro.aws.serverless.ninja',
        dns: sst.aws.dns(),
      }
    });
  },
});