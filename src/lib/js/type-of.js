
export default typeOf = (obj) => {
  const typeList = {
    '[object Array]': 'array',
    '[object Error]': 'error',
    '[object Object]': 'object',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Number]': 'number',
    '[object RegExp]': 'regexp',
    '[object Date]': 'date',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object Boolean]': 'boolean'
  };
  if (obj == null) {
    return String(obj);
  }
  return typeof obj === 'object' || typeof obj === 'function' ?
    typeList[typeList.toString.call(obj)] || 'object' :
    typeof obj;
};
