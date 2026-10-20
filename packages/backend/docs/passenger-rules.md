# Passenger Age and Accompanying Rules for Booking

## Overview
Before any reservation is created with a provider, the booking orchestration layer validates passenger ages and accompanying adult constraints against the itinerary date.

## Rules
1. **Infants**: Must be strictly under 2 years of age on the itinerary date. Each infant requires at least one accompanying adult.
2. **Children**: Must be between 2 and 11 years of age inclusive.
3. **Adults**: Must be 18 years of age or older.

## Failure Codes
- `INVALID_INFANT_AGE`: Infant age is 2 or older.
- `INVALID_CHILD_AGE`: Child age is outside the 2-11 range.
- `INVALID_ADULT_AGE`: Adult passenger is under 18.
- `UNACCOMPANIED_INFANTS`: Number of infants exceeds the number of accompanying adults.
