import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.inteface";
import { Message } from "../models/message.interface";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private http: HttpClient) {}

    fetch(): Observable<Array<Category>>{
     return  this.http.get<Array<Category>>('/api/category')
    }

    getById(id: string): Observable<Category> {
       return this.http.get<Category>(`/api/category/${id}`)
    }

    create(name: string, image?: File): Observable<Category>{
      const fd = new FormData()
      if(image){
        fd.append('image', image, image.name)
      }
      fd.append('name', name)
      return this.http.post<Category>('/api/category',fd)
    }

    update(id: any,name: string, image?: File): Observable<Category>{
        const fd = new FormData()
        if(image){
          fd.append('image', image, image.name)
        }
        fd.append('name', name)

        return this.http.patch<Category>(`/api/category/${id}`,fd)
      }

      delete(id: any): Observable<Message> {
        return this.http.delete<Message>(`/api/category/${id}`)
      }
}