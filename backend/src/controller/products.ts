import { Request, Response } from "express";
import { Product, Query } from "../types";
import { getURL } from "../utils";

const get = async (urlValue: string, queries: Query[]) => {
  const url = getURL(urlValue, queries);
  return fetch(url).then<Product[]>(response => response.json());
};

export const getAll = async (request: Request, response: Response) => {
  const queries = [
    {
      name: "limit",
      value: (request.query["limit"] as string) || "30",
    },
    {
      name: "skip",
      value: (request.query["skip"] as string) || "0",
    },
  ];

  response.send(await get("https://dummyjson.com/products", queries));
};

export const getByCategory = async (request: Request, response: Response) => {
  const category = request.params["category"];
  const queries = [
    {
      name: "limit",
      value: (request.query["limit"] as string) || "30",
    },
    {
      name: "skip",
      value: (request.query["skip"] as string) || "0",
    },
  ];

  response.send(
    await get(`https://dummyjson.com/products/category/${category}`, queries),
  );
};

export const getById = async (request: Request, response: Response) => {
  const id = parseInt(request.params["id"]);

  let product = await fetch(
    `https://dummyjson.com/products/${id}`,
  ).then<Product>(response => response.json());

  response.send(product);
};

export const search = async (request: Request, response: Response) => {
  const search = request.query["q"] as string;

  if (!search) return;

  const queries: Query[] = [
    {
      name: "limit",
      value: (request.query["limit"] as string) || "30",
    },
    {
      name: "skip",
      value: (request.query["skip"] as string) || "0",
    },
    {
      name: "q",
      value: search,
    },
  ];

  response.send(await get(`https://dummyjson.com/products/search`, queries));
};
