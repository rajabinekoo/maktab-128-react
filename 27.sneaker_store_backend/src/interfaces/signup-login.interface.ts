import { UserResDto } from 'src/dto/user-res.dto';

export interface ISignupLogin {
  token: string;
  user: UserResDto;
}
