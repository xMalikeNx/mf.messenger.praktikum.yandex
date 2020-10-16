import { TUserDto } from '../types';
import { Api } from '../utils/Api';

export class ProfileApi extends Api {
  updateAvatar = (file: File): Promise<XMLHttpRequest> => {
    return this.request(this.baseUrl + 'user/profile/avatar', {
      method: 'PUT',
      contentType: 'multipart/form-data; charset=utf-8',
      body: {
        avatar: file,
      },
    });
  };

  updateUserInfo = (userInfo: Partial<TUserDto>): Promise<XMLHttpRequest> => {
    return this.put('user/profile', {
      body: {
        ...userInfo,
      },
    });
  };
}
