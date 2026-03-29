/**
 * Fetches public Google reviews via Places API (New).
 * Requires GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID (server env).
 * Enable "Places API (New)" in Google Cloud and restrict the key to Places API.
 * @see https://developers.google.com/maps/documentation/places/web-service/place-details
 */

export type PublicReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
  authorUrl?: string;
};

export type GoogleReviewsPayload = {
  reviews: PublicReview[];
  placeRating?: number;
  totalReviewCount?: number;
  mapsUrl?: string;
  source: "google" | "none";
};

const MAX_REVIEWS = 5;
const MAX_TEXT = 320;
const REVALIDATE_SEC = 60 * 60 * 12; // 12 hours

function truncate(text: string, max: number) {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
};

type PlacesDetailResponse = {
  reviews?: PlacesReview[];
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
};

export async function fetchGoogleReviews(): Promise<GoogleReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return { reviews: [], source: "none" };
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews,rating,userRatingCount,googleMapsUri",
      },
      next: { revalidate: REVALIDATE_SEC },
    });

    if (!res.ok) {
      console.error("Google Places API error:", res.status, await res.text());
      return { reviews: [], source: "none" };
    }

    const data = (await res.json()) as PlacesDetailResponse;
    const list = data.reviews ?? [];

    const fiveStar: PublicReview[] = [];
    for (const r of list) {
      if (Number(r.rating) !== 5) continue;
      const text = (r.text?.text ?? "").trim();
      if (!text) continue;
      fiveStar.push({
        authorName: r.authorAttribution?.displayName?.trim() || "Google reviewer",
        rating: 5,
        text: truncate(text, MAX_TEXT),
        relativeTime: r.relativePublishTimeDescription,
        authorUrl: r.authorAttribution?.uri,
      });
      if (fiveStar.length >= MAX_REVIEWS) break;
    }

    const hasAggregate = data.rating != null || (data.userRatingCount ?? 0) > 0;
    return {
      reviews: fiveStar,
      placeRating: data.rating,
      totalReviewCount: data.userRatingCount,
      mapsUrl: data.googleMapsUri,
      source: fiveStar.length > 0 || hasAggregate ? "google" : "none",
    };
  } catch (e) {
    console.error("fetchGoogleReviews:", e);
    return { reviews: [], source: "none" };
  }
}
