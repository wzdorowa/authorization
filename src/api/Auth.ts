import { ReplaySubject } from 'rxjs';

type LoginData = {
  login: string,
  password: string,
  isRemember: boolean,
};

class Auth {
  private user$: ReplaySubject<string | null>;

  constructor() {
    this.user$ = new ReplaySubject(1);
    const login = localStorage.getItem('login');
    this.user$.next(login);
  }

  getUser() {
    return this.user$;
  }

  logout() {
    localStorage.removeItem('login');
    this.user$.next(null);
  }

  async login(data: LoginData) {
    await new Promise((resolve) => {
      setTimeout(() => resolve('done!'), 2000);
    });
    if (data.login !== 'steve.jobs@example.com') {
      throw new Error(`Пользователь ${data.login} не существует`);
    }
    if (data.isRemember) {
      localStorage.setItem('login', data.login);
    }
    this.user$.next(data.login);
  }
}

const auth = new Auth();
export default auth;
