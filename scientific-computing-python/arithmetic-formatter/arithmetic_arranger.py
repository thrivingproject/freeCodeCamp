def arithmetic_arranger(problems, solution=False):
    # Check for number of problems
    if len(problems) > 5:
        error = "Error: Too many problems."
        return error
    # Iterate through strings and build arranged problems
    else:
        line1 = ""
        line2 = ""
        line3 = ""
        line4 = ""
        for problem in problems:
            # Split strings into problem components
            components = problem.split()
            # Check for operators other than addition and subtraction
            if components[1] != '+' and components[1] != "-":
                error = "Error: Operator must be '+' or '-'."
                return error
            # Check for characters other than digits in operands
            elif not components[0].isdigit() or not components[2].isdigit():
                error = "Error: Numbers must only contain digits."
                return error
            # Check for length of operands
            elif len(components[0]) > 4 or len(components[2]) > 4:
                error = "Error: Numbers cannot be more than four digits."
                return error
            # Convert the string operands to integers
            op_1 = int(components[0])
            op_2 = int(components[2])
            if components[1] == '+':
                sum = str(op_1 + op_2)
            else:
                sum = str(op_1 - op_2)
            # Length of longest operand and equation line
            width = max(len(components[0]), len(components[2]))
            # Print spaces for first operand
            for i in range(width-len(components[0]) + 2):
                line1 += " "
            line1 += f'{components[0]}    '
            # Print operator (sign)
            line2 += components[1]
            # Print spaces for second operand
            for i in range(width-len(components[2]) + 1):
                line2 += " "
            line2 += f'{components[2]}    '
            # Print equation line
            for i in range(width + 2):
                line3 += "-"
            line3 += "    "
            # Print equation solution
            for i in range(width-len(sum) + 2):
                line4 += " "
            line4 += f'{sum}    '
        arranged_problems = f'{line1.rstrip()}\n{line2.rstrip()}\n'\
            f'{line3.rstrip()}'
        if solution:
            arranged_problems += f'\n{line4.rstrip()}'

    # Return the results
    return arranged_problems