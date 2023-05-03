import "reflect-metadata";

import { ILinkValidator } from "@providers/link-validator/link-validator.interface";
import { LinkValidator } from "@providers/link-validator/link-validator.provider";

describe("LinkValidator", () => {
    let linkValidator: ILinkValidator;

    beforeEach(() => {
        linkValidator = new LinkValidator();
    });

    describe("validate", () => {
        it("should return true for Discord link", () => {
            const result = linkValidator.validate(
                "https://discord.gg/123456",
                "discord",
            );
            expect(result).toBe(true);
        });

        it("should return true for Telegram link", () => {
            const result = linkValidator.validate(
                "https://t.me/joinchat/abcdef",
                "telegram",
            );
            expect(result).toBe(true);
        });

        it("should return true for WhatsApp link", () => {
            const result = linkValidator.validate(
                "https://chat.whatsapp.com/invite/xyz123",
                "whatsapp",
            );
            expect(result).toBe(true);
        });

        it("should return true for Slack link", () => {
            const result = linkValidator.validate(
                "https://join.slack.com/t/team/shared_invite/zt-123abc",
                "slack",
            );
            expect(result).toBe(true);
        });

        it("should return false for unknown provider", () => {
            const result = linkValidator.validate(
                "https://example.com",
                "unknown",
            );
            expect(result).toBe(false);
        });

        it("should return false for invalid link", () => {
            const result = linkValidator.validate("invalid link", "default");
            expect(result).toBe(false);
        });

        it("should call the validate method with the correct parameters", () => {
            const spy = jest.spyOn(linkValidator, "validate");
            linkValidator.validate("https://discord.gg/123456", "discord");
            expect(spy).toHaveBeenCalledWith(
                "https://discord.gg/123456",
                "discord",
            );
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
