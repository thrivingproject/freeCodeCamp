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
      ATOMIC_NUM=$($PSQL "SELECT atomic_number from elements WHERE atomic_number = $1")
      if [[ -z $ATOMIC_NUM ]]
      then
        DNE
      else
        DISPLAY_INFO $ATOMIC_NUM
      fi
    else
      # Check if symbol exists
      ATOMIC_NUM=$($PSQL "SELECT atomic_number from elements WHERE symbol = '$1'")
      if [[ -z $ATOMIC_NUM ]]
      then
        # check if element name exists
        ATOMIC_NUM=$($PSQL "SELECT atomic_number from elements WHERE name = '$1'")
        if [[ -z $ATOMIC_NUM ]]
        then
          DNE
        else
          DISPLAY_INFO $ATOMIC_NUM
        fi
      else
        DISPLAY_INFO $ATOMIC_NUM
      fi
    fi
  fi
}

DNE() {
  echo "I could not find that element in the database."
}

DISPLAY_INFO() {
  ELEMENT_INFO=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius
                        FROM elements
                        JOIN properties
                        USING(atomic_number)
                        JOIN types
                        USING(type_id)
                        WHERE atomic_number = $1")
  echo $ELEMENT_INFO | while read NUM BAR NAME BAR SYMBOL BAR TYPE BAR MASS BAR MELT BAR BOIL
  do
    echo "The element with atomic number $NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELT celsius and a boiling point of $BOIL celsius."
  done
}

MAIN $1
