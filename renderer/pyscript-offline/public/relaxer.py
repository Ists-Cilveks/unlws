import numpy, svgpathtools
from bindingPoint import BindingPoint
from glyph import Glyph
from relLine import RelLine

# Apparatus for computing derivatives for gradient descent.

class DifferentialBindingPoint(BindingPoint):
  "An instance of a binding point with derivatives of position."

  # For now with fewer arguments because we'll probably never create
  def __init__(self, x = 0., y = 0., handlex = 0., handley = 0.):
    super().__init__(x=x, y=y, handlex=handlex, handley=handley)
    self.dx = 0.
    self.dy = 0.
    self.handledx = 0.
    self.handledy = 0.

  @property
  def dz(self):
    "Differential of position of this BP as a complex number."
    return self.dx+self.dy*(0+1j)

  @property
  def handledz(self):
    "Differential of position of this BP's spline handle as a complex number."
    return self.handledx+self.handledy*(0+1j)

  def translate(self, delta_x, delta_y):
    p = super().translate(delta_x, delta_y)
    diff_p = DifferentialBindingPoint(p.x, p.y, p.handlex, p.handley)
    diff_p.dx += delta_x
    diff_p.dy += delta_y
    diff_p.handledx += delta_x
    diff_p.handledy += delta_y
    return diff_p

  def rotate(self, delta_angle):
    c, s = math.cos(delta_angle), math.sin(delta_angle)
    p = super().rotate(delta_angle)
    diff_p = DifferentialBindingPoint(p.x, p.y, p.handlex, p.handley)
    diff_p.dx = c*self.dx - s*self.dy
    diff_p.dy = s*self.dx + c*self.dy
    diff_p.handledx = c*self.handledx - s*self.handledy
    diff_p.handledy = s*self.handledx + c*self.handledy
    return diff_p

class DifferentialGlyph(Glyph):
  "An instance of a glyph with derivatives of position and rotation."

  def __init__(self, lemma_svg = None):
    """Initialise this glyph."""
    super().__init__(lemma_svg)
    # Derivatives of our position and angle statistics.
    self.dx = 0.
    self.dy = 0.
    self.dangle = 0.
  
  @classmethod
  def from_glyph(self, g):
    "Return glyph g upgraded to a DifferentialGlyph."
    dg = DifferentialGlyph(g.lemma_svg)
    dg.x = g.x
    dg.y = g.y
    dg.angle = g.angle
    dg.lemma_bps = g.lemma_bps
    return dg
  
  @property
  def dangle_in_degrees(self):
    "Differential of rotation of this glyph in degrees."
    return self.dangle*180./math.pi
  
  @property
  def dz(self):
    "Differential of translation of this glyph as a complex number."
    return self.dx+self.dy*(0+1j)
  
  def bp(self, name):
    "Return the differential BP `name`, with transformation applied."
    q = self.lemma_bps[name].rotate(self.angle)
    p = q.translate(self.x, self.y)
    diff_p = DifferentialBindingPoint(p.x, p.y, p.handlex, p.handley)
    diff_p.dx = self.dx - self.dangle * q.y
    diff_p.dy = self.dy + self.dangle * q.x
    diff_p.handledx = self.dx - self.dangle * q.handley
    diff_p.handledy = self.dy + self.dangle * q.handlex
    return diff_p

def dpoly(rel):
  """Return the numpy.poly1d of the first-order derivative 
  in the gradient-descent variable of the parametrised curve."""
  bezier = svgpathtools.CubicBezier(rel.bp0.dz, rel.bp0.handledz, rel.bp1.handledz, rel.bp1.dz)
  return bezier.poly()

# The particular penalties below are not necessarily the ones we'll want to
# go with in the end.

def velocity_penalty(rel):
  "Penalty score for this rel not going at constant velocity."
  bezier = rel.svgpathtools_bezier()
  dd = bezier.poly().deriv().deriv()
  ddx = [float(dd[i].real) for i in range(0,2)]
  ddy = [float(dd[i].imag) for i in range(0,2)]
  # This is the integral of ddx(t)^2 + ddy(t)^2 for t from 0 to 1.
  return (ddx[1]*ddx[1]+ddy[1]*ddy[1])/3 +\
    ddx[0]*ddx[1]+ddy[0]*ddy[1] +\
    ddx[0]*ddx[0]+ddy[0]*ddy[0]

def deriv_velocity_penalty(rel):
  """Derivative of penalty score for this rel not going at constant velocity.
  
  The glyphs which rel is attached to should be DifferentialGlyph objects."""
  bezier = rel.svgpathtools_bezier()
  dd = bezier.poly().deriv().deriv()
  ddx = [float(dd[i].real) for i in range(0,2)]
  ddy = [float(dd[i].imag) for i in range(0,2)]
  du_dd = dpoly(rel).deriv().deriv()
  du_ddx = [float(du_dd[i].real) for i in range(0,2)]
  du_ddy = [float(du_dd[i].imag) for i in range(0,2)]
  # This is the integral of d/du of ddx(t)^2 + ddy(t)^2 for t from 0 to 1,
  # where u is the gradient descent variable.
  return 2*(ddx[1]*du_ddx[1]+ddy[1]*du_ddy[1])/3 +\
    ddx[0]*du_ddx[1]+ddy[0]*du_ddy[1] +\
    du_ddx[0]*ddx[1]+du_ddy[0]*ddy[1] +\
    2*(ddx[0]*du_ddx[0]+ddy[0]*du_ddy[0])
