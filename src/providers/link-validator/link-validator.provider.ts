import { provide } from "inversify-binding-decorators";
import { ILinkValidator } from "./link-validator.interface";

@provide(LinkValidator)
class LinkValidator implements ILinkValidator {
    public validate(url: string, provider: string): boolean {
        const providerStrategy = {
            discord: this.validateDiscord,
            telegram: this.validateTelegram,
            whatsapp: this.validateWhatsapp,
            slack: this.validateSlack,
        };

        const validator = providerStrategy[provider];
        if (!validator) {
            return false;
        }

        return validator.call(this, url);
    }

    private validateDiscord(url: string): boolean {
        return url.startsWith("https://discord.gg/");
    }

    private validateTelegram(url: string): boolean {
        return url.startsWith("https://t.me/");
    }

    private validateWhatsapp(url: string): boolean {
        return url.startsWith("https://chat.whatsapp.com/");
    }

    private validateSlack(url: string): boolean {
        return url.startsWith("https://join.slack.com/");
    }
}

export { LinkValidator };
