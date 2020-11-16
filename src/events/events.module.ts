import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.services';
import { Event, EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    //MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: Event.name,
        useFactory: () => {
          const schema = EventSchema;
          schema.post('find', (result) => {
            if (result) {
              if (Array.isArray(result)) {
                result.forEach((x) => {
                  const date1 = new Date(x.end_date);
                  const date2 = new Date(x.start_date);
                  const diff = Math.abs(date1.getTime() - date2.getTime());
                  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                  x.duration = diffDays;
                });
              }
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
