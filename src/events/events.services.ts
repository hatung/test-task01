import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Event, EventDocument, EventStatus } from './schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}
  // create event and save to DB
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    createdEvent.status = EventStatus.Draft; // default value
    createdEvent.deleted = null;
    return createdEvent.save();
  }
  // logic delete an event in DB
  async delete(eventID) {
    const deleted = await this.eventModel.findOneAndUpdate(
      { _id: eventID, deleted: { $eq: null } },
      { deleted: new Date() },
    );
    return deleted;
  }
  // do publish an event
  async publish(eventID): Promise<Event> {
    const edited = await this.eventModel.findOneAndUpdate(
      { _id: eventID, deleted: { $eq: null } },
      { status: EventStatus.Published, published_date: new Date() },
    );
    return edited;
  }
  // get all published events in DB
  async findAll(): Promise<Event[]> {
    return this.eventModel.find({ deleted: { $eq: null } }).exec();
  }
}
