import { generateIcalString, BookingSnapshot } from '../booking/calendarExport';

describe('Calendar Export', () => {
  it('generates a valid iCal string for a confirmed booking', () => {
    const booking: BookingSnapshot = {
      bookingId: 1001,
      flightNumber: 'TRQ101',
      origin: 'JFK',
      destination: 'LHR',
      departureTimestamp: 1672531200, // 2023-01-01T00:00:00Z
      arrivalTimestamp: 1672542000,   // 2023-01-01T03:00:00Z
      airline: 'Stellar Air',
      seat: '12A',
    };

    const ics = generateIcalString(booking);

    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('VERSION:2.0');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('SUMMARY:Flight TRQ101 (JFK -> LHR)');
    expect(ics).toContain('DTSTART:20230101T000000Z');
    expect(ics).toContain('DTEND:20230101T030000Z');
    expect(ics).toContain('UID:traqora-booking-1001@traqora.io');
    expect(ics).toContain('DESCRIPTION:Traqora Booking ID: 1001\nAirline: Stellar Air\nFlight: TRQ101\nRoute: JFK to LHR\nSeat: 12A');
    expect(ics).toContain('LOCATION:JFK Airport');
    expect(ics).toContain('STATUS:CONFIRMED');
    expect(ics).toContain('END:VEVENT');
    expect(ics).toContain('END:VCALENDAR');
  });

  it('handles missing optional arrival time and seat gracefully', () => {
    const booking: BookingSnapshot = {
      bookingId: 'ABC-999',
      flightNumber: 'TRQ202',
      origin: 'SFO',
      destination: 'LAX',
      departureTimestamp: 1700000000,
    };

    const ics = generateIcalString(booking);

    expect(ics).toContain('SUMMARY:Flight TRQ202 (SFO -> LAX)');
    expect(ics).toContain('UID:traqora-booking-ABC-999@traqora.io');
    expect(ics).toContain('DTSTART:');
    expect(ics).toContain('DTEND:');
    expect(ics).toContain('END:VEVENT');
  });
});
