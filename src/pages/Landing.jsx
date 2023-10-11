import React from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CoctailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

const cocktailSearchUrl =
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

import { useQuery } from "@tanstack/react-query";

const searchQoctailsQuery = (searchTerm) => {
    return {
        queryKey: ["searh", searchTerm || "all"],
        queryFn: async () => {
            const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
            return response.data.drinks;
        }
    };
};

export const loader = (queryClient) =>
    async ({ request }) => {
        const url = new URL(request.url);

        const searchTerm = url.searchParams.get("search") || "";

        // console.log(searchTerm);
        // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
        await queryClient.ensureQueryData(searchQoctailsQuery(searchTerm));
        return { searchTerm };
    };

const Landing = () => {
    const { searchTerm } = useLoaderData();
    const { data: drinks, } = useQuery(searchQoctailsQuery(searchTerm));
    //console.log(drinks);

    return (
        <>
            <SearchForm searchTerm={searchTerm} />
            <CoctailList drinks={drinks} />
        </>
    );
};

export default Landing;