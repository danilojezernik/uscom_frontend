import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {ApiPostService} from "../../services/api/api-post.service";
import {ApiCommentsService} from "../../services/api/api-comments.service";


@Component({
    selector: 'app-post-id',
    templateUrl: './post-id.component.html'
})
export class PostIdComponent {

    post: any; // Variable to hold post data
    comments: any; // Variable to hold comments data
    spinner: boolean = false; // Variable to control the visibility of a spinner
    selectedComment: any = null; // Variable to hold the selected comment for editing

    /**
     * Definition of a comment form using Angular Reactive Forms.
     * Initialize an empty FormGroup to represent the comment form.
     */
    commentForm: FormGroup = new FormGroup({}); // FormGroup for comment form

    // Data for the hero section
    heroData = {
        title: 'Comments of the current chapter',
        content: 'Is there something you want to add for current title and you want others to know!'
    };

    message: string = 'Backend service is unavailable. Please try again later.' // Message for error 503

    constructor(
        private route: ActivatedRoute, // Angular service for accessing route information
        private apiPost: ApiPostService, // Custom service for post-related functionality
        private apiComment: ApiCommentsService, // Custom service for post-related functionality
        private formBuilder: FormBuilder, // Angular service for building forms
        private snackbarService: SnackBarService // Injected service with function for snack bar
    ) {
    }

    /**
     * Method to handle component initialization.
     * Initializes the comment form, fetches post data and comments based on the post ID.
     */
    ngOnInit() {
        // Get post ID from the route or use an empty string if not available
        const postId = this.route.snapshot.paramMap.get('id') || '';

        // Initialize the comment form with content and author form controls
        this.commentForm = this.formBuilder.group({
            content: ['', [Validators.required, Validators.minLength(5)]], // Content form control with required validator and minimum length of 5 characters
            author: ['', [Validators.required, Validators.minLength(5)]] // Author form control with required validator and minimum length of 5 characters
        });

        // If postId is available, fetch post data and comments for the post
        if (postId) {
            this.getPostById(postId); // Fetch post data by ID
            this.getCommentsForPost(postId); // Fetch comments for the post
        }
    }

    /**
     * Method to fetch post data by its ID.
     * @param postId - ID of the post to fetch
     */
    getPostById(postId: string) {
        this.spinner = true; // Show spinner while fetching post data

        // Fetch post data by its ID using the API service
        this.apiPost.getPostById(postId).subscribe(
            (postData) => {
                this.post = postData; // Assign fetched post data
                this.spinner = false // Hide spinner on successful fetch
            },
            (error) => {
                console.error('Error fetching post by ID:', error);
                this.spinner = false; // Ensure spinner is hidden in case of an error
            }
        );
    }

    /**
     * Method to fetch comments for a specific post by its ID.
     * @param postId - ID of the post for which comments are to be fetched
     */
    getCommentsForPost(postId: string) {
        this.spinner = true; // Show spinner while fetching comments

        // Fetch comments for the specified post using the API service
        this.apiComment.getCommentsOfPost(postId).subscribe(
            (comments) => {
                this.comments = comments; // Assign fetched comments
                this.spinner = false // Hide spinner on successful fetch
            },
            (error) => {
                console.error('Error fetching comments:', error);
                this.spinner = false; // Ensure spinner is hidden in case of an error
            }
        );
    }

    /**
     * Method to set the selected comment for editing and populate the comment form with its data.
     * @param comment - The comment to be edited
     */
    editComment(comment: any) {
        this.selectedComment = comment; // Set the selected comment for editing

        // Populate the comment form with the content and author of the selected comment
        this.commentForm.patchValue({
            content: comment.content,
            author: comment.author
        });

        // When editComment is activated it will scroll to the top of the HTML page
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Method to delete a comment.
     * @param commentId - The ID of the comment to be deleted
     */
    deleteComment(commentId: string) {
        // Prompt the user for confirmation before deleting the comment
        if (!confirm('Are you sure you want to delete this comment?')) {
            return; // Exit the function if 'No' is pressed
        }

        // Call the comment service to delete the comment by ID
        this.apiComment.deleteCommentById(
            this.post._id, // Post ID
            commentId // Comment ID
        ).subscribe(
            () => {
                // Comment deleted successfully
                this.snackbarService.showSnackbar('Comment deleted successfully');
                // Reload comments after deletion
                this.getCommentsForPost(this.post._id);
            },
            (error) => {
                console.error('Error deleting comment:', error);
                // Show an error snackbar if deletion fails
                this.snackbarService.showSnackbar('Error deleting comment. Please try again later.');
            }
        );
    }

    /**
     * Method to handle form submission for adding or editing a comment.
     */
    onSubmit() {
        const postId = this.route.snapshot.paramMap.get('id') || '';

        // Check if we are editing an existing comment
        if (this.selectedComment) {
            // If we're editing a comment
            const updatedCommentData = {
                ...this.selectedComment, // Clone the selected comment
                content: this.commentForm.value.content,
                author: this.commentForm.value.author,
                updated_at: new Date().toISOString()
            };

            // Call the comment service to edit the comment
            this.apiComment.editCommentById(
                postId, // Post ID
                this.selectedComment._id, // Comment ID
                updatedCommentData // Updated comment data
            ).subscribe(
                () => {
                    this.selectedComment = null; // Reset selected comment
                    this.snackbarService.showSnackbar('Comment was edited and added successfully.');
                    this.getCommentsForPost(this.post._id); // Reload comments
                    this.commentForm.reset(); // Reset the form after successful submission
                },
                (error) => {
                    console.error('Error editing comment:', error);
                    this.snackbarService.showSnackbar('Error editing comment.');
                }
            );
        } else {
            // Check if postId is not null before using it
            if (postId) {

                // Create the comment data object
                const commentData: any = {
                    post_id: postId,
                    content: this.commentForm.value.content,
                    author: this.commentForm.value.author,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                // Call the comment service to add a new comment to a specific post
                this.apiComment.addCommentsToSpecificPost(postId, commentData)
                    .subscribe(() => {

                            // Success: show a success snackbar and reset the form
                            this.snackbarService.showSnackbar('Your comment was was added successfully..');
                            this.getCommentsForPost(this.post._id); // Reload comments
                            this.commentForm.reset(); // Reset the form after successful submission

                            // Scroll to the bottom of the page
                            window.scroll({
                                top:  document.body.scrollHeight,
                                left: 0,
                                behavior: 'smooth'
                            });
                        },
                        (error) => {
                            console.error('Error adding comment:', error);
                            // Show an error snackbar if adding comment fails
                            this.snackbarService.showSnackbar('Error adding comment.');
                        }
                    );
            } else {
                console.error('Error: postId is null.');
            }
        }
    }

}
