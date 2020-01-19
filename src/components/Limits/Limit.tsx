import React from "react";
import { PageLimitProps } from "../../types/types";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const Limit: React.FC<PageLimitProps> = ({
  limits = [],
  currentLimit,
  onLimitChange,
  className
}) => {
  return (
    <div className={className}>
      {limits.map((value, id) => {
        return (
          <ButtonComponent
            className={"btn mr-1 mr-1 pb-0 pt-0 pr-1 pl-1 shadow-none"}
            key={id}
            text={value.toString()}
            onSelect={() => onLimitChange(value)}
            isActive={currentLimit === value}
          />
        );
      })}
      <span>Per page</span>
    </div>
  );
};
export default Limit;
