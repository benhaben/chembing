__author__ = 'yin'
from indigo_renderer import *

indigo = Indigo()

indigo.setOption('treat-x-as-pseudoatom', True)
indigo.setOption("ignore-stereochemistry-errors", True)

arr = indigo.createArray()
indigoRenderer = IndigoRenderer(indigo)
mol = indigo.loadMoleculeFromFile('structure-1.mol')

for item in indigo.iterateSDFile("19k.sdf"):
    match = indigo.exactMatch(item, mol, "NONE")
    if match:
        print("match!!!")
        for prop in item.iterateProperties():
            print prop.name(), ":", prop.rawData().decode('gb2312')
            arr.arrayAdd(item)
    else:
        print("not match!!!")

indigoRenderer.renderGridToFile(arr, None, 1, "structures.png")

