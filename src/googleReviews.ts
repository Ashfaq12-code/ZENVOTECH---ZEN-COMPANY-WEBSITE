export type GoogleReviewPayload = {
  placeName: string;
  googleMapsUri: string;
  rating: number | null;
  userRatingCount: number | null;
  reviews: Array<{
    id: string;
    rating: number;
    text: string;
    publishTime: string | null;
    relativePublishTimeDescription: string;
    author: {
      displayName: string;
      uri: string | null;
      photoUri: string | null;
    };
  }>;
};
