export interface LoggerInterface {
  info(message: string, ...args: unknown[]): void; // для логирования информационных сообщений;
  warn(message: string, ...args: unknown[]): void; // для логирования предупреждений;
  error(message: string, ...args: unknown[]): void; // для логирования ошибок;
  debug(message: string, ...args: unknown[]): void; // для логирования отладочных сообщений;
}
