import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Email} from "../../models/email";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiEmailService {

    constructor(private api: HttpClient) {
    }

    /**
     * Sends an email.
     * @param newBody The email to be sent.
     * @returns An observable representing the result of the email sending operation.
     */
    sendEmail(newBody: Email): Observable<Email> {
        // Use Angular HttpClient to make a POST request to the specified API endpoint for sending an email
        return this.api.post<Email>(`${environment.backUrl}/email/send-email`, newBody).pipe(
            catchError(error => {
                // Log an error message if an error occurs during the API call
                console.error("Error sending an email:", error)
                // Return a new observable with an error message if there's an error
                return throwError('Something went wrong')
            })
        )
    }
}
