import '@testing-library/jest-dom';
import { PasswordForm } from './PasswordForm';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('PasswordForm', () => {
  test('debería renderizar el formulario correctamente', () => {
    render(<PasswordForm />);

    // Verificar que el campo de contraseña esté presente
    expect(screen.getByPlaceholderText(/Ingresa tu contraseña/i)).toBeInTheDocument();

    // Verificar que el botón de enviar esté presente
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
  });
});
