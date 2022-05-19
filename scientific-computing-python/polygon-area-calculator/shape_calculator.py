from math import sqrt


class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __str__(self):
        return f'Rectangle(width={self.width}, height={self.height})'

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.height * self.width

    def get_perimeter(self):
        return 2 * self.height + 2 * self.width

    def get_diagonal(self):
        return sqrt(self.width ** 2 + self.height ** 2)

    def get_picture(self):
        picture = ""
        for i in range(self.height):
            picture += "*" * self.width + "\n"
        if self.height > 50 or self.width > 50:
            return "Too big for picture."
        return picture

    def get_amount_inside(self, shape):
        shape_area = shape.height * shape.width
        return int(self.get_area() / shape_area)


class Square(Rectangle):
    def __init__(self, side):
        Rectangle.__init__(self, height=side, width=side)

    def __str__(self):
        return f'Square(side={self.width})'

    def set_side(self, side):
        self.height = self.width = side
