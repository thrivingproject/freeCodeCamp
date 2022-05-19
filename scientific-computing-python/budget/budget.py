from itertools import zip_longest


class Category:

    def __init__(self, name):
        self.name = name
        self.ledger = list()

    def __str__(self):
        title = str(self.name).center(30, "*") + "\n"
        txns = ""
        for i in self.ledger:
            txn = i["description"][:23]
            amount = '{:.2f}'.format(i["amount"]).rjust(30 - len(txn)) + "\n"
            txns += txn + amount
        total = "Total: " + '{:.2f}'.format(self.get_balance())
        return title + txns + total

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -amount, "description": description})
            return True
        return False

    def get_balance(self):
        balance = 0
        for i in self.ledger:
            balance += i["amount"]
        return balance

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        if amount <= self.get_balance():
            return True
        return False


def create_spend_chart(categories):
    # Calculate total spent by iterating through each category's ledger amounts
    category_totals = list()
    for category in categories:
        category_spent = 0
        for entry in category.ledger:
            if entry["amount"] < 0:
                category_spent += entry["amount"]
        category_totals.append(category_spent)
    total_spent = sum(category_totals)

    percentages = [cat_total / total_spent for cat_total in category_totals]

    # Chart
    chart = "Percentage spent by category\n"
    for i in range(100, -1, -10):
        chart += str(i).rjust(3) + '|'
        for percentage in percentages:
            if percentage * 100 >= i:
                chart += " o "
            else:
                chart += "   "
        chart += " \n"

    category_names = list()
    for category in categories:
        category_names.append(category.name)

    # X-axis and labels
    chart += "    " + "-" * (len(categories) * 3 + 1)
    tuples = list()
    for category in zip_longest(*category_names, fillvalue=" "):
        tuples.append(category)

    for t in tuples:
        chart += "\n    "
        for letter in t:
            chart += f' {letter} '
        chart += " "

    return chart
