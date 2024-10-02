import { formatError, storage } from '../../utils';
import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      data: {},
      token: '',
      isPending: false,
      error: null,
      isSuccess: false,
      isLogout: false,
      isInitialAuth: true,
    };
  }

  async authMe() {
    if (this.getState().isPending) return;

    const isUserData = Object.keys(this.getState().data).length > 0;
    if (isUserData) return;

    const token = storage.getToken();
    if (!token) return;

    this.setState(
      {
        ...this.getState(),
        isPending: true,
        error: null,
        isSuccess: false,
        isInitialAuth: true,
      },
      'Установка статуса загрузки пользователя',
    );

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });
      const json = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          storage.clearToken();
          this.setState(
            {
              ...this.initState(),
            },
            'Ошибка при загрузке пользователя с невалидным токеном',
          );
        }
        throw new Error(formatError(json) || 'Неизвестная ошибка');
      }

      this.setState(
        {
          ...this.getState(),
          data: json.result,
          isPending: false,
          error: null,
          isSuccess: true,
          isInitialAuth: false,
        },
        'Загрузка пользователя прошла успешно',
      );
    } catch (e) {
      this.setState(
        {
          ...this.initState(),
          error: e,
        },
        'Ошибка при загрузке пользователя',
      );
    } finally {
      setTimeout(() => {
        this.clearAllErrors();
      }, 3000);
    }
  }

  async login(data) {
    this.setState(
      {
        ...this.getState(),
        isPending: true,
        error: null,
        isSuccess: false,
      },
      'Установка статуса ожидания авторизации пользователя',
    );

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(formatError(json) || 'Неизвестная ошибка');
      }

      this.setState(
        {
          data: json.result?.user,
          token: json.result?.token,
          isPending: false,
          error: null,
          isSuccess: true,
        },
        'Авторизация прошла успешно',
      );

      storage.setToken(json.result?.token);
    } catch (e) {
      this.setState(
        {
          ...this.initState(),
          error: e,
        },
        'Ошибка при авторизации',
      );
    } finally {
      setTimeout(() => {
        this.clearAllErrors();
      }, 3000);
    }
  }

  async logout() {
    this.setState(
      {
        ...this.getState(),
        isPending: true,
        error: null,
        isSuccess: false,
      },
      'Установка статуса ожидания выхода пользователя',
    );

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': this.getState().token,
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });
      const json = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          storage.clearToken();
          this.setState(
            {
              ...this.initState(),
            },
            'Ошибка при выходе с невалидным токеном',
          );
        }
        throw new Error(formatError(json) || 'Неизвестная ошибка');
      }

      this.setState(
        {
          ...this.initState(),
          isLogout: Boolean(json.result),
        },
        'Выход прошел успешно',
      );

      storage.clearToken();
    } catch (e) {
      this.setState(
        {
          ...this.getState(),
          error: e,
          isSuccess: false,
          isPending: false,
        },
        'Ошибка при выходе',
      );
    } finally {
      setTimeout(() => {
        this.clearAllErrors();
      }, 3000);
    }
  }

  clearAllErrors() {
    this.setState(
      {
        ...this.getState(),
        error: null,
      },
      'Очистка всех ошибок',
    );
  }
}

export default AuthState;
