import {
    IHttp,
    IModify,
    IRead,
    IPersistence,
} from '@rocket.chat/apps-engine/definition/accessors';

import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';

import fetch from 'node-fetch';


export class Gifcmd implements ISlashCommand {
    public command = 'gif';
    public i18nParamsExample = 'gif';
    public i18nDescription = 'This command will return a gif';
    public providesPreview = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const [gif] = context.getArguments();

        if (!gif) {
            throw new Error('You must provide a search query for the gif');
        }

        const payload = {
            "animation_prompts": [
                {
                "frame": 0,
                "prompt": gif
                },
                {
                "frame": 10,
                "prompt": gif
                }
            ]
        };

        // const response = await fetch("https://api.gooey.ai/v2/DeforumSD/", {
        //     method: "POST",
        //     headers: {
        //     "Authorization": "Bearer sk-BAuNHahdHwYs0rJC0jzbEb845byIE5Heezko0tZsWoZ6SATm",
        //     "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(payload),
        // });
        const response = await http.post("https://api.gooey.ai/v2/DeforumSD/", {
            headers: {
                "Authorization": "Bearer sk-BAuNHahdHwYs0rJC0jzbEb845byIE5Heezko0tZsWoZ6SATm",
                "Content-Type": "application/json",
            },
            data: payload,
        });

        const result = await response.data.output.output_video;

        const builder = modify.getCreator().startMessage().setRoom(context.getRoom()).setText(result);
        await modify.getCreator().finish(builder);
    }
}

