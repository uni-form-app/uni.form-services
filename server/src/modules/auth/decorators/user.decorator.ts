import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserPayload } from 'src/modules/users/dto/user';

export const User = createParamDecorator(
  (data: UserPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserPayload }>();
    return request.user;
  },
);
