#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

USER() {
  # Prompt user for username
  echo "Enter your username:"
  # Get username input
  read USERNAME
  # Check if username in db
  USERNAME_RESULT=$($PSQL "SELECT username FROM users WHERE username = '$USERNAME'")
  # If user dne
  if [[ -z $USERNAME_RESULT ]]
  then
    # Add user to db
    INSERT_USER_RESULT=$($PSQL "INSERT INTO users(username, games_played, best_game) VALUES('$USERNAME', 0, 0)")
    # Give welcome message
    echo "Welcome, $USERNAME! It looks like this is your first time here."
  else
    # Get user's stats
    GAMES_PLAYED=$($PSQL "SELECT games_played FROM users WHERE username = '$USERNAME'")
    BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE username = '$USERNAME'")
    # Give user stats
    echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  fi

  # Get games played
  NEW_GAMES_PLAYED=$($PSQL "SELECT games_played + 1 FROM users WHERE username = '$USERNAME'")
  # Increment user's record games played
  UPDATE_GAMES_PLAYED=$($PSQL "UPDATE users SET games_played = $NEW_GAMES_PLAYED WHERE username = '$USERNAME'")
}

GAME() {
  # Generate random number between 1 and 1000
  SLN=$((1 + $RANDOM % 1000))
  # echo $SLN
  # Initialize attempts counter
  ATTEMPTS=1
  echo "Guess the secret number between 1 and 1000:"
  # Read guess input
  read GUESS

  # While user guess does not equal solution
  while [ $GUESS != $SLN ]
  do
    # While guess is not integer
    if [[ ! $GUESS =~ ^[0-9]+$ ]]
    then
      ((ATTEMPTS++))
      echo "That is not an integer, guess again:"
      read GUESS
      continue
    fi
    # If solution is lower
    if (( $SLN < $GUESS ))
    then
      # Print lower message
      echo "It's lower than that, guess again:"
    else
      # Pring higher message
      echo "It's higher than that, guess again:"
    fi
    # Get new guess
    read GUESS
    # Increment attempts counter
    ((ATTEMPTS++))
  done

  # Recite number of attempts and solution. Nice job!
  echo "You guessed it in $ATTEMPTS tries. The secret number was $SLN. Nice job!"

}

UPDATE() {
  # Get user's best game
  BEST_RESULT=$($PSQL "SELECT best_game FROM users WHERE username = '$USERNAME'")
  # If best game is greater than attempts
  if [[ $BEST_RESULT == 0 ]] || [[ $BEST_RESULT > $ATTEMPTS ]]
  then
    UPDATE_BEST_RESULT=$($PSQL "UPDATE users SET best_game = $ATTEMPTS WHERE username = '$USERNAME'")
  fi
}

MAIN() {
  USER
  GAME
  UPDATE
}

MAIN