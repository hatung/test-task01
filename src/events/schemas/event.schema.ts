import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document } from 'mongoose';

export enum EventStatus {
  Draft = 'draft',
  Published = 'published',
  Canceled = 'canceled',
}

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  location: string;

  @Prop()
  start_date: Date;
  @Prop()
  end_date: Date;

  @Prop({
    virtual: true,
  })
  duration: number;

  @Prop()
  status: EventStatus;
  @Prop()
  published_date: Date;
  @Prop()
  deleted: any;
}

export const EventSchema = SchemaFactory.createForClass(Event);
