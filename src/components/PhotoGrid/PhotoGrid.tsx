import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GridProps } from "../../types/types";
import { ListItem } from "../../types/types";

const GridComponent: React.FC<GridProps> = ({ className, photos = [] }) => {
  return (
    <Row className={className}>
      {photos.map((item: ListItem) => {
        return (
          <Col xs={"auto"} key={item.id} className={"mt-5"}>
            <Link to={`/photos/${item.id}`}>
              <Image src={item.thumbnailUrl} thumbnail={true} />
              <div>{item.id}</div>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
};

export default GridComponent;
