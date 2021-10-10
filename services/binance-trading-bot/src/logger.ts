import {uniq} from './utils';

type IMessage = unknown;

export type ILogger = {
  write(level: ILoggerLevel, message?: IMessage): void;
};

type ILoggerLevel = 'log' | 'warn' | 'error';

type ILoggerTarget = {
  [K in ILoggerLevel]: (message: IMessage) => void;
};

type ILoggerFormatter = (message: IMessage) => IMessage;

type ILoggerOptions = {
  targets?: ILoggerTarget[];
  formatters?: ILoggerFormatter[];
};

const DEFAULT_LOGGER_OPTIONS: ILoggerOptions = {
  targets: [console],
};

export class Logger implements ILogger {
  private options: ILoggerOptions;

  constructor(options: ILoggerOptions = DEFAULT_LOGGER_OPTIONS) {
    this.options = options;
  }

  private getFormatters = () => {
    return uniq(this.options.formatters ?? []);
  };

  private throughFormatters = (message?: IMessage) => {
    return this.getFormatters().reduce((acc, next) => next(acc), message);
  };

  private getTargets = () => {
    return uniq(this.options.targets ?? []);
  };

  private throughTargets = (level: ILoggerLevel, message?: IMessage) => {
    this.getTargets().forEach((target) => target[level](message));
  };

  write = (level: ILoggerLevel, message?: IMessage) => {
    this.throughTargets(level, this.throughFormatters(message));
  };
}

export const jsonFormatter = (message: IMessage) => {
  return JSON.stringify(message, null, 2);
};
