import { Injectable } from '@angular/core';  
import {BehaviorSubject,  Observable  } from 'rxjs';  
import { HttpClient, HttpHeaders  } from '@angular/common/http';  
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Listing} from '@app/_models';

@Injectable({  
    providedIn: 'root'  
})  
export class UploadService {
    private fileServiceURL: string;
    
    constructor( private router: Router,private http: HttpClient) {
        this.fileServiceURL = `${environment.apiUrl}`;
    }


    public downloadFile(docFile: string): Observable < Blob > {  
        return this.http.get(this.fileServiceURL + '/GetFile?docFile=' + docFile, {  
            responseType: 'blob'  
        });  
    }  
    public downloadImage(image: string): Observable < Blob > {  
        return this.http.get(this.fileServiceURL + '/GetImage?image=' + image, {  
            responseType: 'blob'  
        });  
    }  
    public getFiles(): Observable < any[] > {  
        return this.http.get < any[] > (this.fileServiceURL + '/GetFileDetails');  
    }  

    addFileDetails(data: FormData) {  
        let headers = new HttpHeaders();  
        headers.append('Content-Type', 'application/json');  
        const httpOptions = {  
            headers: headers  
        };  
        // return this.http.post < string > (this.fileServiceURL + '/fileupload', data, httpOptions);  
        return this.http.post( `${environment.imgUpload}`, data, httpOptions);
    }  

    
    getAllPlayers() {
        return this.http.get<[]>(`${environment.apiUrl}/player`);
    }
    
    getnext(currentpage: number) {
        // return this.http.get<[Listing]>(`${environment.apiUrl}/player/page/${currentpage}`);
        return this.http.get(`${environment.apiUrl}/player?page=${currentpage}`)
    }



    
    
}  