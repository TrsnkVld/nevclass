import Vue from 'vue';

const filters = {
  nf(number, decimals = 0, decPoint = ',', thousandsSep = ' ') {
    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: number_format('1.20', 2);
    // *    returns 10: '1.20'
    // *    example 11: number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: number_format('1.2000', 3);
    // *    returns 12: '1.200'
    // *    example 13: number_format('1 000,50', 2, '.', ' ');
    // *    returns 13: '100 050.00'
    // Strip all characters but numerical ones.
    const replaceNumber = `${number}`.replace(/[^0-9+\-Ee.]/g, '');
    const n = !Number.isFinite(+replaceNumber) ? 0 : +replaceNumber;
    const prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
    const dec = typeof decPoint === 'undefined' ? '.' : decPoint;
    const toFixedFix = (num, precision) => {
      const k = 10 ** precision;
      return `${Math.round((num * k) / k)}`;
    };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    const s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  },

  price(number, decimals = 0) {
    return filters.nf(number, decimals);
  },

  phone(str) {
    return str.replace(/\+7(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4');
  },
};

export default () => {
  Object.keys(filters).forEach((filterName) => {
    Vue.filter(filterName, filters[filterName]);
  });
};
