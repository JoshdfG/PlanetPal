// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// export const createNewOrganization = async () => {
//   const client = new ApolloClient({
//     uri: process.env.NEXT_PUBLIC_QUERY_URL,
//     cache: new InMemoryCache(),
//   });
//   const GET_products = gql`
//       query{    organisationCreateds(first: 50) {
//     id
//     Organisation_address
//     Nft
//     organisation_name
//   }`;

//   try {
//     const { data } = await client.query({ query: GET_products });
//     return data.organisationCreateds;
//   } catch (error) {
//     console.error("error fetching data", error);
//   }
// };
