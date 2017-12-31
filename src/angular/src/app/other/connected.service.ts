import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/Rx";
import {HttpClient} from "@angular/common/http";

import {LoggerService} from "../common/logger.service";
import {BaseStreamService} from "../common/base-stream.service";


/**
 * ConnectedService exposes the connection status to clients
 * as an Observable
 */
@Injectable()
export class ConnectedService extends BaseStreamService {

    // For clients
    private _connectedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(_logger: LoggerService,
                _http: HttpClient) {
        super(_logger, _http);
        // No events to register
    }

    get connected(): Observable<boolean> {
        return this._connectedSubject.asObservable();
    }

    protected onEvent(eventName: string, data: string) {
        // Nothing to do
    }

    protected onConnected() {
        if(this._connectedSubject.getValue() === false) {
            this._connectedSubject.next(true);
        }
    }

    protected onDisconnected() {
        if(this._connectedSubject.getValue() === true) {
            this._connectedSubject.next(false);
        }
    }
}