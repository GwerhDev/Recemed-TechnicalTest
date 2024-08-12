import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Page } from './+Page';
import { getPrescriptions } from '../../services/fetch-prescriptions';

// Mock del servicio de fetch-prescriptions
vi.mock('../../services/fetch-prescriptions', () => ({
  getPrescriptions: vi.fn(),
}));

describe('Page component', () => {
  it('should render prescriptions correctly', async () => {
    // Mock de la respuesta del servicio
    const mockData = {
      data: [{ id: 1, name: 'Prescription 1' }, { id: 2, name: 'Prescription 2' }],
      meta: { "has_next_page?": true },
    };
    getPrescriptions.mockResolvedValueOnce(mockData);

    // Render del componente
    render(<Page />);

    // Verifica que el Loader se muestra inicialmente
    expect(screen.getByText('Mostrando')).toBeInTheDocument();

    // Espera a que las recetas se carguen
    expect(await screen.findByText('Prescription 1')).toBeInTheDocument();
    expect(await screen.findByText('Prescription 2')).toBeInTheDocument();
  });

  it('should handle errors correctly', async () => {
    // Mock de un error
    getPrescriptions.mockRejectedValueOnce(new Error('Error al cargar recetas'));

    render(<Page />);

    expect(await screen.findByText('Error al cargar recetas')).toBeInTheDocument();
  });

  it('should load more prescriptions when "Mostrar más" is clicked', async () => {
    const mockDataPage1 = {
      data: [{ id: 1, name: 'Prescription 1' }],
      meta: { "has_next_page?": true },
    };
    const mockDataPage2 = {
      data: [{ id: 2, name: 'Prescription 2' }],
      meta: { "has_next_page?": false },
    };

    // Mock de las respuestas para la primera y segunda página
    getPrescriptions
      .mockResolvedValueOnce(mockDataPage1)
      .mockResolvedValueOnce(mockDataPage2);

    render(<Page />);

    // Verifica que la primera receta se cargue
    expect(await screen.findByText('Prescription 1')).toBeInTheDocument();

    // Simula el click en "Mostrar más"
    const button = screen.getByText('Mostrar más');
    button.click();

    // Verifica que la segunda receta se cargue
    expect(await screen.findByText('Prescription 2')).toBeInTheDocument();
  });
});
