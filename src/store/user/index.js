import { formatError, storage } from '../../utils';
import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      isPending: false,
      error: null,
      isSuccess: false,
      isInitialUserLoading: true,
    };
  }

  async loadUser() {
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
        isInitialUserLoading: true,
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
          isInitialUserLoading: false,
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

export default UserState;
