import { PREFIX } from "./constants.ts";

const handlerPost = async (request: Request, kv: Deno.Kv) => {
  const body: Entry = await request.json();
  const now = new Date().getTime();
  const schedule = new Date(body.schedule).getTime();
  const delay = schedule - now;

  if (delay < 0) {
    return Response.json(
      {
        status: "error",
        statusCode: 400,
        data: null,
        error: "Schedule date should be a future date.",
      },
      { status: 400 },
    );
  }

  await kv.set(
    [PREFIX, body.owner, body.repo, body.pull_number],
    body.schedule,
  );
  await kv.enqueue(body, { delay });

  return Response.json(
    {
      status: "success",
      statusCode: 200,
      data: body,
      error: null,
    },
    { status: 200 },
  );
};

export default handlerPost;
