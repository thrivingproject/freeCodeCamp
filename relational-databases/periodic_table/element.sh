#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=periodic_table --tuples-only -c"

MAIN() {
  # Check if argument provided
  if [[ -z $1 ]]
  then
    echo "Please provide an element as an argument."
  else
    # Check if arg is number
    if [[ $1 =~ ^[0-9]+$ ]]
    then
      # Check if atomic number exists
      ATOMIC_NUM_RESULT=$($PSQL "SELECT * from elements WHERE atomic_number = $1")
      if [[ -z $ATOMIC_NUM_RESULT ]]
      then
        DNE
      else
        DISPLAY_INFO
      fi
    else
      # Check if symbol exists
      SYMBOL_RESULT=$($PSQL "SELECT * from elements WHERE symbol = '$1'")
      if [[ -z $SYMBOL_RESULT ]]
      then
        # check if element name exists
        NAME_RESULT=$($PSQL "SELECT * from elements WHERE name = '$1'")
        if [[ -z $NAME_RESULT ]]
        then
          DNE
        else
          DISPLAY_INFO
        fi
      else
        DISPLAY_INFO
      fi
    fi
  fi
}

DNE() {
  echo "I could not find that element in the database."
}

DISPLAY_INFO() {
  echo "element exists"
}

MAIN $1
