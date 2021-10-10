const isNullable = (value) => value === undefined || value === null;

const isEmpty = (value) => {
  if (isNullable(value)) {
    return true;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};

const isNotEmpty = (value) => !isEmpty(value);

const assertCondition = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const assertEmpty = (condition, message) => {
  if (isEmpty(condition)) {
    throw new Error(message);
  }
};

const uniq = (...args) =>
  Array.from(new Set(args.map((arg) => (Array.isArray(arg) ? arg : [arg])).flat()));

module.exports = {
  isEmpty,
  isNotEmpty,
  assertCondition,
  assertEmpty,
  uniq,
};
