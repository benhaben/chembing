#include "base_cpp/scanner.h"
#include "molecule/molecule.h"
#include "molecule/sdf_loader.h"
#include "molecule/molfile_loader.h"
#include "molecule/molecule_arom.h"
#include "molecule/molecule_fingerprint.h"
#include "molecule/smiles_loader.h"
#include "molecule/molecule_substructure_matcher.h"
#include "base_c/bitarray.h"
 
int main (void)
{
   MoleculeFingerprintParameters parameters;
 
   memset(&parameters, 0, sizeof(parameters));
   parameters.ord_qwords = 25; // default value in Bingo
 
   int fpsize = parameters.fingerprintSize();
 
   Molecule query;
   Array<byte> queryfp;
 
   {
      BufferScanner scanner("C1C=C(NC=O)C=CC=1");
      SmilesLoader loader(scanner);
 
      loader.loadMolecule(query, true);
      QueryMoleculeAromatizer::aromatizeBonds(query);
      query.findBondsInRings();
 
      MoleculeFingerprintBuilder builder(query, parameters);
 
      builder.process();
 
      queryfp.copy(builder.get(), fpsize);
   }
 
   int total = 0;
   int passed = 0;
   int matched = 0;
 
   try
   {
      FileScanner scanner("benzodiazepine.sdf.gz");
      SdfLoader loader(scanner);
 
      int cnt = 0;
 
      while (!loader.isEOF())
      {
         loader.readNext();
         Molecule mol;
         BufferScanner molscan(loader.data);
 
         try
         {
            MolfileLoader molload(molscan);
            molload.loadMolecule(mol, false);
            mol.calcImplicitHydrogens(true);
         }
         catch (Exception &e)
         {
            continue;
         }
 
         mol.findBondsInRings();
         MoleculeAromatizer::aromatizeBonds(mol);
 
         MoleculeFingerprintBuilder builder(mol, parameters);
         builder.process();
 
         total++;
 
         if (bitTestOnes(queryfp.ptr(), builder.get(), fpsize))
         {
            passed++;
 
            MoleculeSubstructureMatcher matcher(mol);
 
            matcher.setQuery(query);
 
            if (matcher.find())
               matched++;
         }
      }
   }
   catch (Exception &e)
   {
      fprintf(stderr, "error: %s\n", e.message());
      return -1;
   }
 
   printf("%d total\n%d matched\n%d false positives\n", total, matched, passed - matched);
   return 0;
}
