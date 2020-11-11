import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { BowlersModule } from './bowlers/bowlers.module';

@Module({
  imports: [
    BowlersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
