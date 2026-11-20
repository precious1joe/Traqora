const React = require('react');
const { render, fireEvent, waitFor } = require('@testing-library/react-native');
const { Share } = require('react-native');
const BookingConfirmationScreen = require('../src/screens/BookingConfirmationScreen');
const { generateConfirmationDocument, downloadOrShareConfirmation } = require('../booking/confirmation');

jest.spyOn(Share, 'share').mockImplementation(() => Promise.resolve({ action: 'sharedAction' }));

describe('BookingConfirmation Document & Download', () => {
  const sampleData = {
    bookingId: '98765',
    passengerName: 'Jane Doe',
    flightNumber: 'TRQ202',
    fromAirport: 'SFO',
    toAirport: 'JFK',
    departureTime: '2025-07-15 14:00',
    status: 'confirmed',
    totalAmount: '$600.00',
  };

  it('generates the correct confirmation document text (normal path)', () => {
    const doc = generateConfirmationDocument(sampleData);
    expect(doc).toContain('TRAQORA BOOKING CONFIRMATION');
    expect(doc).toContain('Reference: TRAQ-98765');
    expect(doc).toContain('Passenger: Jane Doe');
    expect(doc).toContain('Flight: TRQ202 (SFO -> JFK)');
    expect(doc).toContain('Departure: 2025-07-15 14:00');
    expect(doc).toContain('Status: confirmed');
    expect(doc).toContain('Total: $600.00');
  });

  it('throws an error on missing required booking data (validation/failure path)', () => {
    expect(() => generateConfirmationDocument({})).toThrow(
      'Invalid booking data: bookingId and passengerName are required.'
    );
  });

  it('triggers download/share successfully with correct payload', async () => {
    await downloadOrShareConfirmation(sampleData);
    expect(Share.share).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Booking Confirmation TRAQ-98765',
        message: expect.any(String),
      })
    );
  });

  it('handles and wraps share errors appropriately (failure path)', async () => {
    Share.share.mockImplementationOnce(() => Promise.reject(new Error('User cancelled or share error')));
    await expect(downloadOrShareConfirmation(sampleData)).rejects.toThrow(
      'Failed to download or share confirmation: User cancelled or share error'
    );
  });

  it('renders BookingConfirmationScreen and triggers download on button press', async () => {
    const itinerary = [
      {
        flightNumber: 'TRQ202',
        fromAirport: 'SFO',
        toAirport: 'JFK',
        departureTime: '2025-07-15 14:00',
      },
    ];

    const { getByText } = render(
      <BookingConfirmationScreen
        bookingId="98765"
        passengerName="Jane Doe"
        itinerary={itinerary}
        paymentStatus="confirmed"
        totalAmount="$600.00"
      />
    );

    expect(getByText('Booking Confirmed!')).toBeTruthy();
    expect(getByText('Reference: TRAQ-98765')).toBeTruthy();
    expect(getByText('Passenger: Jane Doe')).toBeTruthy();

    const button = getByText('Download Confirmation');
    expect(button).toBeTruthy();

    fireEvent.press(button);

    await waitFor(() => {
      expect(Share.share).toHaveBeenCalled();
    });
  });
});
