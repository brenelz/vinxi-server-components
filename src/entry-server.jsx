import { eventHandler } from "vinxi/http";
import MyApp from "./MyApp";
import { getManifest } from "vinxi/manifest";
import { renderToPipeableStream } from "react-dom/server";
import { routes } from "./router";
import React from 'react';

export default eventHandler(async event => {
    const clientManifest = getManifest("client");

    const clientHandler = clientManifest.inputs[clientManifest.handler];
    const scriptSrc = clientHandler.output.path;

    const page = routes[event.path];

    const stream = await new Promise(async resolve => {
        const stream = renderToPipeableStream(<MyApp>{page}</MyApp>, {
            onShellReady() {
                resolve(stream);
            },
            bootstrapModules: [scriptSrc],
            bootstrapScriptContent: `window.manifest = ${JSON.stringify(
                await clientManifest.json()
            )};`,
        });
    });

    event.node.res.setHeader("Content-Type", "text/html");
    return stream;
});