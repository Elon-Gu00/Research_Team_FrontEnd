export const checkNullValue = (val) => {
  const dataType = queryDataType(val);

  switch (dataType) {
    case 'String':
    case 'Array':
      return val.length <= 0;
    case 'Object':
      return Object.keys(val).length <= 0;
    case 'Null':
    case 'Undefined':
      return true;
  }

  return false;
};

export const getUid = (length = 32, radix = null) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const uid = [];
  radix = radix || chars.length;

  for (let i = 0; i < length; i++) {
    uid[i] = chars[0 | (Math.random() * radix)];
  }

  return uid.join('');
};