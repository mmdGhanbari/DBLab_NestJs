import { Controller, Post, Body, Get, Header, Query } from '@nestjs/common'
import { HelloService } from './hello.service'
import { PersonDto } from './dto/person.dto'
import { ApiResponse, ApiQuery } from '@nestjs/swagger'

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @ApiResponse({ status: 200, description: 'Say Hello!' })
  @Header('Content-Type', 'application/json')
  @Post('welcome')
  async sayWelcome(@Body() personDto: PersonDto): Promise<{ data: string }> {
    const msg = await this.helloService.welcome(personDto)
    return { data: msg }
  }

  @ApiResponse({ status: 200 })
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
    description: `you can ignore it`,
  })
  @Get('welcome')
  async sayWelcomeWithGet(
    @Query('name') iName: string,
    @Query('year') iYear: number,
  ): Promise<{ data: string }> {
    const msg = await this.helloService.welcome({ name: iName, year: iYear })
    return { data: msg }
  }
}
