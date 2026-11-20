const React = require('react');
const { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } = require('react-native');
const { downloadOrShareConfirmation } = require('../../booking/confirmation');

function BookingConfirmationScreen({
  bookingId,
  passengerName,
  itinerary,
  paymentStatus,
  totalAmount,
}) {
  const handleDownload = () => {
    const first = itinerary[0] || { flightNumber: 'N/A', fromAirport: 'N/A', toAirport: 'N/A', departureTime: 'N/A' };
    downloadOrShareConfirmation({
      bookingId,
      passengerName,
      flightNumber: first.flightNumber,
      fromAirport: first.fromAirport,
      toAirport: first.toAirport,
      departureTime: first.departureTime,
      status: paymentStatus,
      totalAmount,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Reference: TRAQ-{bookingId}</Text>
        <Text style={styles.detail}>Passenger: {passengerName}</Text>
        <Text style={styles.detail}>Status: {paymentStatus}</Text>
        <Text style={styles.detail}>Total: {totalAmount}</Text>
        <TouchableOpacity style={styles.button} accessibilityRole="button" onPress={handleDownload}>
          <Text style={styles.buttonText}>Download Confirmation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
  content: { alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 12 },
  detail: { fontSize: 14, color: '#333', marginBottom: 6 },
  button: { marginTop: 20, backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

module.exports = BookingConfirmationScreen;
