export function getErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email': {
      return 'El email digitado es inválido'
    }
    case 'auth/weak-password': {
      return 'La contraseña digitada es muy débil'
    }
    case 'auth/email-already-in-use': {
      return 'El email ya está en uso'
    }

    case 'passwords dont match': {
      return 'Las contraseñas no coinciden'
    }

    case 'auth/wrong-password': {
      return 'Contaseña incorrecta'
    }
    default:
      return 'Error en el formulario'
  }
}
