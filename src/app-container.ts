import { AppContainer } from "@expressots/core";
import { AppModule } from "@useCases/app/app.module";
import { CommunityModule } from "@useCases/community/community.module";

const appContainer = new AppContainer();

const container = appContainer.create([
    // Add your modules here
    AppModule,
    CommunityModule,
]);

export { container };
