import React, { useState, useEffect, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import {
  ItemDetails,
  ApiError,
  FetchPhotosDetailsResponse
} from "../../types/types";
import { fetchphotoDetails } from "../../services/api-service";
import PhotoDetails from "../PhotoDetails/PhotoDetails";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const ItemView: React.FC = props => {
  const photoId: string = get(props, "match.params.id");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    <div className="text-center mt-5">
      {error ? (
        <ErrorAlert
          error={error}
          className="mt-5 pt-5"
          onRetry={fetchphotoDetailsHook}
        />
      ) : (
        <div>
          <h2>Photo Details</h2>
          <LoadingComponent isLoading={isLoading} />
          {!isLoading && <PhotoDetails itemDetails={photo} className="mt-5" />}
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
