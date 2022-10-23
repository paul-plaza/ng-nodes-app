//servicio para obtener datos
import { Injectable } from '@angular/core';
import { HttpFactoryService } from 'src/app/shared/http-base-service';
import { Observable } from 'rxjs';
import { FamilyModel, GraphModel } from 'src/app/models';
import { Configuration } from 'src/app/config/config';


@Injectable()
export class FamilyService {

    private endPoint: string = Configuration.server;

    constructor(private http: HttpFactoryService) { }

    getFamily(): Observable<Array<FamilyModel>> {
        return this.http.get(`${this.endPoint}families`);
    }

    getNodes(parameter: string): Observable<GraphModel> {

        if (parameter) {
            return this.http.get(`${this.endPoint}families/nodes/${parameter}`);
        }
        return this.http.get(`${this.endPoint}families/nodes`);
    }
}