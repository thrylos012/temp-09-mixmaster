import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
    About,
    Coctail,
    Error,
    HomeLayout,
    Landing,
    NewsLetter,
    SinglePageError
} from "./pages";

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCoctailLoader } from "./pages/Coctail";
import { action as newsletterAction } from "./pages/NewsLetter";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5
        }
    }
});

const router = createBrowserRouter([
    {
        path: "/", //home page.
        element: <HomeLayout />,  //what displays in the browser.
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,//what displays in the browser.
                errorElement: <SinglePageError />,
                loader: landingLoader(queryClient),

            },
            {
                path: "coctail/:id", //.
                errorElement: <SinglePageError />,
                loader: singleCoctailLoader(queryClient),
                element: <Coctail />//what displays in the browser.
            },
            {
                path: "newsletter", //.
                element: <NewsLetter />,//what displays in the browser.
                errorElement: <SinglePageError />,
                action: newsletterAction
            },
            {
                path: "about", //about page.
                element: <About />//what displays in the browser.
            }
        ]
    },
]);

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

    );
};
export default App;
