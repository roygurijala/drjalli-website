// src/lib/booking.ts
export function buildBookingLink(opts: {
    bookingHref?: string;
    providerId?: string;
    departmentId?: string;
  }) {
    if (opts.bookingHref) return opts.bookingHref;
    const p = new URLSearchParams();
    if (opts.providerId) p.set("providerId", opts.providerId);
    if (opts.departmentId) p.set("departmentId", opts.departmentId);
    // You can change this to your final route later
    return `/appointments${p.toString() ? `?${p.toString()}` : ""}`;
  }
  