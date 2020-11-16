import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    EventsModule,
  ],
})
export class AppModule {}
