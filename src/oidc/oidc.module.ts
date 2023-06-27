import {
  Controller,
  DynamicModule,
  Global,
  Module,
  Provider,
  Type,
} from '@nestjs/common';
import {
  OidcModuleAsyncOptions,
  OidcModuleOptions,
  OidcModuleOptionsFactory,
} from './interfaces/oidc-module.interface';
import { OIDC_MODULE_OPTIONS } from './oidc.constants';
import { OidcController } from './oidc.controller';
import { OidcService } from './oidc.service';
import { validatePath } from './common/oidc.utils';
import * as oidc from 'oidc-provider';

@Global()
@Module({ providers: [OidcService], exports: [OidcService] })
export class OidcModule {
  static forRoot(options: OidcModuleOptions): DynamicModule {
    const oidcProvider = this.createOidcProvider();

    return {
      module: OidcModule,
      providers: [
        {
          provide: OIDC_MODULE_OPTIONS,
          useValue: options,
        },
        oidcProvider,
      ],
      exports: [oidcProvider],
      controllers: [OidcController],
    };
  }

  private static createOidcProvider(): Provider {
    return {
      provide: oidc.Provider,
      useFactory: async (moduleOptions: OidcModuleOptions): Promise<any> => {
        // Change controller path manually until Nest doesn't provide an official way for this
        // (see https://github.com/nestjs/nest/issues/1438)
        Controller({
          path: validatePath(moduleOptions.path),
          version: moduleOptions.version,
        })(OidcController);

        const providerFactory =
          moduleOptions.factory ||
          ((issuer, config) => new oidc.Provider(issuer, config));

        const provider = await Promise.resolve(
          providerFactory(moduleOptions.issuer, moduleOptions.oidc),
        );

        if (typeof moduleOptions.proxy === 'boolean') {
          provider.proxy = moduleOptions.proxy;
        }

        return provider;
      },
      inject: [OIDC_MODULE_OPTIONS],
    };
  }
}
