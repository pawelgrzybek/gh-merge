export function isEntry(event: unknown): event is Entry {
  return (
    (event as Entry)?.owner !== undefined &&
    typeof (event as Entry).owner === "string" &&
    (event as Entry)?.repo !== undefined &&
    typeof (event as Entry).repo === "string" &&
    (event as Entry)?.pull_number !== undefined &&
    typeof (event as Entry).pull_number === "number" &&
    (event as Entry)?.schedule !== undefined &&
    typeof (event as Entry).schedule === "string"
  );
}
