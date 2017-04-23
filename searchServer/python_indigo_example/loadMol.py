__author__ = 'yin'
from indigo import *
from indigo_renderer import *

indigo = Indigo()
indigoRenderer = IndigoRenderer(indigo)
m = indigo.loadMoleculeFromFile('structure-1.mol')

indigoRenderer.renderToFile(m, "result.svg")

print(m.canonicalSmiles())