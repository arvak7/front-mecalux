import {TestBed} from '@angular/core/testing';
import {HttpExceptionHandlerService} from './http-exception-handler.service';
import {LoggingService} from './logging.service';
import {Mock, MockingUtil} from '../../testing/mocking.util';
import {StatusCodes} from 'http-status-codes';

describe('HttpExceptionHandlerService', () => {
  let service: HttpExceptionHandlerService;
  let loggingServiceMock: Mock<LoggingService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpExceptionHandlerService,
        MockingUtil.createMockProvider(LoggingService)
      ]
    });

    service = TestBed.inject(HttpExceptionHandlerService);
    loggingServiceMock = TestBed.inject(LoggingService);

    spyOn(window, 'alert').and.stub();
  });

  it('#handleError should call the logging service and alert', () => {
    service.handleError({error: {errors: []}, status: StatusCodes.UNPROCESSABLE_ENTITY} as any);
    expect(loggingServiceMock.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });
});
