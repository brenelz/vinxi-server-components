import { createApp } from "vinxi";
import { serverComponents } from "@vinxi/server-components/plugin";

export default createApp({
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./public",
    },
    {
      name: "rsc",
      worker: true,
      type: "http",
      base: "/_rsc",
      handler: "./src/rsc.jsx",
      target: "server",
      plugins: () => [serverComponents.server()],
    },
    {
      name: "ssr",
      type: "http",
      handler: "./src/entry-server.jsx",
      target: "server",
    },
    {
      name: "client",
      type: "client",
      handler: "./src/entry-client.jsx",
      target: "browser",
      base: "/_build",
      plugins: () => [serverComponents.client()],
    },
  ],
});
