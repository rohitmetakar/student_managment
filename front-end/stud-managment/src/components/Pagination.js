// src/components/Pagination.js
import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ page, setPage, totalPages }) => (
  <BootstrapPagination className="mt-3">
    <BootstrapPagination.Prev
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    />
    {[...Array(totalPages)].map((_, idx) => (
      <BootstrapPagination.Item
        key={idx + 1}
        active={page === idx + 1}
        onClick={() => setPage(idx + 1)}
      >
        {idx + 1}
      </BootstrapPagination.Item>
    ))}
    <BootstrapPagination.Next
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
    />
  </BootstrapPagination>
);

export default Pagination;
