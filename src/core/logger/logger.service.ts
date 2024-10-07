import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  log(message: string) {
    console.log(`[CustomLogger] ${message}`)
  }
  error(message: string, trace: string) {
    console.error(`[CustomLogger] ${message}`)
    if (trace) {
      console.error(`[CustomLogger] Stack trace: ${trace}`);
    }
  }
  warn(message: string) {
    console.warn(`[CustomLogger] ${message}`)
  }
}