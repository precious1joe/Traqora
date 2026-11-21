#[cfg(test)]
use super::*;
#[cfg(test)]
use soroban_sdk::{Address, Env, Symbol};

#[test]
fn test_get_booking_ownership_checks() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(BookingContract, ());
    let client = BookingContractClient::new(&env, &contract_id);

    let passenger = Address::generate(&env);
    let airline = Address::generate(&env);
    let other_user = Address::generate(&env);
    let token_address = Address::generate(&env);

    let booking_id = client.create_booking(
        &passenger,
        &airline,
        &Symbol::new(&env, "AB123"),
        &Symbol::new(&env, "JFK"),
        &Symbol::new(&env, "LAX"),
        &1000000,
        &100,
        &token_address,
    );

    // Passenger can view
    let booking_pass = client.get_booking(&booking_id, &passenger);
    assert!(booking_pass.is_some());
    assert_eq!(booking_pass.unwrap().booking_id, booking_id);

    // Airline can view
    let booking_airline = client.get_booking(&booking_id, &airline);
    assert!(booking_airline.is_some());

    // Unauthorized user panics
    let result = std::panic::catch_unwind(std::panic::AssertUnwindSafe(|| {
        client.get_booking(&booking_id, &other_user);
    }));
    assert!(result.is_err());
}
