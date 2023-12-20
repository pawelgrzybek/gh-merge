import { PREFIX } from "./constants.ts";

const handlerDelete = async (request: Request, kv: Deno.Kv) => {
  const body: Entry = await request.json();
  await kv.delete(
    [PREFIX, body.owner, body.repo, body.pull_number],
  );

  return Response.json(body);
};

export default handlerDelete;
