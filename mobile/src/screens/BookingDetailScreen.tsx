import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface BookingDetailProps {
  itinerary: {
    flightNumber: string;
    from: string;
    to: string;
    departureTimestamp: number;
  };
  passenger: {
    name: string;
    email: string;
    seat: string;
  };
  paymentState: string;
  supplierReferencePolicy: string;
  cancellationTerms: string;
}

export default function BookingDetailScreen({ itinerary, passenger, paymentState, supplierReferencePolicy, cancellationTerms }: BookingDetailProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title} accessibilityRole="header">Booking Detail</Text>
      
      <View style={styles.section} accessibilityLabel="Itinerary Section">
        <Text style={styles.sectionTitle}>Saved Itinerary</Text>
        <Text>Flight: {itinerary.flightNumber}</Text>
        <Text>{'Route: ' + itinerary.from + ' -> ' + itinerary.to}</Text>
        <Text>Departure: {itinerary.departureTimestamp}</Text>
      </View>

      <View style={styles.section} accessibilityLabel="Passenger Summary Section">
        <Text style={styles.sectionTitle}>Passenger Summary</Text>
        <Text>Name: {passenger.name}</Text>
        <Text>Email: {passenger.email}</Text>
        <Text>Seat: {passenger.seat}</Text>
      </View>

      <View style={styles.section} accessibilityLabel="Payment State Section">
        <Text style={styles.sectionTitle}>Payment State</Text>
        <Text>Status: {paymentState}</Text>
      </View>

      <View style={styles.section} accessibilityLabel="Supplier Reference Policy Section">
        <Text style={styles.sectionTitle}>Supplier Reference Policy</Text>
        <Text>{supplierReferencePolicy}</Text>
      </View>

      <View style={styles.section} accessibilityLabel="Cancellation Terms Section">
        <Text style={styles.sectionTitle}>Cancellation Terms</Text>
        <Text>{cancellationTerms}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
