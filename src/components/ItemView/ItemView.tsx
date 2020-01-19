import React, { useState, useEffect, useCallback, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import ApplicationContext from "../../context/ApplicationContext";
import {
  ItemDetails,
  ApiError,
  FetchPhotosDetailsResponse
} from "../../types/types";
import { fetchphotoDetails } from "../../services/api-service";
import PhotoDetails from "../PhotoDetails/PhotoDetails";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ErrorAlert from "../ErrorAlert/ErrorAlert";

const ItemView: React.FC = props => {
  const photoId = get(props, "match.params.id");
  const { setIsLoading } = useContext(ApplicationContext);
  const [error, setError] = useState<ApiError | null>(null);
  const [photo, setPhoto] = useState<ItemDetails | null>(null);

  const fetchphotoDetailsHook = useCallback(async () => {
    setIsLoading(true);
    const result: FetchPhotosDetailsResponse = await fetchphotoDetails(photoId);
    if (!result.error) {
      setError(result.error);
      setPhoto(result.photoDetails);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  }, [photoId, setIsLoading]);

  useEffect(() => {
    fetchphotoDetailsHook();
  }, [fetchphotoDetailsHook]);

  return (
    <div className="text-center">
      {error ? (
        <ErrorAlert
          error={error}
          className="mt-5 pt-5"
          onRetry={fetchphotoDetailsHook}
        />
      ) : (
        <div>
          <PhotoDetails itemDetails={photo} className="mt-5" />
          <Link to="/">
            <ButtonComponent
              className="mt-3"
              onSelect={() => {}}
              text="Back to Grid"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default withRouter(ItemView);
