# Deno gh-merge

## Get the list of scheduled pull request merges

```
curl --request GET \
  --url https://gh-merge.deno.dev/ \
  --header 'Authorization: Bearer ${GH_MERGE_API_KEY}'
```

## Enqueue a pull request merge

```
curl --request POST \
  --url https://gh-merge.deno.dev/ \
  --header 'Authorization: Bearer ${GH_MERGE_API_KEY}' \
  --header 'Content-Type: application/json' \
  --data '{
	"owner": "pawelgrzybek",
	"repo": "deno-gh-merge",
	"pull_number": 1,
	"schedule": "2023-12-20T16:30:00"
}'
```

## Delete a pull request form the queue

```
curl --request DELETE \
  --url https://gh-merge.deno.dev/ \
  --header 'Authorization: Bearer ${GH_MERGE_API_KEY}' \
  --header 'Content-Type: application/json' \
  --data '{
	"owner": "pawelgrzybek",
	"repo": "deno-gh-merge",
	"pull_number": 1
}'
```
