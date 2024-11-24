import math
from pyscript import document
document.body.append("Before importing... ")
from canvas import HTMLDOMCanvas
from emicText import EmicText
from glyphDictionary import SingleSVGGlyphDictionary
from relLine import RelLine

board = document.querySelector("#svgboard")
canvas = HTMLDOMCanvas(board)
text = EmicText()

dictionary = SingleSVGGlyphDictionary('unlws_glyphs/glyphs.svg')

firstsg = dictionary.glyph_by_id("I")
firstsg.x = -2.
firstsg.y = 0.
firstsg.angle = -math.pi/2
text.add_glyph(firstsg)

cat = dictionary.glyph_by_id("cat")
cat.x = 2.
cat.y = 0.
cat.angle = math.pi
text.add_glyph(cat)

text.add_rel(RelLine(firstsg.bp("X"), cat.bp("X")))

canvas.render(text)
