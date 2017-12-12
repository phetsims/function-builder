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

Additional note from artist Cheryl McCutchan in [function-builder#115](https://github.com/phetsims/function-builder/issues/115#issuecomment-349383339):
> About half of the pngs export out of Illustrator not centered on the artboard. To get the pngs centered,
I had to take them into Photoshop and crop them. When I exported the pngs out of Illustrator at lower resolution
and then centered them in Photoshop, people thought the final images were too pixelated. So, I exported out of
Illustrator at a higher resolution and then centered the offending pngs in Photoshop.

Using higher resolution in Illustrator resulted in a dramatic increase in file size, as reported in [function-builder#115](https://github.com/phetsims/function-builder/issues/115).
Opening the PNG files in Photoshop and saving them using the default settings in "File > Save for Web" reduced the PNG files
to more reasonable sizes.
