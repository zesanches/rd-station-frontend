import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna lista vazia quando nenhuma preferência corresponde', () => {
    const formData = {
      selectedPreferences: ['Preferência inexistente'],
      selectedFeatures: ['Feature inexistente'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Retorna lista vazia quando produtos é vazio', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      []
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Retorna lista vazia quando produtos é undefined', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      undefined
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Retorna lista vazia com formData padrão e sem produtos', () => {
    const recommendations = recommendationService.getRecommendations(
      undefined,
      mockProducts
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Retorna todos os produtos com match para MultipleProducts', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
        'Integração com chatbots',
        'Análise preditiva de dados',
      ],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(4);
    expect(recommendations.map((p) => p.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
      'RD Conversas',
      'RD Mentor AI',
    ]);
  });

  test('Prioriza produto com maior score no SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Análise preditiva de dados',
        'Recomendações personalizadas para usuários',
        'Integração com assistentes virtuais',
      ],
      selectedFeatures: [
        'Análise de dados para insights estratégicos',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Mentor AI');
  });

  test('Funciona apenas com features, sem preferências', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: ['Gestão de leads e oportunidades'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station CRM');
  });

  test('MultipleProducts mantém a ordem original dos produtos', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots', 'Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations[0].name).toBe('RD Station Marketing');
    expect(recommendations[1].name).toBe('RD Conversas');
  });
});
