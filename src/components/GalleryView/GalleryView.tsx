import React, { useState, useCallback, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { isEmpty } from "lodash";
import { fetchphotos } from "../../services/api-service";
import {
  ListItem,
  ApiError,
  FetchPhotosResponse,
  LinkHeader
} from "../../types/types";
import { limits } from "../../config/app-config";
import PhotoGrid from "../PhotoGrid/PhotoGrid";
import Pagination from "../Pagination/Pagination";
import PageLimit from "../Limits/Limit";
import ApplicationContext from "../../context/ApplicationContext";
import ErrorAlert from "../ErrorAlert/ErrorAlert";

const GalleryView: React.FC = () => {
  const ONE: number = 1;
  const locStIdCurPg: string = "photo_gallery_current_page";
  const locStIdLim: string = "photo_gallery_limit";
  const { isLoading, setIsLoading } = useContext(ApplicationContext);
  const [error, setError] = useState<ApiError | null>(null);
  const [photos, setPhotos] = useState<Array<ListItem>>([]);
  const [linkHeader, setLinkHeader] = useState<LinkHeader | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    sessionStorage.getItem(locStIdCurPg)
      ? Number(sessionStorage.getItem(locStIdCurPg))
      : ONE
  );
  const [limit, setLimit] = useState<number>(
    sessionStorage.getItem(locStIdLim)
      ? Number(sessionStorage.getItem(locStIdLim))
      : limits[0]
  );
  const fetchphotosHook = useCallback(async () => {
    const query: string = `?_page=${currentPage}&_limit=${limit}`;
    setIsLoading(true);
    const result: FetchPhotosResponse = await fetchphotos(query);
    if (!result.error) {
      setPhotos(result.photos);
      setLinkHeader(result.linkHeader);
      setError(result.error);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  }, [currentPage, limit, setIsLoading]);

  useEffect(() => {
    fetchphotosHook();
  }, [fetchphotosHook]);
  const onPageSelect = (page: number): void => {
    sessionStorage.setItem(locStIdCurPg, page.toString());
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };
  const onLimitChange = (limit: number): void => {
    sessionStorage.setItem(locStIdLim, limit.toString());
    sessionStorage.setItem(locStIdCurPg, ONE.toString());
    window.scrollTo(0, 0);
    setCurrentPage(ONE);
    setLimit(limit);
  };
  const onRetry = (): void => {
    fetchphotosHook();
  };
  return !isLoading ? (
    <div className="text-center">
      {error ? (
        <ErrorAlert onRetry={onRetry} error={error} className="mt-5 pt-5" />
      ) : (
        <div>
          <h1 className="mt-5">Photo Gallery</h1>
          <PhotoGrid className="justify-content-center" photos={photos} />
          {!isEmpty(photos) && (
            <Row className={"mt-5 mb-3"}>
              <Col md={8} xs={12}>
                <Pagination
                  className="text-center text-md-left mb-3"
                  onPageSelect={onPageSelect}
                  currentPage={currentPage}
                  linkHeader={linkHeader}
                />
              </Col>
              <Col md={4} xs={12}>
                <PageLimit
                  onLimitChange={onLimitChange}
                  currentLimit={limit}
                  limits={limits}
                  className={"text-md-right text-center"}
                />
              </Col>
            </Row>
          )}
        </div>
      )}
    </div>
  ) : null;
};
export default GalleryView;
