PNG files for cards were created using assets/card-icons.ai. 

It is _essential_ that all of the PNG files have _even dimensions_,
so that functions exhibit symmetry where expected 
(see [function-builder#109](https://github.com/phetsims/function-builder/issues/109)) 
and to prevent anti-aliasing artifacts 
(see [function-builder-basics#18](https://github.com/phetsims/function-builder-basics/issues/18)).
If any PNG does not have even dimensions, running with assertions enabled (`?ea`) will cause an assertion failure.

A note from artist Cheryl McCutchan about exporting PNG files:
> Note that some of the objects are not perfectly aligned on the artboards (Illustrator just won't align some images) 
so that when the pngs are exported there is a little more space on one side than the other. 
You can simply export some art from Illustrator and have a perfect symmetrical png. The solution is to pull them 
into Photoshop and crop then until they're symmetrical.