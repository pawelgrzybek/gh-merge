import { PREFIX } from "./constants.ts";

const handlerGet = async (_request: Request, kv: Deno.Kv) => {
  const entries = kv.list<string>({
    prefix: [PREFIX],
  });
  const response = await Array.fromAsync(entries);

  return Response.json(response);
};

export default handlerGet;
