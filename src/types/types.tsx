export type ApiError = {
  status: number;
  message: string;
};

export type ItemDetails = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  description?: string;
  name?: string;
  timeStamp?: number | Date;
};

export type ListItem = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type GridProps = {
  className: string;
  photos: Array<ListItem>;
};

export type FetchPhotosResponse = {
  photos: Array<ListItem>;
  linkHeader: LinkHeader | null;
  error: ApiError | null;
};
type LinkItem = {
  rel: string;
  url: string;
  _limit: string;
  _page: string;
};
export type LinkHeader = {
  first: LinkItem;
  last: LinkItem;
  next?: LinkItem;
  prev?: LinkItem;
};

export type ButtonProps = {
  className: string;
  text: string;
  onSelect: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isActive?: boolean;
};

export type PaginationProps = {
  linkHeader: LinkHeader | null;
  onPageSelect: (page: number) => void;
  currentPage: number;
  className: string;
};

export type PageLimitProps = {
  className: string;
  currentLimit: number;
  onLimitChange: (limit: number) => void;
  limits: Array<number>;
};

export type FetchPhotosDetailsResponse = {
  photoDetails: ItemDetails | null;
  error: ApiError | null;
};

export type PhotoDetailsProps = {
  itemDetails: ItemDetails | null;
  className: string;
};

export type ErrorAlertProps = {
  onRetry: () => void;
  error: ApiError | null;
  className: string;
};
