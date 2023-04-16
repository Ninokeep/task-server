import { HttpException, HttpStatus } from "@nestjs/common"

export class DatabaseConnectionException extends HttpException {

    constructor() {
        super('Unable to connect to the database', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}