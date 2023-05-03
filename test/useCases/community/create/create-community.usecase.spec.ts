import "reflect-metadata";
import { ILinkValidator } from "@providers/link-validator/link-validator.interface";
import { mock, MockProxy } from "jest-mock-extended";
import { CreateCommunityUseCase } from "@useCases/community/create/create-community.usecase";

describe("CreateCommunityUseCase", () => {
    let sut: CreateCommunityUseCase;
    const linkValidatorProvider: MockProxy<ILinkValidator> = mock();
    linkValidatorProvider.validate.mockReturnValue(true);

    beforeEach(() => {
        sut = new CreateCommunityUseCase(linkValidatorProvider);
    });

    it("should create a community", () => {
        const data = {
            name: "Test",
            description: "Test",
            image: "https://test.com",
            tags: ["test"],
            links: [
                {
                    link: "https://discord.gg/",
                    provider: "discord",
                },
            ],
        };

        const result = sut.execute(data);

        expect(result).toEqual({
            id: "123",
            name: "Test",
        });
    });

    it("should throw an error if the link is invalid", () => {
        const data = {
            name: "Test",
            description: "Test",
            image: "https://test.com",
            tags: ["test"],
            links: [
                {
                    link: "https://discord.gg/",
                    provider: "discord",
                },
            ],
        };

        linkValidatorProvider.validate.mockReturnValue(false);

        expect(() => sut.execute(data)).toThrowError("Invalid discord link");
    });
});
