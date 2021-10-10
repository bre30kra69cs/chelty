const {assertEmpty, uniq} = require('./utils');

const DEFAULT_LOGGER_OPTIONS = {
  targets: [console],
  formatters: [],
  levels: {
    log: {
      targets: [],
      formatters: [],
    },
  },
};

class Logger {
  #options;

  constructor(options = DEFAULT_LOGGER_OPTIONS) {
    assertEmpty(options.levels, '[Logger] No levels');

    this.#options = options;
  }

  #throughFormatters = (value, formatters) => formatters.reduce((acc, next) => next(acc), value);

  #throughTargets = (message, targets) => targets.forEach((target) => target(message));

  #getLevelConfig = (level) => this.#options.levels[level];

  #getFormatters = (level) => {
    const commonFormatters = this.#options.formatters ?? [];
    const config = this.#getLevelConfig(level);
    const levelFormatters = config.formatters ?? [];
    return uniq(levelFormatters, commonFormatters);
  };

  #getTargets = (level) => {
    const commonTargets = this.#options.targets ?? [];
    const config = this.#getLevelConfig(level);
    const levelTargets = config.targets ?? [];
    return uniq(levelTargets, commonTargets);
  };

  write = (level, value) => {
    const config = this.#getLevelConfig(level);

    if (!config) return;

    const formatters = this.#getFormatters(level);
    const targets = this.#getTargets(level);
    const message = this.#throughFormatters(value, formatters);
    this.#throughTargets(message, targets);
  };
}

const jsonFormatter = (value) => {
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  return value;
};

module.exports = {
  Logger,
  jsonFormatter,
};
