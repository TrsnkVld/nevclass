import md5Func from "js-md5";

/**
 * Same as PHP number_format()
 * @param {string | number} number
 * @param {number} decimals
 * @param {string} dec_point
 * @param {string} thousands_sep
 * @returns {string}
 */
export function nf(number, decimals = 0, dec_point = ',', thousands_sep = ' ') {
	number = ((number + '')).replace(/[^0-9+\-Ee.]/g, '');
	const n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		toFixedFix = function (n, prec) {
			const k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	let s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
};

/**
 * Same as nf for currency formatting.
 * Appends ₽ (rouble sign) to output.
 * @param number
 * @param decimals
 * @param dec_point
 * @param thousands_sep
 * @returns {string}
 */
export function cf(number, decimals = 0, dec_point = ',', thousands_sep = ' ') {
	return nf(number, decimals, dec_point, thousands_sep)+" ₽";
}

/**
 * The famous PlayNext string-end routine.
 * @param {number} count
 * @param {string} one
 * @param {string} two
 * @param {string} many
 * @returns {string}
 */
export function end(count, one, two, many) {
	let n = (count + '');
	let e = parseInt(n.substring(n.length, n.length - 1));
	let e2 = parseInt(n.substring(n.length, n.length - 2));
	//console.log(n+":"+n.substring(n.length,n.length-1)+":"+n.substring(n.length,n.length-2));
	if (e >= 2 && e <= 4 && !(e2 >= 11 && e2 <= 19)) return two;
	else if (e === 1 && !(e2 >= 11 && e2 <= 19)) return one;
	return many;
};

/**
 * Returns md5 hash of a payload (can be any type).
 * @param {*} payload
 * @returns {string}
 */
export function md5(payload) {
	if ( payload === null || payload === undefined ) return '';
	if ( typeof payload === "object" ) {
		let values = [];
		for ( let key in payload ) {
			if ( payload.hasOwnProperty(key) ) {
				values.push(key + ":" + md5(payload[key]));
				//console.log(key+": "+ md5(payload[key]))
			}
		}
		return md5Func(values.join(":"));
	}
	else if ( Array.isArray(payload) ) {
		let values = [];
		for (let item of payload) {
			values.push(md5(item));
		}
		return md5Func(values.join(":"));
	}
	else return md5Func(payload.toString());
	//else return md5Func(payload);
};

/**
 * Returns "H часов n минут" from H,m.
 * m is treated as tenth and converted to minutes.
 * So:
 * 1,5 = 1 час 30 минут
 * 1,3 = 1 час 18 минут
 * @param time
 * @returns {string}
 */
export function hm(time) {
		if ( !time ) return "";
		let hm = time.toString().split(/[.,]/);
		let hours = Math.floor(parseInt(hm[0]));
		let minutes = parseInt(hm[1]);
		let str = hours+" "+end(hours, "час", "часа", "часов");
		if ( minutes ) {
			minutes *= 60/10;
			str += " "+minutes + " "+end(minutes, "минута", "минуты", "минут");
		}
		return str;
}