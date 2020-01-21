import React from "react";
import { Image } from "react-bootstrap";
import { isValid, format } from "date-fns";
import { get } from "lodash";
import { PhotoDetailsProps } from "../../types/types";

const PhotoDetails: React.FC<PhotoDetailsProps> = ({
  itemDetails,
  className
}) => {
  return (
    <div className={className}>
      <b>Id:</b> {get(itemDetails, "id", "")}
      <br />
      <b>Title:</b> {get(itemDetails, "title", "")}
      {get(itemDetails, "description", "") && (
        <div>
          <b>Description:</b> {get(itemDetails, "description", "")}
        </div>
      )}
      {get(itemDetails, "timeStamp") && isValid(get(itemDetails, "timeStamp")) && (
        <div>
          <b>Time:</b>{" "}
          {format(get(itemDetails, "timeStamp", 0), "yyyy-MM-dd HH:mm")}
        </div>
      )}
      <div>
        <Image src={get(itemDetails, "url", "")} />
      </div>
    </div>
  );
};
export default PhotoDetails;
