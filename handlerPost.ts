import { PREFIX } from "./constants.ts";

const handlerPost = async (request: Request, kv: Deno.Kv) => {
  const body: Entry = await request.json();
  const now = new Date().getTime();
  const schedule = new Date(body.schedule).getTime();
  const delay = schedule - now;

  if (delay < 0) {
    console.error("Schedule date should be in the future");
    return Response.json(body);
  }

  await kv.set(
    [PREFIX, body.owner, body.repo, body.pull_number],
    body.schedule,
  );
  await kv.enqueue(body, { delay });

  return Response.json(body);
};

export default handlerPost;
