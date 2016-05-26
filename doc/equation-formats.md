Function Builder - equation formats
=============

**Notes**

Square brackets [] will not be rendered, they are used to indicate a numerator.

The "PhET-specific" format was arrived at via consensus at design meetings. It doesn't correspond to an standard mathematical format. The intent is to create a clear association to the functions that are in the builder.

Cards always show the righthand side of the slope-intercept equation.

**Examples**

| Builder | PhET-specific | Slope-intercept |
| ------------- | ------------- | ------------- |
- 3 - 2	| y = x - 5 | y = x - 5 |
+ 1 - 2	| y = x - 1	| y = x - 1 |
+ 3 * 2	| y = 2(x + 3) | y = 2x + 6 |
* 2 + 3	| y = 2x + 3|  y = 2x + 3 |
* 0 * 2	| y = 0|  y = 0 |
/ 3 + 2 | y = x/3 + 2| y = 1/3 x + 2 |
+ 2 / 3 | y = [x + 2]/3 | y = 1/3 x + 2/3 |
/ 3 * 3 | y = x | y = x |
/ 3 * 0 | y = 0 | y = 0 |
/ 3 * 1 | y = [1x]/3 | y = 1/3 x |
/ 3 * 2 | y = [2x]/3 | y = 2/3 x |
/ 1 + 2 | y = x/1 + 2 | y = x + 2 |
* 0 / 3 | y = 0 | y = 0 |
* 1 / 3 | y = [1x]/3 | y = 1/3 x |
* 2 / 3 | y = [2x]/3 | y = 2/3 x |
- 3 * 2 + 1 | y = 2(x - 3) + 1 | y = 2x - 5 |
- 3 + 1 * 2 | y = 2(x - 2) | y = 2x - 4 |
* 0 * 2 + 1 | y = 1 | y = 1 |
* 0 + 1 * 2 | y = 2 | y = 2 |
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

Variations suggested by AP:

| Builder  | Unsimplified | Simplified |
| ------------- | ------------- | ------------- |
/ 1 * 2 + 1 | y = [2x]/1 + 1 | y = 2x + 1 |
/ 3 * 2 + 1 | y = [2x]/3 + 1 | y = 2/3 x + 1 |

**Rules**

Rules for generating unsimplified format:

(1) Adjacent addition and subtraction is collapsed, eg: + 3 - 2 → x + 1

(2) Adjacent multiplication is collapsed, eg: * 2 * 3 → 6x

(3) Multiplication by zero is collapsed to 0, eg: + 2 * 0 → 0

(4) Adjacent division is collapsed, eg: / 3 / 2 → x/6

(5) Adjacent multiplication and division is NOT collapsed, eg: * 2 / 3 → [2x]/3

(6) If the fragment preceding multiplication contains one or more operators, the fragment is wrapped in parentheses, eg: - 3 * 2 → 2(x-3)

(7) The fragment preceding division is treated as a numerator, eg: + 1 / 3 → [x + 1]/3

Exceptions to the above rules:

(8) Adjacent multiplication and division that evaluates to 1 is collapsed and hidden, eg: / 3 * 3 → x
