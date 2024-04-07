import { Controller, Get, Post, Body, Patch, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('countries')
  async getCountries() {
    return this.appService.getCountries();
  }

  @Get('currencies')
  async getCurrencies(){
    return this.appService.getCurrencies();
  }

  @Patch('set-active-countries')
  async setActiveCountry(@Body() body): Promise<{ message: string }> {
    const { item, active } = body;
    if (typeof item !== 'string' || typeof active !== 'boolean') {
      throw new NotFoundException('Invalid data format');
    }

    try {
      await this.appService.setActiveCountry(item, active);
      return { message: `Flag active for ${item} updated successfully` };
    } catch (error) {
      throw new NotFoundException('Error updating active flag');
    }
  }

  @Post('set-active-currencies')
  async setActiveCurrency(@Body() body): Promise<{ message: string }> {
    const { item, active } = body;
    if (typeof item !== 'string' || typeof active !== 'boolean') {
      throw new NotFoundException('Invalid data format');
    }

    try {
      await this.appService.setActiveCurrency(item, active);
      return { message: `Flag active for ${item} updated successfully` };
    } catch (error) {
      throw new NotFoundException('Error updating active flag');
    }
  }
}
