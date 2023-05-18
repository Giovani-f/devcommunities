import "reflect-metadata";
import { ILinkValidator } from "@providers/link-validator/link-validator.interface";
import { mock, MockProxy } from "jest-mock-extended";
import { CreateCommunityUseCase } from "@useCases/community/create/create-community.usecase";
import { ICommunityRepository } from "@repositories/community/community-repository.interface";
import { ICreateCommunityRequestDTO } from "@useCases/community/create/create-community.dto";

describe("CreateCommunityUseCase", () => {
    let sut: CreateCommunityUseCase;
    const linkValidatorProvider: MockProxy<ILinkValidator> = mock();
    linkValidatorProvider.validate.mockReturnValue(true);
    const communityRepositoryMock: MockProxy<ICommunityRepository> = mock();
    communityRepositoryMock.create.mockResolvedValue({
        id: "123",
        name: "Test",
        description: "Test",
        links: [
            {
                id: "123",
                url: "https://discord.gg/",
                provider: "discord",
            },
        ],
        tags: [],
    });

    beforeEach(() => {
        sut = new CreateCommunityUseCase(
            linkValidatorProvider,
            communityRepositoryMock,
        );
    });

    it("should create a community", async () => {
        const data: ICreateCommunityRequestDTO = {
            name: "Test",
            description: "Test",
            tags: ["test"],
            links: [
                {
                    url: "https://discord.gg/",
                    provider: "discord",
                },
            ],
        };

        const result = await sut.execute(data);

        expect(result).toEqual({
            id: "123",
            name: "Test",
        });
    });

    it("should throw an error if the link is invalid", async () => {
        const data: ICreateCommunityRequestDTO = {
            name: "Test",
            description: "Test",
            tags: ["test"],
            links: [
                {
                    url: "https://discord.gg/",
                    provider: "discord",
                },
            ],
        };

        linkValidatorProvider.validate.mockReturnValue(false);

        await expect(() => sut.execute(data)).rejects.toThrowError(
            "Invalid discord link",
        );
    });
});
