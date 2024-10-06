import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  log(message: string) {
    console.log(`[CustomLogger] ${message}`)
  }
  error(message: string, trace: string) {
    console.log(`[CustomLogger] ${message}`)
  }
  warn(message: string) {
    console.log(`[CustomLogger] ${message}`)
  }
}