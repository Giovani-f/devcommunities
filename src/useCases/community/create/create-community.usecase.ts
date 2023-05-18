import { provide } from "inversify-binding-decorators";
import {
    ICreateCommunityRequestDTO,
    ICreateCommunityResponseDTO,
} from "./create-community.dto";
import { ILinkValidator } from "@providers/link-validator/link-validator.interface";
import { AppError, Report, StatusCode } from "@expressots/core";
import { inject } from "inversify";
import { LinkValidator } from "@providers/link-validator/link-validator.provider";
import { Community } from "@entities/community.entity";
import { ICommunityRepository } from "@repositories/community/community-repository.interface";
import { CommunityRepository } from "@repositories/community/community.repository";

@provide(CreateCommunityUseCase)
class CreateCommunityUseCase {
    constructor(
        @inject(LinkValidator)
        private linkValidator: ILinkValidator,
        @inject(CommunityRepository)
        private communityRepository: ICommunityRepository,
    ) {}
    async execute(
        data: ICreateCommunityRequestDTO,
    ): Promise<ICreateCommunityResponseDTO | null> {
        try {
            for (const community of data.links) {
                if (
                    !this.linkValidator.validate(
                        community.url,
                        community.provider,
                    )
                ) {
                    Report.Error(
                        new AppError(
                            StatusCode.BadRequest,
                            `Invalid ${community.provider} link`,
                        ),
                    );
                }
            }

            const community: Community | null =
                await this.communityRepository.create(
                    new Community(
                        data.name,
                        data.description,
                        data.links,
                        data.tags,
                    ),
                );

            if (!community) {
                return null;
            }

            return {
                id: community.id,
                name: community.name,
            };
        } catch (error: any) {
            throw error;
        }
    }
}

export { CreateCommunityUseCase };
