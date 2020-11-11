import { Module } from '@nestjs/common';
import { BowlersResolver } from './bowlers.resolver';
import { BowlersService } from './bowlers.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [BowlersService, BowlersResolver],
  exports: [],
})
export class BowlersModule {}
