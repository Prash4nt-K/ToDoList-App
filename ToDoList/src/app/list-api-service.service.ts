import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListApiServiceService {

  constructor(private _http:HttpClient) { }

  _url = 'https://peaceful-garden-47648.herokuapp.com/';

  getAllLists() {
    return this._http.get(this._url + 'allList');
  }

  addList(list: String ): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({"listName": list});
    console.log(body);
    
    return this._http.post<any>(this._url + 'list', body,{'headers':headers})
  }

  deleteList(list: string): Observable<any>  {
    return this._http.delete(this._url + 'deleteList/' + list);
  }

  getAllTasksByListName(list: string) {
    return this._http.get(this._url + 'alltaskByListName/' + list);
  }

  addTask(task: any ): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({"listName": task.listName, "taskName": task.taskName});
    console.log(body);
    
    return this._http.post<any>(this._url + 'task', body,{'headers':headers})
  }

  deleteTask(task: string): Observable<any>  {
    return this._http.delete(this._url + 'deleteTask/' + task);
  }

}