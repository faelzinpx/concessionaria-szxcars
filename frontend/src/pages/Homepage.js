import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarImage from '../components/CarImage';
import { animateCounters } from '../animations';

const Homepage = () => {
  const [carrosDestaque, setCarrosDestaque] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('🏠 HOMEPAGE RENDERIZANDO');
  console.log('📊 Estado atual:', { 
    carrosCount: carrosDestaque.length, 
    loading,
    timestamp: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    console.log('🔄 Homepage useEffect INICIANDO...');
    console.log('🌐 Fazendo fetch para /api/carros');
    
    fetch('/api/carros')
      .then(response => {
        console.log('📡 Resposta recebida:', response.status, response.ok);
        return response.json();
      })
      .then(data => {
        console.log('📊 Dados recebidos da API:', data?.length || 0, 'carros');
        setCarrosDestaque(data.slice(0, 6)); // 6 carros em destaque
        setLoading(false);
        console.log('✅ Estado atualizado - loading: false, carros:', data?.length || 0);
        
        // Iniciar animação dos contadores após carregar os dados
        setTimeout(() => {
          console.log('🔢 Iniciando contadores da Homepage...');
          animateCounters();
        }, 500);
      })
      .catch(error => {
        console.error('❌ ERRO ao buscar carros:', error);
        console.log('🔄 Usando dados de fallback...');
        
        // Dados de fallback simples
        const fallbackData = [
          {
            id: 1,
            marca: 'Toyota',
            modelo: 'Corolla',
            ano: 2022,
            preco: 85000,
            combustivel: 'Flex',
            cambio: 'Automático',
            quilometragem: 25000,
            descricao: 'Sedan premium com tecnologia avançada.',
            fotos: ['']
          }
        ];
        
        setCarrosDestaque(fallbackData);
        setLoading(false);
        console.log('✅ Fallback aplicado - loading: false, carros: 1');
        
        // Iniciar animação dos contadores após fallback
        setTimeout(() => {
          console.log('🔢 Iniciando contadores da Homepage (fallback)...');
          animateCounters();
        }, 500);
      });
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  console.log('🖼️ HOMEPAGE PREPARANDO RENDER');
  console.log('📋 Dados para render:', { carrosDestaque, loading, carrosLength: carrosDestaque.length });

  return (
    <div className="min-h-screen">
      {console.log('🎨 JSX SENDO RENDERIZADO - Homepage visível')}
      {/* Hero Section */}
      <section className="hero py-16">
        <div className="hero-content">
          <div className="container py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Encontre Seu 
                <span className="block text-5xl mt-2">Carro Perfeito</span>
              </h1>
              <p className="text-xl mb-8 px-4">
                Na SZX CARS, conectamos você ao veículo dos seus sonhos com qualidade garantida e as melhores condições do mercado.
              </p>
              <div className="flex flex-col gap-3">
                <Link 
                  to="/carros" 
                  className="btn btn-primary btn-lg mx-4"
                >
                  Explorar Catálogo
                </Link>
                <Link 
                  to="/contato" 
                  className="btn btn-secondary btn-lg mx-4"
                >
                  Falar com Especialista
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-8 bg-white">
        <div className="container">
          <div className="grid grid-4 desktop-grid-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2 gradient-text" data-count="500">0</div>
              <div className="text-gray-600 font-medium text-sm">Veículos Vendidos</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2 gradient-text" data-count="15">0</div>
              <div className="text-gray-600 font-medium text-sm">Anos de Experiência</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2 gradient-text" data-count="98">0</div>
              <div className="text-gray-600 font-medium text-sm">Clientes Satisfeitos</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2 gradient-text">24/7</div>
              <div className="text-gray-600 font-medium text-sm">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Diferenciais */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 gradient-text">
              Por Que Escolher a SZX CARS?
            </h2>
            <p className="text-lg text-gray-600 px-4">
              Somos líderes no mercado automotivo com compromisso com a excelência
            </p>
          </div>
          
          <div className="grid grid-3 desktop-grid-3 gap-4">
            {/* Qualidade Garantida */}
            <div className="card p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Qualidade Garantida</h3>
              <p className="text-gray-600 text-sm">
                Cada veículo passa por inspeção técnica rigorosa. Garantia e procedência asseguradas.
              </p>
            </div>

            {/* Preços Competitivos */}
            <div className="card p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Preços Justos</h3>
              <p className="text-gray-600 text-sm">
                Oferecemos os melhores preços do mercado com financiamento facilitado em até 60x.
              </p>
            </div>

            {/* Atendimento Premium */}
            <div className="card p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg mb-4 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Atendimento Especializado</h3>
              <p className="text-gray-600 text-sm">
                Equipe de consultores especializada para encontrar exatamente o que você precisa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carros em Destaque */}
      <section className="py-8 bg-white">
        {console.log('🚗 SEÇÃO CARROS EM DESTAQUE - loading:', loading, 'carros:', carrosDestaque.length)}
        
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 gradient-text">
              Veículos em Destaque
            </h2>
            <p className="text-lg text-gray-600 px-4">
              Selecionamos os melhores carros do nosso estoque especialmente para você
            </p>
          </div>
          
          {/* TESTE VISUAL REMOVIDO - Debug concluído */}
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              {console.log('⏳ MOSTRANDO LOADING SPINNER')}
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div 
              className="grid grid-3 desktop-grid-3 gap-4"
            >
              {console.log('🎯 RENDERIZANDO GRID DE CARROS - Quantidade:', carrosDestaque.length)}
              {console.log('🔍 Dados dos carros:', carrosDestaque)}
              {carrosDestaque.map((carro, index) => {
                console.log(`🚙 Renderizando carro ${index}:`, carro.marca, carro.modelo);
                return (
                <div 
                  key={index} 
                  className="card overflow-hidden"
                >
                  {/* Imagem do carro */}
                  <div className="relative h-48 overflow-hidden">
                    <CarImage
                      src={carro.fotos && carro.fotos.length > 0 ? carro.fotos[0] : ''}
                      alt={`${carro.marca} ${carro.modelo}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {carro.ano}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {carro.marca} {carro.modelo}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded">{carro.combustivel}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{carro.cambio}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{(carro.quilometragem || carro.km)?.toLocaleString('pt-BR')} km</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">
                      {carro.descricao && carro.descricao.length > 80 ? `${carro.descricao.substring(0, 80)}...` : carro.descricao}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-blue-600 car-price">
                        {formatPrice(carro.preco)}
                      </div>
                      <button className="btn btn-primary text-sm px-3 py-2">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link 
              to="/carros" 
              className="btn btn-secondary px-6 py-3 text-lg"
            >
              Ver Todo o Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white call-to-action">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Encontrar Seu Próximo Carro?
          </h2>
          <p className="text-lg mb-6 text-blue-100 px-4">
            Nossa equipe de especialistas está pronta para ajudá-lo a encontrar o veículo perfeito.
          </p>
          <div className="flex flex-col gap-4 justify-center mobile-flex-col desktop-flex-row">
            <Link 
              to="/contato" 
              className="btn bg-white text-blue-600 hover:bg-gray-100 px-6 py-3"
            >
              Falar Conosco
            </Link>
            <a 
              href="https://wa.me/5511999998888" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-green-500 hover:bg-green-600 text-white px-6 py-3 flex items-center justify-center gap-2 border-2 border-green-500 hover:border-green-600"
              style={{ 
                backgroundColor: '#25D366', 
                borderColor: '#25D366',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1da851';
                e.target.style.borderColor = '#1da851';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#25D366';
                e.target.style.borderColor = '#25D366';
              }}
            >
              <svg 
                className="w-3 h-3" 
                fill="white" 
                viewBox="0 0 24 24"
                style={{ 
                  fill: 'white !important',
                  width: '12px',
                  height: '12px',
                  minWidth: '12px',
                  minHeight: '12px'
                }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;