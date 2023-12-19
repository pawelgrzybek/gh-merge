Deno.serve(async (req) => {
  console.log("Method:", req.method);

  const url = new URL(req.url);
  console.log("Path:", url.pathname);
  console.log("Query parameters:", url.searchParams);
  console.log("Headers:", req.headers);

  if (req.body) {
    const body = await req.text();
    console.log("Body:", body);
  }

  return new Response(
    JSON.stringify({
      url_pathname: url.pathname,
      url_search_params: url.searchParams,
      url_host: url.host,
    }),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    },
  );
});
