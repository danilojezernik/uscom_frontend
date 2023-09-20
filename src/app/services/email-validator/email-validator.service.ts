import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

  constructor() { }

  // Function to check if an email is valid based on a regular expression pattern
  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the provided email matches the defined email pattern
    return email.match(emailPattern) !== null;
  }

}
