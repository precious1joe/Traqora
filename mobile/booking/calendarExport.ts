export interface BookingSnapshot {
  bookingId: string | number;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTimestamp: number; // Unix timestamp in seconds
  arrivalTimestamp?: number; // Unix timestamp in seconds
  airline?: string;
  seat?: string;
}

/**
 * Formats a Unix timestamp into an iCalendar date-time string (UTC).
 * Format: YYYYMMDDTHHmmssZ
 */
function formatIcalTimestamp(timestampSeconds: number): string {
  const date = new Date(timestampSeconds * 1000);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Generates a standard iCalendar (.ics) string from a confirmed booking itinerary snapshot.
 */
export function generateIcalString(booking: BookingSnapshot): string {
  const now = Math.floor(Date.now() / 1000);
  const dtStamp = formatIcalTimestamp(now);
  const dtStart = formatIcalTimestamp(booking.departureTimestamp);
  
  // Default flight duration to 3 hours if arrival is not specified
  const arrivalTime = booking.arrivalTimestamp ?? (booking.departureTimestamp + 3 * 3600);
  const dtEnd = formatIcalTimestamp(arrivalTime);

  const summary = `Flight ${booking.flightNumber} (${booking.origin} -> ${booking.destination})`;
  const description = [
    `Traqora Booking ID: ${booking.bookingId}`,
    `Airline: ${booking.airline ?? 'Traqora Partner'}`,
    `Flight: ${booking.flightNumber}`,
    `Route: ${booking.origin} to ${booking.destination}`,
    booking.seat ? `Seat: ${booking.seat}` : '',
  ].filter(Boolean).join('\n');

  const location = `${booking.origin} Airport`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Traqora//Travel Booking//EN',
    'BEGIN:VEVENT',
    `UID:traqora-booking-${booking.bookingId}@traqora.io`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
