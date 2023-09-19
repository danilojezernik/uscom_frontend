import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Post} from "../../models/post";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DialogPostComponent} from "../../components/dialog-post/dialog-post.component";
import {HeroComponent} from "../../components/hero/hero.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {GoBackComponent} from "../../components/go-back/go-back.component";
import {DataUpdateService} from "../../services/communication/data-update.service";
import {ErrorMessageComponent} from "../../components/error-message/error-message.component";
import {SpinnerComponent} from "../../components/spinner/spinner.component";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {ApiPostService} from "../../services/api/api-post.service";


@Component({
    selector: 'app-index',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        FlexModule,
        MatInputModule,
        MatSortModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatListModule,
        MatDialogModule,
        DialogPostComponent,
        HeroComponent,
        MatProgressSpinnerModule,
        GoBackComponent,
        ErrorMessageComponent,
        SpinnerComponent
    ],
    templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

    post: any; // Variable to hold post data

    spinner: boolean = false; // Variable to control the visibility of a spinner

    displayColumns: string[] = ['post_title', 'author', 'created_at', 'updated_at', 'action'] // Define the columns to be displayed in the MatTable
    dataSource = new MatTableDataSource<Post>(); // Initialize the MatTable data source with an array of posts

    // Data for the hero section
    heroData = {
        title: 'Harry Potter book chapters.',
        content: 'Check out some of the chapters of the book and read what others think about it!'
    };

    message: string = 'Backend service is unavailable. Please try again later.' // Message to display when backend service is unavailable

    // ViewChild decorator to get a reference to MatPaginator
    // @ts-ignore: TypeScript is ignored for paginator: MatPaginator
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private apiPost: ApiPostService,
        public dialog: MatDialog,
        private dataUpdateService: DataUpdateService,
        private snackbarService: SnackBarService
    ) {
    }

    // Lifecycle hook called after the component's view is initialized
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator; // Assign the paginator to the MatTable dataSource
    }

    // Lifecycle hook called after the component is initialized
    ngOnInit() {
        // Load posts on component initialization
        this.loadPosts()

        // Subscribe to data update events
        this.dataUpdateService.dataUpdated$.subscribe(() => {
            // Reload the table when data is updated
            this.loadPosts();
        });
    }

    // Opens a dialog to add a new post
    openDialog() {
        this.dialog.open(DialogPostComponent, {
            width: '30%'
        });
    }

    // Loads posts from the API and updates the MatTable dataSource
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
                console.error('Error loading posts:', error);
                this.spinner = false; // Hide loading spinner in case of error
            })
    }

    deletePost(postId: string) {
        // Call the API to delete the post
        this.apiPost.deletePostById(postId).subscribe(
            () => {
                this.snackbarService.showSnackbar('Post deleted successfully.');
                this.loadPosts()
            },
            (error) => {
                console.error('Error deleting post:', error);
            }
        );
    }
}
