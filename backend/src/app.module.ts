import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './base/entities/user/user.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserAuthModule } from './base/entities/user-auth/user-auth.module';
import { RoleModule } from './base/entities/role/role.module';
import { PermissionModule } from './base/entities/permission/permission.module';
import { JwtAuthGuard } from './base/entities/user-auth/guard/jwt.guard';
import { ResponseInterceptor } from './shared/response.interceptor';
import { CodeTypeModule } from './base/entities/system/code-type/code-type.module';
import { CodeModule } from './base/entities/system/code/code.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, UserAuthModule, RoleModule, PermissionModule,
            CodeTypeModule, CodeModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
