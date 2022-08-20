#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

# get available services
SERVICES=$($PSQL "SELECT service_id, name FROM services")

# display available bikes
SERVICE_MENU () {
  # Display services
  echo -e "\nHere are the services we have available:"
  echo "$SERVICES" | while read S_ID BAR SERVICE
  do
    echo "$S_ID) $SERVICE"
  done
  # Get selection
  read SERVICE_ID_SELECTED
  # Ensure service exists
  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED")
  # If service does not exist
  if [[ -z $SERVICE_NAME ]]
  then
    SERVICE_MENU
  else
    echo "What's your phone number"
    read CUSTOMER_PHONE
    # Check if customer data exist
    CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
    # If number doesn't exist
    if [[ -z $CUSTOMER_NAME ]]
    then
      # Get customer name
      echo "What's you name?"
      read CUSTOMER_NAME
      # Insert customer name and number into db
      INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
      # Get new customer ID
      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
    fi
    # Get customer ID
    CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")
    # Get service time
    echo "What time?"
    read SERVICE_TIME
    # Record appointment
    INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(time, customer_id, service_id) values('$SERVICE_TIME', $CUSTOMER_ID, $SERVICE_ID_SELECTED)")
    echo "I have put you down for a $(echo $SERVICE_NAME | sed -r 's/^ *| *$//g') at $SERVICE_TIME, $(echo $CUSTOMER_NAME | sed -r 's/^ *| *$//g')."
  fi
}

SERVICE_MENU