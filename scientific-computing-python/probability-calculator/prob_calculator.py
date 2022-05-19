import copy
import random
# Consider using the modules imported above.

class Hat:
    def __init__(self, **colors):
        self.contents = list()
        for color in colors:
            for i in range(colors[color]):
                self.contents.append(color)
        # self.contents = [color for color in colors for i in range(colors[color])]
    
    def draw(self, number):
        if number > len(self.contents):
            return self.contents

        drawn = list()
        for i in range(number):
            color = random.choice(self.contents)
            self.contents.remove(color)
            drawn.append(color)
        return drawn


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    m = 0

    for i in range(num_experiments):
        
        hat_copy = copy.deepcopy(hat)
        hat_balls = dict()
        for i in hat_copy.draw(num_balls_drawn):
            if not i in hat_balls:
                hat_balls.setdefault(i, 0)
            hat_balls[i] += 1

        success = True
        for k in expected_balls:
            try:
                if expected_balls[k] > hat_balls[k]:
                    success = False
                    break
            except(KeyError):
                success = False
                break

        if success:
            m += 1

    probability = m / num_experiments
    return probability