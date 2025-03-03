export function generateGetQueryParams(object) {
    return Object.entries(object)
        .map(v => {
            if (v[1]) {
                return `${ v[0] }=${ v[1] }`;
            }
            else {
                return false;
            }
        })
        .filter(v => v !== false)
        .join('&');
}

export default {
    generateGetQueryParams: generateGetQueryParams,
};
