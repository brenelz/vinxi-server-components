import { eventHandler } from "vinxi/http";
import { renderToPipeableStream } from "@vinxi/react-server-dom/server";
import MyApp from "./components/MyApp";
import { routes } from "./router";
import React from 'react';

export default eventHandler(async event => {
    const page = routes[event.path];

    return renderToPipeableStream(<MyApp>{page}</MyApp>);
});