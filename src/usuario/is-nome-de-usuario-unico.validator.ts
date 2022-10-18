import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';
import { UsuarioService } from './usuario.service';

@ValidatorConstraint()
class IsNomeDeUsuarioUnicoConstraint implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  validate(
    nomeDeusuario: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!!this.usuarioService.buscaPorNomeDeUsuario(nomeDeusuario);
  }
}

export function IsNomeDeUsuarioUnico(validationOptions?: ValidatorOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNomeDeUsuarioUnicoConstraint,
    });
  };
}
