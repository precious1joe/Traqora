import React from 'react';
import { render } from '@testing-library/react-native';
import BookingDetailScreen from '../screens/BookingDetailScreen';

describe('BookingDetailScreen', () => {
  const sampleProps = {
    itinerary: {
      flightNumber: 'TRQ101',
      from: 'JFK',
      to: 'LAX',
      departureTimestamp: 1704067200,
    },
    passenger: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      seat: '12A',
    },
    paymentState: 'confirmed',
    supplierReferencePolicy: 'Standard supplier reference policy applies.',
    cancellationTerms: 'Free cancellation up to 24 hours before departure.',
  };

  it('renders itinerary, passenger summary, payment state, supplier reference policy, and cancellation terms correctly', () => {
    const { getByText } = render(<BookingDetailScreen {...sampleProps} />);

    expect(getByText('TRQ101')).toBeTruthy();
    expect(getByText('JFK -> LAX')).toBeTruthy();
    expect(getByText('Jane Doe')).toBeTruthy();
    expect(getByText('jane@example.com')).toBeTruthy();
    expect(getByText('12A')).toBeTruthy();
    expect(getByText('confirmed')).toBeTruthy();
    expect(getByText('Standard supplier reference policy applies.')).toBeTruthy();
    expect(getByText('Free cancellation up to 24 hours before departure.')).toBeTruthy();
  });
});
