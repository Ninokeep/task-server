import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { DatabaseConnectionException } from "./database-exception.filter";


@Catch(DatabaseConnectionException, NotFoundException, HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<any>();
        const request = ctx.getRequest<Request>();

        if (exception instanceof DatabaseConnectionException) {
            const status = HttpStatus.INTERNAL_SERVER_ERROR;
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'Unable to connect to the database',
            });
        }

        if (exception instanceof NotFoundException) {
            const status = HttpStatus.NOT_FOUND;
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'The requested resource was not found',
            });
        }
    }

}