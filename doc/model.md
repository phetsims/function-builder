# Function Builder - simulation model description

Compared to other PhET simulations, the model in Function Builder is relatively trivial.
A series of zero or more functions is constructed in a function "builder".
The input to the builder is a set of "cards". As you drag cards through the builder, the cards are
modified by functions to produce an output.
Intermediate results are visible through "windows" in the builder, that allow you to see what's happening
inside the builder.

In the "Patterns" screen, the cards are images. The functions are image transforms,
which modify the image in various ways (rotation, scaling, color mapping, etc.)

In the other screens ("Numbers", "Equations", "Mystery"), the cards are numbers. The input cards are integers.
The numeric functions are addition, subtraction, multiplication and division.  Division by zero is not supported,
and is specifically excluded by the simulation. The output cards are integers and mixed numbers
(integer with proper fraction).

The "Equations" screen adds the symbol "x" as an input card.  The same numeric functions are applicable to "x".
The output in this case is an equation in slope-intercept form (y = mx + b). An additional equation form is also
provided, as described in
(equation-formats.md)[https://github.com/phetsims/function-builder/blob/master/doc/equation-formats.md].

In all screens, the notion of non-invertible functions is supported. A function is not invertible if it's output
cannot be run backwards through the function to produce the original input. Examples: Multiplication by zero is a
non-invertible numeric function. Conversion to grayscale is a non-invertible image transform.

For invertible functions, the model in this simulation does not implement an explicit inverse of each invertible
function. Instead, all computation is performed in the forward direction, based on an input's location relative
to a function. And a card's location is constrained based on whether a function is invertible; cards cannot be
dragged backwards through non-invertible functions.
