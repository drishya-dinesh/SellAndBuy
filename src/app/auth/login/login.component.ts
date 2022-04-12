import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { COLLECTIONS } from 'src/app/home/app-constants';
import { FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  staticCreds = [];

  pageType: PageType = 'login';

  public loginObject = {
    email: '',
    password: '',
  };
  loginErrorMessage = '';

  registerObject = {
    fullName: {
      value: '',
      errorMessage: '',
    },
    email: {
      value: '',
      errorMessage: '',
    },
    phone: {
      value: '',
      errorMessage: '',
    },
    password: {
      value: '',
      errorMessage: '',
    },
    confirmPassword: {
      value: '',
      errorMessage: '',
    },
    errorFlag: false,
  };

  registerLoading = false;

  loginLoading = false;

  constructor(
    private router: Router,
    private fireBaseService: FireBaseService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn && JSON.parse(isLoggedIn || '')) {
      this.router.navigate(['home']);
    }
  }

  login() {
    this.loginErrorMessage = this.validateLogin().message;
    if (!this.loginErrorMessage) {
      this.loginLoading = true;
      this.fireBaseService
        .checkUserExists(COLLECTIONS.USERS, this.loginObject)
        .subscribe((val: any) => {
          this.loginLoading = false;
          if (val.length > 0) {
            const user = val[0];
            sessionStorage.setItem('userName', user.fullName);
            sessionStorage.setItem('userId', user.email);
            sessionStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['home']);
          } else {
            this.loginErrorMessage =
              'Login failed, Please check your Email and password.';
          }
        });
    }
  }

  register() {
    // this.pageType = 'login';
    this.validateRegister();
    let validFlag = false;
    Object.keys(this.registerObject).forEach((item) => {
      // @ts-ignore
      if (this.registerObject[item]['errorMessage']) {
        validFlag = true;
      }
    });
    if (!validFlag) {
      let userObj: any = {};
      userObj['fullName'] = this.registerObject.fullName.value;
      userObj['email'] = this.registerObject.email.value;
      userObj['password'] = this.registerObject.password.value;
      userObj['phone'] = this.registerObject.phone.value;
      this.registerLoading = true;
      this.fireBaseService
        .checkEmailExists(COLLECTIONS.USERS, this.registerObject.email.value)
        .subscribe((val: any) => {
          if (val.length > 0) {
            this.message.create(
              'error',
              'User already exists, Please try login.'
            );
            this.registerLoading = false;
          } else {
            this.fireBaseService
              .addUsers(COLLECTIONS.USERS, userObj)
              .then((val: any) => {
                this.message.create(
                  'success',
                  'Registration Successful, Please Login to continue.'
                );
                this.backToLogin();
              })
              .catch(() => {
                this.message.create(
                  'error',
                  'Registration Failed, Please Try again later.'
                );
              })
              .finally(() => {
                this.registerLoading = false;
              });
          }
        });
    }
  }

  gotoRegister() {
    this.pageType = 'register';
  }

  backToLogin() {
    this.pageType = 'login';
  }

  validateLogin() {
    const validation = {
      validFlag: true,
      message: '',
    };

    if (
      this.loginObject.email.length === 0 &&
      this.loginObject.password.length === 0
    ) {
      validation.validFlag = false;
      validation.message = 'Please enter username and password';
      return validation;
    } else if (this.loginObject.email.length === 0) {
      validation.validFlag = false;
      validation.message = 'Please enter username';
      return validation;
    } else if (this.loginObject.password.length === 0) {
      validation.validFlag = false;
      validation.message = 'Please enter password';
      return validation;
    }
    return validation;
  }

  validateRegister() {
    if (this.registerObject.fullName.value.trim().split(/\s+/).length < 2) {
      this.registerObject.fullName.errorMessage =
        'Please enter your full name.';
      this.registerObject.errorFlag = true;
    } else {
      this.registerObject.fullName.errorMessage = '';
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.registerObject.email.value.toLocaleLowerCase())) {
      this.registerObject.email.errorMessage = 'Please enter valid email ID';
      this.registerObject.errorFlag = true;
    } else {
      this.registerObject.email.errorMessage = '';
      this.registerObject.errorFlag = false;
    }

    if (this.registerObject.phone.value.length !== 10) {
      this.registerObject.phone.errorMessage =
        'Please enter valid phone number';
      this.registerObject.errorFlag = true;
    } else {
      this.registerObject.phone.errorMessage = '';
      this.registerObject.errorFlag = false;
    }

    if (this.registerObject.password.value.length < 8) {
      this.registerObject.password.errorMessage =
        'Password should be at least 8 characters';
      this.registerObject.errorFlag = true;
    } else if (this.registerObject.password.value.length === 0) {
      this.registerObject.password.errorMessage = 'Please enter password';
      this.registerObject.errorFlag = true;
    } else {
      this.registerObject.password.errorMessage = '';
      this.registerObject.errorFlag = false;
    }
    if (this.registerObject.confirmPassword.value.length === 0) {
      this.registerObject.confirmPassword.errorMessage =
        'Please enter password';
      this.registerObject.errorFlag = true;
    } else if (
      !this.registerObject.password.errorMessage &&
      this.registerObject.password.value !==
        this.registerObject.confirmPassword.value
    ) {
      this.registerObject.confirmPassword.errorMessage = 'Password mismatch';
      this.registerObject.errorFlag = true;
    } else {
      this.registerObject.confirmPassword.errorMessage = '';
      this.registerObject.errorFlag = false;
    }
    if (this.registerObject.password.value.length < 8) {
      this.registerObject.password.errorMessage =
        'Password should be at least 8 characters';
      this.registerObject.errorFlag = true;
    }
  }
}

export type PageType = 'login' | 'register';
