import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Post} from "../../models/post";
import {DataUpdateService} from "../../services/communication/data-update.service";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {ApiPostService} from "../../services/api/api-post.service";

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    templateUrl: './dialog-post.component.html'
})
export class DialogPostComponent implements OnInit {

    post: any; // Variable to hold post data
    addingPostForm: FormGroup = new FormGroup({}) // FormGroup for post form

    constructor(
        private apiPost: ApiPostService, // Custom service for post-related functionality
        public dialog: MatDialog, // Angular service for dialog
        public formBuilder: FormBuilder, // Angular service for building forms
        private dataUpdateService: DataUpdateService, // Inject custom service for updating data
        private snackbarService: SnackBarService // Injected custom service with function for snack bar
    ) {
    }

    ngOnInit() {
        this.addingPostForm = this.formBuilder.group({
            postTitle: ['', Validators.required], // Post title form control with required validator
            author: ['', Validators.required] // Author form control with required validator
        })
    }

    addPost() {
        // Check if the form is invalid
        if (this.addingPostForm.invalid) {
            return; // Exit the function if the form is invalid
        }

        // Extract form values
        const formValues = this.addingPostForm.value;

        // Create a new Post object based on the form value
        const newPost: Post = {
            post_title: formValues.postTitle,
            author: formValues.author,
        };

        // Call the postService to add a new post
        this.apiPost.addNewPost(newPost).subscribe(
            (data) => {

                // Show a success snackbar with the new post's title
                this.snackbarService.showSnackbar(`New post with title: ${data.post_title.toUpperCase()} was added`);

                // Update the post data
                this.post = this.apiPost.getPostAll()

                // Reset the form
                this.addingPostForm.reset();

                // Trigger a data update to reflect the changes
                this.dataUpdateService.triggerDataUpdate();
            },
            (error) => {
                console.error('Error adding post:', error);
            }
        );
    }
}
