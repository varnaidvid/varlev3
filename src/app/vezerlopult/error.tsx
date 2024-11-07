"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 text-center">
      <h2>Something went wrong!</h2>
      <code>
        <pre>{error.name}</pre>
        <pre>{error.digest}</pre>
        <pre>{error.message}</pre>
      </code>
      <button
        className="rounded-md border bg-neutral-50 p-2 hover:bg-neutral-100"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
