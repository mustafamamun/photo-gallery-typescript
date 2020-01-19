import fetch from "isomorphic-fetch";
import { OK, INTERNAL_SERVER_ERROR, getStatusText } from "http-status-codes";
import { api_path } from "../config/app-config";

import {
  FetchPhotosResponse,
  ListItem,
  LinkHeader,
  FetchPhotosDetailsResponse,
  ItemDetails
} from "../types/types";
import {
  photoListParser,
  linkHeaderParser,
  photoDetailParser
} from "./parsing-service";

export const fetchphotos = async (
  query: string
): Promise<FetchPhotosResponse> => {
  let response: FetchPhotosResponse;
  try {
    const apiResponse = await fetch(`${api_path}${query}`);
    if (apiResponse.status === OK) {
      const respondedPhotos: any = await apiResponse.json();
      const linkHeader: any = apiResponse.headers.get("link");
      const parsedPhotos: Array<ListItem> = photoListParser(respondedPhotos);
      const parsedLinkHeader: LinkHeader = linkHeaderParser(linkHeader);
      response = {
        photos: parsedPhotos,
        linkHeader: parsedLinkHeader,
        error: null
      };
      return response;
    } else {
      response = {
        photos: [],
        linkHeader: null,
        error: {
          status: apiResponse.status,
          message: getStatusText(apiResponse.status)
        }
      };
      return response;
    }
  } catch (error) {
    response = {
      photos: [],
      linkHeader: null,
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: getStatusText(INTERNAL_SERVER_ERROR)
      }
    };
    return response;
  }
};

export const fetchphotoDetails = async (
  query: string
): Promise<FetchPhotosDetailsResponse> => {
  let response: FetchPhotosDetailsResponse;
  try {
    const apiResponse = await fetch(`${api_path}${query}`);
    if (apiResponse.status === OK) {
      const respondedPhotoDetails: any = await apiResponse.json();
      const parsedPhoto: ItemDetails = photoDetailParser(respondedPhotoDetails);
      response = {
        photoDetails: parsedPhoto,
        error: null
      };
      return response;
    } else {
      response = {
        photoDetails: null,
        error: {
          status: apiResponse.status,
          message: getStatusText(apiResponse.status)
        }
      };
      return response;
    }
  } catch (error) {
    response = {
      photoDetails: null,
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: getStatusText(INTERNAL_SERVER_ERROR)
      }
    };
    return response;
  }
};
