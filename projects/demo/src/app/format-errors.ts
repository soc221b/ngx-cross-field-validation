import { FormControl } from '@angular/forms';

export const formatErrors = (control: FormControl): string => {
  const errors = control.errors;

  if (errors === null) return '';

  if (errors['required']) {
    return 'Required';
  } else if (errors['min']) {
    return `Min: ${errors['min']['min']}`;
  } else if (errors['minlength']) {
    return `Min length: ${errors['minlength']['requiredLength']}`;
  } else if (errors['sameAs']) {
    return `Values must be the same`;
  } else if (errors['differentFrom']) {
    return `Values must be the different`;
  } else {
    return Object.values(errors)[0];
  }
};
