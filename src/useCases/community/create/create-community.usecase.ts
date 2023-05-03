import { provide } from "inversify-binding-decorators";
import {
    ICreateCommunityRequestDTO,
    ICreateCommunityResponseDTO,
} from "./create-community.dto";
import { ILinkValidator } from "@providers/link-validator/link-validator.interface";
import { AppError, Report, StatusCode } from "@expressots/core";
import { inject } from "inversify";
import { LinkValidator } from "@providers/link-validator/link-validator.provider";

@provide(CreateCommunityUseCase)
class CreateCommunityUseCase {
    constructor(
        @inject(LinkValidator)
        private linkValidator: ILinkValidator,
    ) {}
    execute(
        data: ICreateCommunityRequestDTO,
    ): ICreateCommunityResponseDTO | AppError {
        try {
            for (const community of data.links) {
                if (
                    !this.linkValidator.validate(
                        community.link,
                        community.provider,
                    )
                ) {
                    Report.Error(
                        new AppError(
                            StatusCode.BadRequest,
                            `Invalid ${community.provider} link}`,
                        ),
                    );
                }
            }

            return {
                id: "123",
                name: "Test",
            };
        } catch (error: any) {
            throw error;
        }
    }
}

export { CreateCommunityUseCase };
