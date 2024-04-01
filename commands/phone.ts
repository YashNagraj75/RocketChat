import {
    IHttp,
    IModify,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';

import {
    ISlashCommand,
    SlashCommandContext,
    ISlashCommandPreview,
} from '@rocket.chat/apps-engine/definition/slashcommands';



export class PhoneCommand implements ISlashCommand {
    public command = 'phone';
    public i18nParamsExample = '';
    public i18nDescription = '';
    public providesPreview = false;


    public async sendMessage(context: SlashCommandContext, modify:IModify, message: string): Promise<void> {
        const msg = modify.getCreator().startMessage();
        const sender = context.getSender();
        const room = context.getRoom();

        msg
            .setSender(sender)
            .setRoom(room)
            .setText(message);
        
        await modify.getCreator().finish(msg);

    }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const [subcommand] = context.getArguments();

        if(!subcommand){
            throw new Error('Subcommand is required');
        }

        switch (subcommand) {
            case 'text' :
                await this.sendMessage(context, modify, 'Texting');
                break;

            case 'call' :
                await this.sendMessage(context, modify, 'Calling');
                break;
            
            default:
                throw new Error('Error!');
        }
    }
}