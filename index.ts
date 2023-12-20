const kv = await Deno.openKv();

interface Entry {
  "owner": string;
  "repo": string;
  "pull_number": number;
  "schedule": string;
}

const PREFIX = "gh-merge";

const handlerGet = async (request: Request, kv: Deno.Kv) => {
  const entries = kv.list<Entry>({
    prefix: [PREFIX],
  });
  const response = await Array.fromAsync(entries);

  return Response.json(response);
};

const handlerPost = async (request: Request, kv: Deno.Kv) => {
  const body: Entry = await request.json();
  await kv.set(
    [PREFIX, body.owner, body.repo, body.pull_number],
    body.schedule,
  );

  return Response.json(body);
};

const handlerDelete = async (request: Request, kv: Deno.Kv) => {
  const body: Entry = await request.json();
  await kv.delete(
    [PREFIX, body.owner, body.repo, body.pull_number],
  );

  return Response.json(body);
};

const HANDLER_MAPPER = {
  GET: handlerGet,
  POST: handlerPost,
  DELETE: handlerDelete,
};

Deno.serve(async (request) =>
  await HANDLER_MAPPER[request.method as keyof typeof HANDLER_MAPPER](
    request,
    kv,
  )
);
