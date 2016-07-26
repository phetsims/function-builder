Function Builder - equation formats
=============

**Notes**

This specification is referenced in the documentation of `HelpfulEquation`, `HelpfulEquationNode`,
`SlopeInterceptEquation` and `SlopeInterceptEquationNode`. To understand those types, you'll want to be familiar
with this specification.

The "helpful" format was arrived at via consensus at design meetings. It is PhET-specific, and does not correspond
to a standard mathematical format. The intent is to create a clear association with the functions that are in the
builder, and provide a "bridge" to the slope-intercept format.  The term "helpful" is (thankfully) never shown
to the sim user.

The "slope-intercept" format is the standard `y = mx + b` format, where `m = rise/run` and `b` is the y intercept.

Cards show the right-hand side of the slope-intercept equation. Eg, if the slope-intercept form is `y = 2x + 2`,
then the "x" card in the input carousel will show `2x + 2` in the output carousel.

Square brackets '[ ]' shown in the examples will not be rendered. They are used to indicate a numerator in
this specification. The forward slash '/' shown in the examples will be rendered as a horizontal line separating numerator and denominator. For example, `'[x + 3]/2'` is rendered as:

![renderedEquation]
(https://cloud.githubusercontent.com/assets/3046552/17148758/9daaa994-5325-11e6-9ccc-89f86e369d2a.png)

**Examples**

| Builder | Helpful | Slope-intercept |
| ------------- | ------------- | ------------- |
- 3 - 2	| y = x - 5 | y = x - 5 |
+ 1 - 2	| y = x - 1	| y = x - 1 |
+ 3 * 2	| y = 2(x + 3) | y = 2x + 6 |
* 2 + 3	| y = 2x + 3|  y = 2x + 3 |
* 0 * 2	| y = 0x |  y = 0 |
/ 3 + 2 | y = x/3 + 2| y = 1/3 x + 2 |
+ 2 / 3 | y = [x + 2]/3 | y = 1/3 x + 2/3 |
/ 3 * 3 | y = 3(x/3) | y = x |
/ -3 * 3 | y = 3(x/-3) | y = -x |
/ 3 * 0 | y = 0(x/3) | y = 0 |
/ 3 * 1 | y = 1(x/3) | y = 1/3 x |
/ 3 * 2 | y = 2(x/3) | y = 2/3 x |
/ 1 + 2 | y = x/1 + 2 | y = x + 2 |
* 0 / 3 | y = [0x]/3 | y = 0 |
* 1 / 3 | y = [1x]/3 | y = 1/3 x |
* 2 / 3 | y = [2x]/3 | y = 2/3 x |
- 3 * 2 + 1 | y = 2(x - 3) + 1 | y = 2x - 5 |
- 3 + 1 * 2 | y = 2(x - 2) | y = 2x - 4 |
* 0 * 2 + 1 | y = 0x + 1 | y = 1 |
* 0 + 1 * 2 | y = 2(0x + 1) | y = 2 |
* 1 * 2 + 1 | y = 2x + 1 | y = 2x + 1 |
* 1 + 1 * 2 | y = 2(1x + 1) | y = 2x + 2 |
* 3 * 2 + 1 | y = 6x + 1 | y = 6x + 1 |
* 3 + 1 * 2 | y = 2(3x + 1) | y = 6x + 2 |
/ 1 * 2 + 1 |  y = 2(x/1) + 1 | y = 2x + 1 |
/ 1 + 1 * 2 | y = 2(x/1 + 1) | y = 2x + 2 |
/ 3 * 2 + 1 | y = 2(x/3) + 1 | y = 2/3 x + 1 |
/ 3 + 1 * 2 | y = 2(x/3 + 1) | y = 2/3 x + 2 |
* 2 + 1 / 3 | y = [2x + 1]/3 | y = 2/3 x + 1/3 |
+ 1 * 2 / 3 | y = [2(x + 1)]/3 | y = 2/3 x + 2/3 |
/ 3 + 3 / 2 | y = [x/3 + 3]/2 | y = 1/6 x + 3/2 |

**Rules**

Rules for generating "helpful" format:

(1) Adjacent addition and subtraction operations are collapsed, e.g.: `+ 3 - 2 → x + 1`.  If they collapse to zero, then the operations are dropped entirely, e.g.: `* 2 + 3 - 3 → 2x`

(2) Adjacent multiplication operations are collapsed, e.g.: `* 2 * 3 → 6x`.

(3) Multiplication by 1 is shown, e.g.: `* 1 → 1x`, `+ 2 * 1 → 1(x + 2)`

(4) Multiplication by 0 is shown, e.g.: `* 0 → 0x`, `+ 2 * 0 → 0(x + 2)`

(5) If the portion of the equation preceding multiplication contains one or more operators, then it is wrapped in parentheses, e.g.: `- 3 * 2 → 2(x-3)`

(6) Adjacent division operations are collapsed, e.g.: `/ 3 / 2 → x/6`

(7) Division by 1 is shown, e.g.: `/ 1 → x/1`, `* 2 / 1 → [2x]/1`

(8) Division by 0 is not allowed.

(9) The portion of the equation preceding division is treated as a numerator, e.g.: `+ 1 / 3 → [x + 1]/3`




