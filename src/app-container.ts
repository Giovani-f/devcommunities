import { AppContainer } from "@expressots/core";
import { AppModule } from "@useCases/app/app.module";
import { CommunityModule } from "@useCases/community/community.module";
import { PingModule } from "@useCases/ping/ping.module";
import { UserModule } from "@useCases/user/user.module";

const appContainer = new AppContainer();

const container = appContainer.create([
    // Add your modules here
    AppModule,
    PingModule,
    UserModule,
    CommunityModule,
]);

export { container };
