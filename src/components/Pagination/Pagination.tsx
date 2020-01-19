import React from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { range, get } from "lodash";
import { PaginationProps } from "../../types/types";

const Pagination: React.FC<PaginationProps> = ({
  linkHeader,
  onPageSelect,
  currentPage,
  className
}) => {
  const firstPageNumber: number = 1;
  const secondPageNumber: number = 2;
  const prevPage: number = currentPage - 1;
  const prev2Page: number = currentPage - 2;
  const nextPage: number = currentPage + 1;
  const next2Page: number = currentPage + 2;
  const lastPage: number = Number(get(linkHeader, "last._page", 0));
  const ZERO: number = 0;
  const ONE: number = 1;

  return (
    <div className={className}>
      {get(linkHeader, "prev") && (
        <ButtonComponent
          text={"prev"}
          onSelect={() => onPageSelect(prevPage)}
          className={"btn mr-1 mr-1 pb-0 pt-0 pr-1 pl-1 shadow-none"}
        />
      )}

      {prev2Page > firstPageNumber && (
        <ButtonComponent
          text={firstPageNumber.toString()}
          isActive={currentPage === firstPageNumber}
          onSelect={() => onPageSelect(firstPageNumber)}
          className={"btn mr-1 mr-1 pb-0 pt-0 pr-1 pl-1 shadow-none"}
        />
      )}
      {prev2Page > secondPageNumber && <span>...</span>}
      {range(
        prev2Page > ZERO ? prev2Page : ONE,
        next2Page < lastPage ? next2Page + ONE : lastPage + ONE
      ).map((element, id) => {
        return (
          <ButtonComponent
            isActive={element === currentPage}
            key={id}
            text={element.toString()}
            onSelect={() => onPageSelect(element)}
            className={"btn mr-1 mr-1 pb-0 pt-0 pr-1 pl-1 shadow-none"}
          />
        );
      })}
      {lastPage > next2Page + ONE && <span>...</span>}
      {next2Page < lastPage && (
        <ButtonComponent
          text={lastPage.toString()}
          onSelect={() => onPageSelect(lastPage)}
          className={"btn mr-1 mr-1 pb-0 pt-0 pr-1 pl-1 shadow-none"}
        />
      )}
      {get(linkHeader, "last") && (
        <ButtonComponent
          text={"next"}
          onSelect={() => onPageSelect(nextPage)}
          className={"btn mr-1 mr-1 pb-0 pt-0 pr-1 pl-1 shadow-none"}
        />
      )}
    </div>
  );
};

export default Pagination;
