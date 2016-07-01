# Function Builder - simulation model description

Compared to other PhET simulations, the model in Function Builder is relatively trivial.
A series of zero or more functions is constructed in a function "builder".
The input to the builder is a set of "cards" that have something on them (call it the card's "content").
As you drag a card through the builder, the card's content is modified by functions.
Intermediate results are visible through "windows" in the builder, that allow you to see what's happening
inside the builder.  The absence of a function is equivalent to the identity function.

In the "Patterns" screen, each card's content is an image. The functions are image transforms,
which modify the image in various ways (rotation, scaling, color mapping, etc.)

In the other screens ("Numbers", "Equations", "Mystery"), each card's content is a number. The input cards display
integers. The numeric functions are addition, subtraction, multiplication and division.  Division by zero is not
supported, and is specifically excluded by the simulation. The output cards display integers or mixed numbers
(integer with proper fraction).

The "Equations" screen adds the symbol "x" on an input card.  The same numeric functions are applicable to "x".
The output in this case is an equation in
[slope-intercept form](https://en.wikipedia.org/wiki/Linear_equation#Slope.E2.80.93intercept_form)
(y = mx + b). An additional equation format is also provided, as described in
[equation-formats.md](https://github.com/phetsims/function-builder/blob/master/doc/equation-formats.md).

In all screens, the notion of non-invertible functions is supported. A function is not invertible if it's output
cannot be run backwards through the function to produce the original input. Examples: Multiplication by zero is a
non-invertible numeric function. Conversion to grayscale is a non-invertible image transform.

For invertible functions, the model in this simulation does not implement an explicit inverse of each invertible
function. Instead, all computation is performed in the forward direction, based on an input's location relative
to a function. And a card's location is constrained based on whether a function is invertible; cards cannot be
dragged backwards through non-invertible functions.
