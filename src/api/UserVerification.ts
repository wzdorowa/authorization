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
    // console.log('this', this);
    localStorage.removeItem('login');
    this.watchLogin$.next(null);
  }

  getUserLogin() {
    console.log('login', this);
    return localStorage.getItem('login');
  }

  checkUser(userData: string) {
    const data: DataType = JSON.parse(userData);
    if (data.isRemember) {
      localStorage.setItem('login', data.login);
    }
    const user = data.login;
    this.watchLogin$.next(user);
    // return  this.watchLogin$.pipe(map(() => { throw new Error('qweqwe asdasd qweqwe')}));
  }
}

const auth = new UserVerification();
export default auth;
