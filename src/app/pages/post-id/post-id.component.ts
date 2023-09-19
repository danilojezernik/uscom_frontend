import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostService} from "../../services/api/services/post.service";
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../../services/api/services/comment.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {GoBackComponent} from "../../components/go-back/go-back.component";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ErrorMessageComponent} from "../../components/error-message/error-message.component";
import {SpinnerComponent} from "../../widgets/spinner/spinner.component";
import {HeroComponent} from "../../components/hero/hero.component";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";


@Component({
    selector: 'app-post-id',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        GoBackComponent,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        SpinnerComponent,
        HeroComponent,

    ],
    templateUrl: './post-id.component.html',
    styleUrls: ['../../app.component.css']
})
export class PostIdComponent {

    post: any; // Variable to hold post data
    comments: any; // Variable to hold comments data
    spinner: boolean = false; // Variable to control the visibility of a spinner
    selectedComment: any = null; // Variable to hold the selected comment for editing

    commentForm: FormGroup = new FormGroup({}); // FormGroup for comment form

    // Data for the hero section
    heroData = {
        title: 'Comments of the current chapter',
        content: 'Is there something you want to add for current title and you want others to know!'
    };
    message: string = 'Backend service is unavailable. Please try again later.' // Message for error 503

    constructor(
        private route: ActivatedRoute, // Angular service for accessing route information
        private postService: PostService, // Custom service for post-related functionality
        private commentService: CommentService, // Custom service for comment-related functionality
        private formBuilder: FormBuilder, // Angular service for building forms
        private snackbarService: SnackBarService // Injected service with function for snack bar
    ) {
    }

    ngOnInit() {
        const postId = this.route.snapshot.paramMap.get('id') || ''; // Get post ID from route
        this.commentForm = this.formBuilder.group({
            content: ['', Validators.required], // Content form control with required validator
            author: ['', Validators.required] // Author form control with required validator
        });
        if (postId) {
            this.getPostById(postId); // Fetch post data by ID
            this.getCommentsForPost(postId); // Fetch comments for the post
        }
    }

    getPostById(postId: string) {
        this.spinner = true; // Show spinner while fetching post data

        this.postService.getPostById({_id: postId}).subscribe(
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

    getCommentsForPost(postId: string) {
        this.spinner = true; // Show spinner while fetching comments

        this.commentService.getCommentsOfPost({post_id: postId}).subscribe(
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

    editComment(comment: any) {
        this.selectedComment = comment; // Set the selected comment for editing
        this.commentForm.patchValue({
            content: comment.content,
            author: comment.author
        });
        // When editComment is activated it will scroll to the top of the html page
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    deleteComment(commentId: string) {
        // Prompt the user for confirmation before deleting the comment
        if (!confirm('Are you sure you want to delete this comment?')) {
            return; // Exit the function if 'No' is pressed
        }

        // Call the comment service to delete the comment by ID
        this.commentService.deleteCommentById({
            post_id: this.post._id, // Post ID
            comment_id: commentId // Comment ID
        }).subscribe(
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

    onSubmit() {
        const postId = this.route.snapshot.paramMap.get('id') || '';

        // Check if we are editing an existing comment
        if (this.selectedComment) {
            // If we're editing a comment
            const updatedCommentData = {
                ...this.selectedComment, // Clone the selected comment
                content: this.commentForm.value.content,
                author: this.commentForm.value.author,
                updated_at: new Date().toISOString()  // Update updated_at timestamp
            };

            // Call the comment service to edit the comment
            this.commentService.editCommentById({
                post_id: postId, // Post ID
                comment_id: this.selectedComment._id, // Comment ID
                body: updatedCommentData // Updated comment data
            }).subscribe(
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
                const commentData = {
                    post_id: postId, // Post ID
                    content: this.commentForm.value.content,
                    author: this.commentForm.value.author,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                // Call the comment service to add a new comment to a specific post
                this.commentService.addCommentsToSpecificPost({post_id: postId, body: commentData})
                    .subscribe(() => {
                            this.snackbarService.showSnackbar('Your comment was was added successfully..');
                            this.getCommentsForPost(this.post._id); // Reload comments
                            this.commentForm.reset(); // Reset the form after successful submission
                        },
                        (error) => {
                            console.error('Error adding comment:', error);
                            this.snackbarService.showSnackbar('Error adding comment.');
                        }
                    );
            } else {
                console.error('Error: postId is null.');
            }
        }
    }

}
