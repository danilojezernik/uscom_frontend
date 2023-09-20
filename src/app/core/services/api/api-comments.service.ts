import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiCommentsService {

    constructor(private api: HttpClient) {
    }

    /**
     * Fetches comments of a post by its ID.
     * @param postId The ID of the post for which comments are to be fetched.
     * @returns An observable of an array of comments for the specified post.
     */
    getCommentsOfPost(postId: string): Observable<Comment[]> {
        // Using Angular HttpClient to make a GET request to the specified API endpoint
        return this.api.get<Comment[]>(`${environment.backUrl}/comment/${postId}`).pipe(
            catchError(error => {
                // Log an error message if an error occurs during the API call
                console.error("Error getting comments for the post:", error);
                // Return a new observable with an error message if there's an error
                return throwError('Something went wrong')
            })
        )
    }

    /**
     * Adds a comment to a specific post.
     * @param postId The ID of the post to which the comment is to be added.
     * @param newBody The comment to be added.
     * @returns An observable of the added comment.
     */
    addCommentsToSpecificPost(postId: string, newBody: Comment): Observable<Comment> {
        // Using Angular HttpClient to make a POST request to the specified API endpoint for adding a comment to a specific post
        return this.api.post<Comment>(`${environment.backUrl}/comment/${postId}`, newBody).pipe(
            catchError(error => {
                // Log an error message if an error occurs during the API call
                console.error("Error adding a comment to the post:", error);
                // Return a new observable with an error message if there's an error
                return throwError('Something went wrong')
            })
        )
    }

    /**
     * Edits a comment by its ID for a specific post.
     * @param postId The ID of the post to which the comment belongs.
     * @param commentId The ID of the comment to edit.
     * @param newBody The updated comment data.
     * @returns An observable representing the result of the edit operation.
     */
    editCommentById(postId: string, commentId: string, newBody: Comment): Observable<any> {
        // Using Angular HttpClient to make a PUT request to the specified API endpoint for editing a comment by ID
        return this.api.put(`${environment.backUrl}/comment/${postId}/${commentId}`, newBody).pipe(
            catchError(error => {
                // Log an error message if an error occurs during the API call
                console.error("Error editing the comment by ID:", error);
                // Return a new observable with an error message if there's an error
                return throwError('Something went wrong')
            })
        )
    }

    /**
     * Deletes a comment by its ID for a specific post.
     * @param postId The ID of the post to which the comment belongs.
     * @param commentId The ID of the comment to delete.
     * @returns An observable representing the result of the delete operation.
     */
    deleteCommentById(postId: string, commentId: string): Observable<any> {
        // Use Angular HttpClient to make a DELETE request to the specified API endpoint for deleting a comment by ID
        return this.api.delete(`${environment.backUrl}/comment/${postId}/${commentId}`).pipe(
            catchError(error => {
                // Log an error message if an error occurs during the API call
                console.error("Error getting all the post data:", error)
                // Return a new observable with an error message if there's an error
                return throwError('Something went wrong')
            })
        )
    }

}
