import moment from 'moment';

export function prettyDate(dateString) {
  return moment
    .parseZone(dateString, 'ddd MMM DD YYYY HH:mm:ss ZZ')
    .local()
    .fromNow();
}

export function wordCount(string) {
  return string ?
    (string.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length :
    0;
}

export function charCount(string) {
  return string ?
    string.replace(/\s/g, '').length :
    0;
}
