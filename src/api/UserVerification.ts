import { ReplaySubject } from 'rxjs';

type DataType = {
  ['login']: 'string',
  ['password']: 'string',
  ['isRemember']: boolean,
};

class UserVerification {
  private watchLogin$: ReplaySubject<unknown>;

  constructor() {
    this.watchLogin$ = new ReplaySubject(1);
  }

  getUserData() {
    return this.watchLogin$;
  }

  cleanUserData() {
    localStorage.removeItem('login');
    this.watchLogin$.next(null);
  }

  getUserLogin() {
    console.log('login', this);
    return localStorage.getItem('login');
  }

  checkUser(userData: string) {
    const data: DataType = JSON.parse(userData);
    console.log('data', data);
    // if (data.isRemember) {
    //   localStorage.setItem('login', data.login);
    // }
    // this.watchLogin$.next(data.login);
    this.watchLogin$.error(new Error('qweqwe asdasd qweqwe'));
  }
}

const auth = new UserVerification();
export default auth;
