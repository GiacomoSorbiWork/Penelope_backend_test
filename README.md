# Take home backend engineer assignment

Congratulations! You are here because we think you might be a good fit to join our team here at Penelope.
Our bread and butter at Penelope is financial accounting, essentially keeping detailed track of
money and assets movement. At the heart of our accounting module is the ledger that records a
detailed history of all the transactions that occur within our company and our clients investment
plans.
For the purpose of this assignment we want to design and implement a simple ledger that is
able to record the transactions of one or several bank accounts.

## Goals

- The solution should allow us to create bank accounts and add transactions to an
  account that’s subsequently recorded on the ledger.
- There’s two types of interactions with the bank account: Withdrawals, where we remove
  money from an account and transfers where we move money from one account to the
  other.
- We need to be able to tell the current balance of any account, where the balance is
  defined by the total amount of dollars that are currently in the account.

## Requirements

- A bank account that records its transactions on the ledger is responsible for recording its
  (immutable) list of historical transactions.
- Bank accounts are exclusively able to hold dollars.
- Recorded transactions always have both a timestamp and a dollar amount (either
  negative or positive, i.e. negative when cash has been taken out and positive when a
  deposit has been made)
- Any newly created and recorded transaction is always appended to the end of the list of
  transactions on the ledger, it is not allowed to “rewrite history” and insert a transaction
  anywhere else.
- Bank accounts should have a status, either "active" (by default) or "blocked". Any
  blocked account is not able to process any type of transaction.

## Notes about the implementation

- The maximum time spent on this assignment is 2 hours. Note: The time starts when you
  open this file we’ve sent you for the first time so make sure you’re ready to start when
  you open the file!
- The solution should preferably be implemented in Python 3, but pick any (scripting)
  language you’re most comfortable with given there’s a time constraint. There’s no
  requirement regarding code style (i.e. OOP, functional), feel free to use whatever feels
  appropriate.
- Any persistence to, for example, storing data to a database is not expected to be part of
  your solution. Also: No need for a (HTTP) API layer!
- Tests are expected.
- Feel free to be creative - these are flexible guidelines and we're open to seeing any type
  of solutions that implement the task at hand.
- Don’t worry: Any unfinished solution is still relevant, the primary goal is not to finish all
  the implementation details but to showcase a good understanding of the programming
  language and the problem at hand. Feel free to add any comments, questions and
  suggestions in a README.md file or in the code itself.

## Hand in

- Create a public github repository and email the link to eelke@penelope.co within 2 hours
  after opening this file. Alternatively: Create a zip file of files and send these to
  eelke@penelope.co

#### Good luck!
