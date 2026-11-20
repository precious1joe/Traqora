# Booking Confirmation Documentation

## Overview
The booking confirmation feature allows users to view and download/share a concise confirmation document containing their booking reference, passenger name, itinerary details, payment status, and total amount.

## Validation & Error Handling
- The document generator requires `bookingId` and `passengerName`. If missing, an error is thrown.
- Download/share actions wrap OS share sheet errors and throw descriptive error messages if the share operation fails.
