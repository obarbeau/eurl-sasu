import Tranche from "./tranche";

export default class ImpotRevenu {
  tranches: Tranche[] = [];
  revenu: number;
  nbParts: number;

  //Source : https://www.impots.gouv.fr/portail/particulier/calcul-de-limpot-sur-le-revenu
  // OBA: https://www.service-public.fr/particuliers/vosdroits/F1419
  // OBA: Barème progressif applicable aux revenus de 2020
  constructor() {
    this.tranches = [
      new Tranche(0, 10084, 0),
      new Tranche(10085, 25710, 0.11),
      new Tranche(25711, 73516, 0.3),
      new Tranche(73517, 158122, 0.41),
      new Tranche(158123, null, 0.45),
    ];
  }

  getImpot(): number {
    let total = 0;
    this.tranches.forEach(tranche => {
      total += tranche.getImpot(this.revenu / this.nbParts);
    });
    return total * this.nbParts;
  }

  getTranches() {
    let baseIR = this.revenu;
    let total = 0;
    let tranches = [];
    this.tranches.forEach(tranche => {
      tranches.push({
        value: tranche.getImpot(this.revenu / this.nbParts) * this.nbParts,
        min: tranche.getMin(),
        max: tranche.getMax(),
        taux: tranche.getTaux()
      });
    });
    return tranches;
  }
}
