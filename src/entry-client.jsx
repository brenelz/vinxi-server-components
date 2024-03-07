import { createRoot } from "react-dom/client";
import "vinxi/client";
import { createFromFetch } from "@vinxi/react-server-dom/client";
import React, { Suspense } from "react";
import { createModuleLoader } from "@vinxi/react-server-dom/runtime";
import { getManifest } from 'vinxi/manifest';

globalThis.__vite__ = createModuleLoader({
    loadModule: async (id) => {
        return getManifest("client").chunks[id].import();
    },
});

function App({ url }) {
    return <Suspense>{createFromFetch(fetch("/_rsc" + url))}</Suspense>;
}

const root = createRoot(document);
root.render(<App url={window.location.pathname} />);

window.addEventListener("click", e => {
    if (e.target?.tagName !== "A") {
        return;
    }

    e.preventDefault();

    window.history.pushState(null, "", e.target.pathname);

    root.render(<App url={e.target.pathname} />);
});