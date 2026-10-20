import { validatePassengersForBooking } from './passengerValidation';

describe('validatePassengersForBooking', () => {
  it('validates a correct adult and child/infant combination', () => {
    const errors = validatePassengersForBooking({
      itineraryDate: '2025-06-01',
      passengers: [
        { type: 'adult', age: 30 },
        { type: 'infant', age: 1 }
      ]
    });
    expect(errors).toHaveLength(0);
  });

  it('fails when an infant is unaccompanied by an adult', () => {
    const errors = validatePassengersForBooking({
      itineraryDate: '2025-06-01',
      passengers: [
        { type: 'infant', age: 1 }
      ]
    });
    expect(errors).toContainEqual(expect.objectContaining({ code: 'UNACCOMPANIED_INFANTS' }));
  });

  it('fails when passenger ages are invalid', () => {
    const errors = validatePassengersForBooking({
      itineraryDate: '2025-06-01',
      passengers: [
        { type: 'adult', age: 15 },
        { type: 'infant', age: 3 }
      ]
    });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toContainEqual(expect.objectContaining({ code: 'INVALID_ADULT_AGE' }));
    expect(errors).toContainEqual(expect.objectContaining({ code: 'INVALID_INFANT_AGE' }));
  });
});
