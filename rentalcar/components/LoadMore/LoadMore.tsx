// components/LoadMore.tsx
"use client";
import React from "react";

export default function LoadMore({
  onLoadMore,
  loading,
}: {
  onLoadMore: () => void;
  loading: boolean;
}) {
  return (
    <div style={{ textAlign: "center", margin: "24px 0" }}>
      <button
        onClick={onLoadMore}
        disabled={loading}
        style={{ cursor: "pointer" }}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
