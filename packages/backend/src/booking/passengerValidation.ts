export interface Passenger {
  type: 'infant' | 'child' | 'adult';
  age: number;
}

export interface BookingValidationRequest {
  passengers: Passenger[];
  itineraryDate: string; // YYYY-MM-DD
}

export interface BookingValidationError {
  code: string;
  message: string;
}

export function validatePassengersForBooking(request: BookingValidationRequest): BookingValidationError[] {
  const errors: BookingValidationError[] = [];
  const adults = request.passengers.filter(p => p.type === 'adult');
  const infants = request.passengers.filter(p => p.type === 'infant');
  const children = request.passengers.filter(p => p.type === 'child');

  for (const passenger of request.passengers) {
    if (passenger.type === 'infant' && passenger.age >= 2) {
      errors.push({
        code: 'INVALID_INFANT_AGE',
        message: 'Infants must be under 2 years of age.'
      });
    }
    if (passenger.type === 'child' && (passenger.age < 2 || passenger.age >= 12)) {
      errors.push({
        code: 'INVALID_CHILD_AGE',
        message: 'Children must be between 2 and 11 years of age.'
      });
    }
    if (passenger.type === 'adult' && passenger.age < 18) {
      errors.push({
        code: 'INVALID_ADULT_AGE',
        message: 'Adult passengers must be at least 18 years of age.'
      });
    }
  }

  if (infants.length > adults.length) {
    errors.push({
      code: 'UNACCOMPANIED_INFANTS',
      message: 'Each infant must be accompanied by at least one adult passenger.'
    });
  }

  return errors;
}
