import Link from "next/link";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { MAPS_DIRECTIONS_URL } from "@/lib/constants";

function Stars({ n }: { n: number }) {
  return (
    <span className="text-amber-400" aria-hidden>
      {"★".repeat(Math.min(5, Math.round(n)))}
    </span>
  );
}

/**
 * Server component: 5★ Google reviews (Places API). Renders nothing if API is not configured
 * or no five-star reviews appear in the API response (max 5 reviews returned by Google).
 */
export async function GoogleReviewsSection() {
  const data = await fetchGoogleReviews();

  if (data.source === "none") {
    return null;
  }

  const listingUrl = data.mapsUrl ?? MAPS_DIRECTIONS_URL;

  if (data.reviews.length === 0) {
    if (data.placeRating == null || data.totalReviewCount == null) {
      return null;
    }
    return (
      <section
        className="border-y border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 py-10 md:py-12"
        aria-label="Google rating"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-center">
          <p className="text-sm text-slate-700">
            <span className="inline-flex items-center gap-1.5 align-middle">
              <Stars n={data.placeRating} />
              <span className="font-semibold text-slate-900">
                {data.placeRating.toFixed(1)} on Google
              </span>
            </span>
            <span className="text-slate-500"> · </span>
            {data.totalReviewCount.toLocaleString()} reviews
          </p>
          <Link
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-teal-300 hover:bg-teal-50"
          >
            Read reviews on Google
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-y border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 py-14 md:py-18"
      aria-label="Patient reviews from Google"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Google reviews
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            What patients say
          </h2>
          {data.placeRating != null && data.totalReviewCount != null ? (
            <p className="mt-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5 align-middle">
                <Stars n={data.placeRating} />
                <span className="font-semibold text-slate-800">
                  {data.placeRating.toFixed(1)} out of 5
                </span>
              </span>
              <span className="text-slate-500"> · </span>
              <span>{data.totalReviewCount.toLocaleString()} Google reviews</span>
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews.map((r, i) => (
            <blockquote
              key={`${r.authorName}-${i}`}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              cite={listingUrl}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Stars n={r.rating} />
                  <span className="sr-only">{r.rating} out of 5 stars</span>
                </div>
                {r.relativeTime ? (
                  <span className="text-[11px] text-slate-400">{r.relativeTime}</span>
                ) : null}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-slate-700 line-clamp-6">
                &ldquo;{r.text}&rdquo;
              </p>
              <footer className="mt-4 border-t border-slate-100 pt-3 text-sm font-semibold text-slate-900">
                {r.authorUrl ? (
                  <a
                    href={r.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-700 hover:underline"
                  >
                    {r.authorName}
                  </a>
                ) : (
                  r.authorName
                )}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-slate-200/80 pt-6 text-center sm:flex-row sm:flex-wrap">
          <Link
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-teal-300 hover:bg-teal-50"
          >
            See all reviews on Google
          </Link>
          <p className="max-w-md text-[11px] leading-snug text-slate-500">
            Reviews are shown as provided by Google. Display of this content follows{" "}
            <a
              href="https://developers.google.com/maps/documentation/places/web-service/policies"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-700"
            >
              Google Maps Platform policies
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
