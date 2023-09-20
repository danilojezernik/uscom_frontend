import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../models/post";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DialogPostComponent} from "../../components/dialog-post/dialog-post.component";
import {DataUpdateService} from "../../services/communication/data-update.service";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {ApiPostService} from "../../services/api/api-post.service";


@Component({
    selector: 'app-index',
    templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

    post: any; // Variable to hold post data

    spinner: boolean = false; // Variable to control the visibility of a spinner

    displayColumns: string[] = ['post_title', 'author', 'created_at', 'updated_at', 'action'] // Define the columns to be displayed in the MatTable

    /**
     * Data source for the MatTable representing posts.
     * Initialize the MatTableDataSource with an array of posts.
     */
    dataSource = new MatTableDataSource<Post>();

    // Data for the hero section
    heroData = {
        title: 'Harry Potter book chapters.',
        content: 'Check out some of the chapters of the book and read what others think about it!'
    };

    // Message to display when backend service is unavailable
    message: string = 'Backend service is unavailable. Please try again later.'

    /**
     * ViewChild decorator to get a reference to the MatPaginator component.
     * Used to access and manipulate the MatPaginator component in the template.
     *
     */
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private apiPost: ApiPostService,
        public dialog: MatDialog,
        private dataUpdateService: DataUpdateService,
        private snackbarService: SnackBarService
    ) {
    }

    /**
     * Method to handle actions after the view and child views are initialized.
     * Assigns the paginator to the MatTable dataSource.
     */
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator; // Assign the paginator to the MatTable dataSource
    }

    /**
     * Method to handle component initialization.
     * Load posts on component initialization and subscribe to data update events.
     */
    ngOnInit() {
        // Load posts on component initialization
        this.loadPosts()

        // Subscribe to data update events using the DataUpdateService
        this.dataUpdateService.dataUpdated$.subscribe(() => {
            // Reload the table when data is updated
            this.loadPosts();
        });
    }

    /**
     * Method to open a dialog to create a new post.
     */
    openDialog() {
        // Open a dialog using Angular Material's MatDialog
        this.dialog.open(DialogPostComponent, {
            width: '30%' // Set the width of the dialog
        });
    }

    /**
     * Method to load posts from the API.
     */
    loadPosts() {
        this.spinner = true; // Show loading spinner

        // Call the API to get all posts
        this.apiPost.getPostAll().subscribe(
            (data) => {
                // Assign retrieved data to post and MatTable dataSource
                this.post = data
                this.dataSource.data = data; // Assign data to the MatTable dataSource
                this.spinner = false // Hide loading spinner
            },
            (error) => {
                // Log an error message if loading posts fails
                console.error('Error loading posts:', error);
                this.spinner = false; // Hide loading spinner in case of error
            })
    }

    /**
     * Method to delete a post by its ID.
     * @param postId The ID of the post to be deleted.
     */
    deletePost(postId: string) {
        // Call the API to delete the post
        this.apiPost.deletePostById(postId).subscribe(
            () => {
                // Show a snackbar message on successful deletion
                this.snackbarService.showSnackbar('Post deleted successfully.');
                // Reload the posts after deletion
                this.loadPosts()
            },
            (error) => {
                // Log an error message if deletion fails
                console.error('Error deleting post:', error);
                // Show a snackbar message on unsuccessful deletion
                this.snackbarService.showSnackbar('Post delete was unsuccessful.');
            }
        );
    }
}
