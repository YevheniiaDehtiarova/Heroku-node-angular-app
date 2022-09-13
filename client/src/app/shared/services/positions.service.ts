import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../models/message.interface";
import { Position } from "../models/position.interface";

@Injectable({
    providedIn:'root'
})
export class PositionsService{
    constructor(private http: HttpClient){}

    fetch(categoryId: string): Observable<Array<Position>> {
        return this.http.get<Array<Position>>(`/api/position/${categoryId}`)
    }
    create(position: Position):Observable<Position>{
        return this.http.post<Position>('/api/position', position)
    }
    update(position: Position):Observable<Position>{
        return this.http.patch<Position>(`/api/position/${position._id}`, position)
    }
    delete(position: Position): Observable<Message>{
        return this.http.delete<Message>(`/api/position/${position._id}`)
    }
}