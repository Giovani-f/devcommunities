import { BaseController, StatusCode } from "@expressots/core";
import {
    controller,
    httpPost,
    requestBody,
    response,
} from "inversify-express-utils";
import { CreateCommunityUseCase } from "./create-community.usecase";
import {
    ICreateCommunityRequestDTO,
    ICreateCommunityResponseDTO,
} from "./create-community.dto";

@controller("/communities")
class CreateCommunityController extends BaseController {
    constructor(private createCommunityUseCase: CreateCommunityUseCase) {
        super("create-community-controller");
    }

    @httpPost("/")
    execute(
        @requestBody() data: ICreateCommunityRequestDTO,
        @response() res: ICreateCommunityResponseDTO,
    ): any {
        return this.callUseCaseAsync(
            this.createCommunityUseCase.execute(data),
            res,
            StatusCode.Created,
        );
    }
}

export { CreateCommunityController };
