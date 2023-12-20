import { PREFIX } from "./constants.ts";
import { isEntry } from "./helpers.ts";
import handlerDelete from "./handlerDelete.ts";
import handlerPost from "./handlerPost.ts";
import handlerGet from "./handelerGet.ts";

const kv = await Deno.openKv();

kv.listenQueue(async (event) => {
  if (!isEntry(event)) {
    console.error("Not an entry.");
    return;
  }

  const entry = await kv.get<string>([
    PREFIX,
    event.owner,
    event.repo,
    event.pull_number,
  ]);

  if (entry.value !== event.schedule) {
    console.log("Entry has been updated or deleted.");
    return;
  }

  const headers = new Headers({
    "Accept": "application/vnd.github+json",
    "Authorization": `Bearer ${Deno.env.get("GH_MERGE_GITHUB_TOKEN")}`,
    "X-GitHub-Api-Version": "2022-11-28",
  });
  const body = JSON.stringify({
    commit_title: "✨ Automated merge title by the Deno gh-merge",
    commit_message: "✨ Automated merge message by the Deno gh-merge",
  });

  try {
    await kv.delete(
      [PREFIX, event.owner, event.repo, event.pull_number],
    );

    const gh_response = await fetch(
      `https://api.github.com/repos/${event.owner}/${event.repo}/pulls/${event.pull_number}/merge`,
      {
        method: "PUT",
        headers,
        body,
      },
    );

    console.log(gh_response);
  } catch (e) {
    console.error(e);
  }
});

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
