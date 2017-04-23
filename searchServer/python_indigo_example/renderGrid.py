import indigo
import indigo_renderer
indigo = indigo.Indigo()
renderer = indigo_renderer.IndigoRenderer(indigo)
 
query = indigo.loadSmarts("[#7]1~[#6]~[#6]~[#7]~[#6]~[#6]2~[#6]~[#6]~[#6]~[#6]~[#6]~1~2");
xyz = []
collection = indigo.createArray()
refatoms = []
 
for structure in indigo.iterateSDFile("python_indigo_example/19k.sdf"):
  structure.foldHydrogens()
  match = indigo.substructureMatcher(structure).match(query)
  # if structure.index() == 0:
  #   for atom in query.iterateAtoms():
  #     xyz.extend(match.mapAtom(atom).xyz())
  # else:
  #   atoms = [match.mapAtom(atom).index() for atom in query.iterateAtoms()]
  #   structure.alignAtoms(atoms, xyz);
 
  # refatoms.append(match.mapAtom(query.getAtom(0)).index())
  collection.arrayAdd(structure)
 
  if structure.index() == 15:
    break;
 
indigo.setOption("render-output-format", "png");
indigo.setOption("render-image-size", "400, 400");
indigo.setOption("render-grid-title-property", "PUBCHEM_COMPOUND_CID");
indigo.setOption("render-grid-title-font-size", "10");
indigo.setOption("render-grid-title-offset", "2");
indigo.setOption("render-coloring", "true");
indigo.setOption("render-coloring", "true");
indigo.setOption("render-background-color", 1.0, 1.0, 1.0);
renderer.renderGridToFile(collection, refatoms, 4, "indigo_grid_white.png")