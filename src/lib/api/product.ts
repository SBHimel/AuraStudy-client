import { authClient } from "../auth-client";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const addProduct = async (product: any): Promise<any> => {
  const { data: token } = await authClient.token();
  console.log(token?.token);

  const res = await fetch(`${baseURL}/seller/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
};
