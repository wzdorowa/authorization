import { ReplaySubject } from 'rxjs';

type DataType = {
  ['login']: 'string',
  ['password']: 'string',
  ['isRemember']: boolean,
};

class UserVerification {
  private watchList$: ReplaySubject<unknown>;

  constructor() {
    this.watchList$ = new ReplaySubject(1);
  }

  getUser() {
    return this.watchList$;
  }

  getUserLogin() {
    console.log('login', this, localStorage, localStorage.getItem('login'));
    return localStorage.getItem('login');
  }

  checkUser(userData: string) {
    const data: DataType = JSON.parse(userData);
    console.log('data', data);
    if (data.isRemember) {
      localStorage.setItem('login', data.login);
    }
    const user = data.login;
    this.watchList$.next(user);
    // return  this.watchList$.pipe(map(() => { throw new Error('qweqwe asdasd qweqwe')}));
  }
}

const auth = new UserVerification();
export default auth;
