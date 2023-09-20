import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Post} from "../../models/post";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiPostService {

    constructor(private api: HttpClient) {
    }

    /**
     * Fetches all posts.
     * @returns An observable of an array of posts.
     */
    getPostAll(): Observable<Post[]> {
        // Using Angular HttpClient to make a GET request to the specified API endpoint
        return this.api.get<Post[]>(`${environment.backUrl}/post`).pipe(
            catchError(error => {
                // Log an error message if an error occurs during the API call
                console.error("Error getting all the post data:", error)
                // Return a new observable with an error message if there's an error
                return throwError('Something went wrong')
            })
        )
    }

    /**
     * Adds a new post.
     * @param newPost The new post to be added.
     * @returns An observable of the added post.
     */
    addNewPost(newPost: Post): Observable<Post> {
        // Using Angular HttpClient to make a POST request to the specified API endpoint
        return this.api.post<Post>(`${environment.backUrl}/post`, newPost).pipe(
            catchError(error => {
                // Log an error message if an error occurs during the API call
                console.error("Error adding a new post:", error);
                // Return a new observable with an error message if there's an error
                return throwError('Something went wrong')
            })
        )
    }

    /**
     * Fetches a post by its ID.
     * @param id The ID of the post to fetch.
     * @returns An observable of the specified post.
     */
    getPostById(id: string): Observable<Post> {
        // Using Angular HttpClient to make a GET request to the specified API endpoint for getting a post by ID
        return this.api.get<Post>(`${environment.backUrl}/post/${id}`).pipe(
            catchError(error => {
                // Log an error message if an error occurs during the API call
                console.error("Error getting the post by ID:", error);
                // Return a new observable with an error message if there's an error
                return throwError('Something went wrong')
            })
        )
    }

    /**
     * Deletes a post by its ID.
     * @param id The ID of the post to delete.
     * @returns An observable representing the result of the delete operation.
     */
    deletePostById(id: string): Observable<any> {
        // Using Angular HttpClient to make a DELETE request to the specified API endpoint for deleting a post by ID
        return this.api.delete(`${environment.backUrl}/post/${id}`).pipe(
            catchError(error => {
                // Log an error message if an error occurs during the API call
                console.error("Error deleting the post by ID:", error);
                // Return a new observable with an error message if there's an error
                return throwError('Something went wrong')
            })
        )
    }

}
