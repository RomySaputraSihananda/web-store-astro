import type { APIRoute } from "astro";
import { Client } from "@elastic/elasticsearch";
import { getEnv } from "../../../../helpers";

const node = getEnv("ELASTICSEARCH_NODE");

const client: Client = new Client({ node });

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const data = await client.search({
      index: "test_products",
      query: {
        match_all: {},
      },
    });

    return new Response(
      JSON.stringify({
        message: "This was a GET!",
        data,
      })
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: "Error fetching data from Elasticsearch",
      }),
      { status: 500 }
    );
  }
};

export const POST: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: "This was a POST!",
    }),
    { status: 429 }
  );
};

export const DELETE: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: "This was a DELETE!",
    })
  );
};

export const ALL: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`,
    })
  );
};
