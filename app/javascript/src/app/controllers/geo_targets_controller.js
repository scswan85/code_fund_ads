import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['tree'];

  connect() {
    let tree = {};

    this.treeTarget.querySelectorAll('.geo-targets-subregion').forEach(subregion => {
      subregion.querySelectorAll('.geo-targets-country').forEach(country => {
        const provinces = country.querySelectorAll('.geo-targets-province')
        if (provinces.length > 0) {
          let branch = {}
          provinces.forEach(province => {
            branch[province.dataset.isoCode] = false;
          });
          tree[country.dataset.isoCode] = branch;
        } else {
          tree[country.dataset.isoCode] = false
        }
      });
    });

    this.treeTarget.dataset.selectedTargets = JSON.stringify(tree);
  }
}
