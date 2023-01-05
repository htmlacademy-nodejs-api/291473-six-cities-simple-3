import { LoggerInterface } from '../common/logger/logger.interface.js';

export default class Application {
    private logger!: LoggerInterface;

    constructor(logger: LoggerInterface) {
        this.logger = logger;
    }

    public async init() {
        this.logger.info('Application initialization');
        // this.logger.warn('Application initialization'); // пример warning;
        // this.logger.error('Application initialization'); // пример error;
    }
}