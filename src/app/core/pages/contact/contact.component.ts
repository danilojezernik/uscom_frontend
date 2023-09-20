import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiEmailService} from "../../services/api/api-email.service";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {Email} from "../../models/email";
import {EmailValidatorService} from "../../services/email-validator/email-validator.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {

  heroData = {
    title: 'Contact me',
    content: 'If you have any questions let me know!'
  }
  spinner: boolean = false; // Variable to control the visibility of a spinner

  /**
   * Definition of an email form using Angular Reactive Forms.
   * Initialize an empty FormGroup to represent the email form.
   */
  emailForm: FormGroup = new FormGroup({})

  constructor(
    private apiEmail: ApiEmailService,  // Custom service for email-related functionality
    private snackbarService: SnackBarService, // Injected service with function for snack bar
    private formBuilder: FormBuilder, // Angular service for building forms
    private emailValidator: EmailValidatorService  // Injected service with function for validating email
  ) {
  }

  ngOnInit() {
    // Initialize the form with validators
    this.emailForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      content: ['', Validators.required]
    })
  }

  /**
   * Method to send an email using the provided email data.
   */
  sendEmail() {
    this.spinner = true; // Show loading spinner
    // Extract email data from the form
    const emailData: Email = {
      content: this.emailForm.value.content,
      email: this.emailForm.value.email,
      name: this.emailForm.value.name,
      surname: this.emailForm.value.surname,
    };

    // Check if the email is valid using the emailValidator service
    const email = emailData.email;
    if (!this.emailValidator.isEmailValid(email)) {
      this.snackbarService.showSnackbar('Please enter a valid email address.');
      return;  // Do not proceed if email is not valid
    }

    // Send the email using the API service
    this.apiEmail.sendEmail(emailData)
      .subscribe(
        () => {
          // Show a success snackbar and reset the form after successful submission
          this.snackbarService.showSnackbar('Email sent successfully!')
          this.emailForm.reset(); // Reset the form after successful submission
          this.spinner = false // Hide loading spinner

        },
        (error) => {
          console.error('Error sending email:', error);
          // Show an error snackbar if sending email fails
          this.snackbarService.showSnackbar('Error sending email. Please try again later.');
          this.spinner = false // Hide loading spinner
        }
      )
  }

}
