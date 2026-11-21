use booking::{BookingContract, BookingContractClient};
use integration_tests::{generate_actors, initialize_token, new_env, register_contracts};
use soroban_sdk::{testutils::Address as _, Address, Env, Symbol};

#[test]
#[should_panic]
fn test_get_booking_requires_ownership_or_admin() {
    let env = new_env();
    let actors = generate_actors(&env);
    let contracts = register_contracts(&env);
    initialize_token(&env, &contracts.token, &actors.admin);

    let price = 100_0000000i128;
    let booking_id = contracts.booking.create_booking(
        &actors.passenger,
        &actors.airline,
        &Symbol::new(&env, "FL123"),
        &Symbol::new(&env, "JFK"),
        &Symbol::new(&env, "LAX"),
        &1704067200,
        &price,
        &contracts.token.address,
    );

    let unauthorized_user = Address::generate(&env);
    env.mock_auths(&[]);
    // Trying to view booking without auth of passenger or admin should fail
    let _ = contracts.booking.get_booking(&booking_id);
}
