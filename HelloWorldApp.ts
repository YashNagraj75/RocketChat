import {
    IAppAccessors,
    ILogger,
    IConfigurationExtend
} from '@rocket.chat/apps-engine/definition/accessors';
import { App} from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { PhoneCommand } from './commands/phone';
import { StatusUpdateCmd } from './commands/StatusUpdateCmd';

import {  HTTPRequestCommand } from './commands/HTTPRequestCommand';
import { Gifcmd } from './commands/GifCmd';

export class HelloWorldApp extends App {
    private readonly appLogger: ILogger;

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);

    }

    public async extendConfiguration(configuration: IConfigurationExtend) {
        configuration.slashCommands.provideSlashCommand(new PhoneCommand());
        configuration.slashCommands.provideSlashCommand(new StatusUpdateCmd());
        configuration.slashCommands.provideSlashCommand(new HTTPRequestCommand());
        configuration.slashCommands.provideSlashCommand(new Gifcmd());
    }   
}






