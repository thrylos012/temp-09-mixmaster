import React from "react";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";
const singleCocktailUrl =
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
import { useQuery } from "@tanstack/react-query";


const singleCocktailQuery = (id) => {
    return {
        queryKey: ["coctail", id],
        queryFn: async () => {
            const { data } = await axios.get(`${singleCocktailUrl}${id}`);
            return data;
        }
    };
};


export const loader =
    (queryClient) =>
        async ({ params }) => {
            const { id } = params;

            await queryClient.ensureQueryData(singleCocktailQuery(id));
            console.log(id);
            return { id };
        };

const Coctail = () => {
    const { id } = useLoaderData();
    //if (!data) return <h2>Something went wrong...</h2>;
    const { data } = useQuery(singleCocktailQuery(id));

    if (!data) return <Navigate to="/" />;

    const singleDrink = data.drinks[0];
    const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions
    } = singleDrink;
    console.log(singleDrink);

    const validIngridients = Object.keys(singleDrink).filter((key) => {
        return key.startsWith("strIngredient") && singleDrink[key] !== null;
    }).map((key) => {
        return singleDrink[key];
    });
    console.log(validIngridients);
    return (
        <Wrapper>
            <header>
                <Link to="/" className="btn">
                    back home
                </Link>
                <h3>{name}</h3>
            </header>
            <div className="drink">
                <img src={image} alt={name} className="img" />
                <div className="drink-info">
                    <p>
                        <span className="drink-data">
                            name:
                        </span>
                        {name}
                    </p>
                    <p>
                        <span className="drink-data">
                            category:
                        </span>
                        {category}
                    </p>
                    <p>
                        <span className="drink-data">
                            info:
                        </span>
                        {info}
                    </p>
                    <p>
                        <span className="drink-data">
                            glass:
                        </span>
                        {glass}
                    </p>
                    <p>
                        <span className="drink-data">
                            Ingridients:
                        </span>
                        {validIngridients.map((item, index) => {
                            return <span className="ing" key={item}>
                                {item}{index < validIngridients.length - 1 ? "," : ""}
                            </span>;
                        })}
                    </p>
                    <p>
                        <span className="drink-data">
                            instructions:
                        </span>
                        {instructions}
                    </p>

                </div>
            </div>
        </Wrapper>
    );
};

export default Coctail;