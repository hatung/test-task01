import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { EventsService } from './events.services';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';
import { ValidateObjectId } from '../common/pipes/validate-object-id.pipes';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  // Create an event
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.create(createEventDto);
  }
  // Retrieve all published events
  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }
  // Publish an event using ID
  @Put('/publish')
  async publishEvent(
    @Res() res,
    @Query('eventID', new ValidateObjectId()) eventID,
  ) {
    const editedEvent = await this.eventsService.publish(eventID);
    if (!editedEvent) {
      throw new NotFoundException('Event does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Event has been successfully updated',
      post: editedEvent,
    });
  }
  // Delete a post using ID
  @Delete('')
  async deleteEvent(
    @Res() res,
    @Query('eventID', new ValidateObjectId()) eventID,
  ) {
    const deletedEvent = await this.eventsService.delete(eventID);
    if (!deletedEvent) {
      throw new NotFoundException('Event does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Event has been deleted!',
      post: deletedEvent,
    });
  }
}
