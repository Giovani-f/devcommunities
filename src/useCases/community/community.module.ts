import { CreateModule } from "@expressots/core";
import { CreateCommunityController } from "./create/create-community.controller";

const CommunityModule = CreateModule([CreateCommunityController]);

export { CommunityModule };
