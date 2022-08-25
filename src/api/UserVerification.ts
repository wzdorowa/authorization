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

  checkUser(userData: string): string | null {
    const data: DataType = JSON.parse(userData);
    if (data.isRemember) {
      localStorage.setItem(data.login, data.password);
    }
    const user = data.login;
    this.watchList$.next(user);
    return user;
  }
}

const userAuth = new UserVerification();
export default userAuth;
