import test from 'node:test';
import assert from 'node:assert';
import { validatePassengersForBooking } from './passengerValidation';

test('validates a correct adult and child/infant combination', () => {
  const errors = validatePassengersForBooking({
    itineraryDate: '2025-06-01',
    passengers: [
      { type: 'adult', age: 30 },
      { type: 'infant', age: 1 }
    ]
  });
  assert.strictEqual(errors.length, 0);
});

test('fails when an infant is unaccompanied by an adult', () => {
  const errors = validatePassengersForBooking({
    itineraryDate: '2025-06-01',
    passengers: [
      { type: 'infant', age: 1 }
    ]
  });
  assert.ok(errors.some(e => e.code === 'UNACCOMPANIED_INFANTS'));
});

test('fails when passenger ages are invalid', () => {
  const errors = validatePassengersForBooking({
    itineraryDate: '2025-06-01',
    passengers: [
      { type: 'adult', age: 15 },
      { type: 'infant', age: 3 }
    ]
  });
  assert.ok(errors.length > 0);
  assert.ok(errors.some(e => e.code === 'INVALID_ADULT_AGE'));
  assert.ok(errors.some(e => e.code === 'INVALID_INFANT_AGE'));
});
