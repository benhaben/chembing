from indigo import *
 
indigo = Indigo()
 
m1 = indigo.loadMolecule("CC(C)C=CCCCCC(=O)NCc1ccc(c(c1)OC)O")
m2 = indigo.loadMolecule("COC1=C(C=CC(=C1)C=O)O")
# Aromatize molecules because second molecule is not in aromatic form
m1.aromatize()
m2.aromatize()
 
# Calculate similarity between "similarity" fingerprints
print("Similarity fingerprints:");
fp1 = m1.fingerprint("sim");
fp2 = m2.fingerprint("sim");
 
print("  Tanimoto: %s" % (indigo.similarity(fp1, fp2, "tanimoto")));
print("  Tversky: %s" % (indigo.similarity(fp1, fp2, "tversky")));
 
# Calculate similarity between "substructure" fingerprints
print("Substructure fingerprints:");
fp1 = m1.fingerprint("sub");
fp2 = m2.fingerprint("sub");
 
print("  Tanimoto: %s" % (indigo.similarity(fp1, fp2, "tanimoto")));
print("  Tversky: %s" % (indigo.similarity(fp1, fp2, "tversky")));