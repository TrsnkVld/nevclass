/**
 * Возвращает массив с русскими названиями месяцев.
 * @returns {string[]}
 */
export function months() {
    return [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];
}

/**
 * Возвращает месяц по индексу (zero-based).
 * @param index
 * @returns {*}
 */
export function monthNameByIndex(index) {
    if ( index >= 0 && index <= 11 ) return months()[index];
    return null;
}

/**
 * Возвращает индекс (zero-based) месяца.
 * Пофиг на регистр.
 * @param name
 * @returns {number}
 */
export function monthIndexByName(name) {
    return months().findIndex(el=>el.toUpperCase()===name.toUpperCase());
}

/**
 * Получает массив с названиями месяцев и возвращает их в отсортированном порядке.
 * Пофиг на регистр.
 * @param months
 * @returns {*}
 */
export function monthsSorted(months) {
    if ( !Array.isArray(months) ) return months;
    return months.sort((a,b)=>{
        let ai = monthIndexByName(a);
        let bi = monthIndexByName(b);
        if ( ai > bi ) return 1;
        if ( ai < bi ) return -1;
        return 0;
    });
}