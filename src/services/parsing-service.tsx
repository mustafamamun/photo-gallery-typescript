import { get } from "lodash";
import LinkHeaderParser from "parse-link-header";
import { ListItem, LinkHeader, ItemDetails } from "../types/types";

export const photoDetailParser = (photo: any): ItemDetails => {
  return {
    albumId: get(photo, "albumId", 0),
    id: get(photo, "id", 0),
    title: get(photo, "title", ""),
    url: get(photo, "url", ""),
    thumbnailUrl: get(photo, "thumbnailUrl", ""),
    description: get(photo, "description"),
    name: get(photo, "name"),
    timeStamp: get(photo, "timeStamp")
  };
};

export const photoListParser = (photos: Array<any>): Array<ListItem> => {
  return photos.map((item: any) => {
    return {
      albumId: get(item, "albumId", 0),
      id: get(item, "id", 0),
      title: get(item, "title", ""),
      url: get(item, "url", ""),
      thumbnailUrl: get(item, "thumbnailUrl", "")
    };
  });
};

export const linkHeaderParser = (linkHeader: any): LinkHeader => {
  let parsedLinkHeader: LinkHeader;
  const apiHeader: any = LinkHeaderParser(linkHeader);
  parsedLinkHeader = {
    first: {
      rel: get(apiHeader, "first.rel", "").toString(),
      url: get(apiHeader, "first.url", "").toString(),
      _limit: get(apiHeader, "first._limit", "").toString(),
      _page: get(apiHeader, "first._page", "").toString()
    },
    last: {
      rel: get(apiHeader, "last.rel", "").toString(),
      url: get(apiHeader, "last.url", "").toString(),
      _limit: get(apiHeader, "last._limit", "").toString(),
      _page: get(apiHeader, "last._page", "").toString()
    },
    next: get(apiHeader, "next")
      ? {
          rel: get(apiHeader, "next.rel", "").toString(),
          url: get(apiHeader, "next.url", "").toString(),
          _limit: get(apiHeader, "next._limi", "").toString(),
          _page: get(apiHeader, "next.:_page", "").toString()
        }
      : undefined,
    prev: get(apiHeader, "prev")
      ? {
          rel: get(apiHeader, "prev.rel", "").toString(),
          url: get(apiHeader, "prev.url", "").toString(),
          _limit: get(apiHeader, "prev._limi", "").toString(),
          _page: get(apiHeader, "prev._page", "").toString()
        }
      : undefined
  };

  return parsedLinkHeader;
};
