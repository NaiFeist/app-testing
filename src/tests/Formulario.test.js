import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario, { mayorDeEdad } from '../components/Formulario';
import '@testing-library/jest-dom';

describe('tests mayor de Edad', () => {
  describe('mayorDeEdad', () => {
    test('debe retornar un booleano', () => {
      const result = mayorDeEdad('Un valor');
      expect(typeof result).toBe('boolean');
    });

    test('si es 18 devuelve true', () => {
      const result = mayorDeEdad('18');
      expect(result).toBe(true);
    });

    test('si es 18 o más devuelve true', () => {
      const result = mayorDeEdad('19');
      expect(result).toBe(true);
    });

    test('si es menor de 18 devuelve false', () => {
      const result = mayorDeEdad('17');
      expect(result).toBe(false);
    });

    test('si es un numero negativo devuelve null', () => {
      const result = mayorDeEdad('-5');
      expect(result).toBe(null);
    });
  });
});


describe('Formulario', () => {
  test('renderiza los elementos correctamente', () => {
    render(<Formulario />);

    //---- COMPRUEBA QUE ESTE TODO EN EL FURULARIO
    expect(screen.getByText('Rellena el formulario')).toBeInTheDocument();
    expect(screen.getByAltText('icono')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Edad')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });

  test('cuando usuario rellena la cabecera,aparece de nivel 6', () => {
    render(<Formulario />);

    // ---- ENVIO DEL FORMUALROI
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Naiara' } });
    fireEvent.change(screen.getByLabelText('Edad'), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    // ---- COMPROBACION DE CABECERA NIVEL 6
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });
});


