import React from "react";
import MyButton from "../atoms/my-button";
import MyIcon from "../atoms/my-icon";

interface PaginationProps {
  data: any[];
  page: number;
  setPage: (page: number) => void;
  limit?: number;
}

export function Pagination({ limit, page, setPage, data }: PaginationProps) {
  const handlePage = (pg: number) => {
    setPage(pg);
  };

  React.useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  return (
    <div className="flex items-center justify-center">
      <MyButton
        onClick={() => handlePage(page - 1)}
        variant="ghost"
        disabled={page === 1}
      >
        <MyIcon name="left" className={`${page === 1 ? "hidden" : ""}`} />
      </MyButton>

      <MyButton
        variant="ghost"
        className={`cursor-default text-primary-600 text-lg ${page === 1 ? "ml-6" : ""}`}
        // onClick={() => handlePage(pages)}
        key={page}
      >
        {page}
      </MyButton>

      <MyButton
        disabled={data.length !== limit}
        onClick={() => handlePage(page + 1)}
        variant="ghost"
      >
        <MyIcon
          className={`${data.length !== limit ? "hidden" : ""}`}
          name="right"
        />
      </MyButton>
    </div>
  );
}
