/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "demo-sst-astro",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
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