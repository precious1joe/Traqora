const { Share } = require('react-native');

function generateConfirmationDocument(data) {
  if (!data || !data.bookingId || !data.passengerName) {
    throw new Error('Invalid booking data: bookingId and passengerName are required.');
  }
  return `TRAQORA BOOKING CONFIRMATION\nReference: TRAQ-${data.bookingId}\nPassenger: ${data.passengerName}\nFlight: ${data.flightNumber || 'N/A'} (${data.fromAirport || 'N/A'} -> ${data.toAirport || 'N/A'})\nDeparture: ${data.departureTime || 'N/A'}\nStatus: ${data.status || 'N/A'}\nTotal: ${data.totalAmount || 'N/A'}`;
}

async function downloadOrShareConfirmation(data) {
  try {
    const content = generateConfirmationDocument(data);
    await Share.share({
      message: content,
      title: `Booking Confirmation TRAQ-${data.bookingId}`,
    });
  } catch (error) {
    throw new Error(`Failed to download or share confirmation: ${error.message}`);
  }
}

module.exports = {
  generateConfirmationDocument,
  downloadOrShareConfirmation,
};
