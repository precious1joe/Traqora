# Calendar Export for Confirmed Bookings

Traqora allows travelers to export their confirmed flight itineraries directly to their device calendar via standard iCalendar (`.ics`) format.

## Usage

When viewing a confirmed booking, users can select the "Add to Calendar" option. This generates an `.ics` file snapshot containing:
- Flight number, route, and airline details
- Departure and arrival timestamps (with UTC formatting)
- Booking ID and seat number
- Airport location

If arrival time is omitted from the snapshot, a default 3-hour flight duration is applied.