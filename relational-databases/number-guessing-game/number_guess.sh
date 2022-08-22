#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=numbers -t --no-align -c"

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

# Increment user's record games played


# Generate random number between 1 and 1000
# Guess the secret number between 1 and 1000:
# Initialize attempts counter
# Read guess input
# While user guess does not equal solution
  # Increment attempts counter
  # While guess is not integer
    # That is not an integer, guess again:
    # Read guess input
  # If solution is lower
    # Print lower message
  # Else
    # Pring higher message
  # Get new guess
# Recite number of attempts and solution. Nice job!

# Get user's best game
# If best game is greater than attempts
  # Update user's record best game
