import { ConfigModule } from '@nestjs/config';
import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import * as path from 'path'
import {ServeStaticModule} from "@nestjs/serve-static";

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        TrackModule,
        FileModule
    ]
})
export class AppModule {}
