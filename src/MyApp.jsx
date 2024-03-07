import React, { Suspense } from "react";

export default function MyApp({ children }) {
    return (
        <html>
            <head>
                <title>Test</title>
            </head>
            <body>
                <a href="/">Go home</a> | <a href="/about">Go to about</a>
                <Suspense>{children}</Suspense>
            </body>
        </html>
    );
}