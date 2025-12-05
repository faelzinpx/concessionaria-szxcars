import React, { useState, useEffect } from 'react';
import CarImage from '../components/CarImage';

const Carros = () => {
  const [carros, setCarros] = useState([]);
  const [carrosFiltrados, setCarrosFiltrados] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroPreco, setFiltroPreco] = useState('');
  const [loading, setLoading] = useState(true);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carroSelecionado, setCarroSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [fotoAtiva, setFotoAtiva] = useState(0);
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    horario: ''
  });

  useEffect(() => {
    carregarCarros();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [carros, filtroMarca, filtroCategoria, filtroPreco]);

  // Cleanup do modal ao desmontar componente
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const carregarCarros = () => {
    setLoading(true);
    
    fetch('/api/carros')
      .then(response => response.json())
      .then(data => {
        setCarros(data);
        
        // Extrair marcas e categorias únicas
        const marcasUnicas = [...new Set(data.map(carro => carro.marca))].sort();
        const categoriasUnicas = [...new Set(data.map(carro => carro.categoria))].sort();
        
        setMarcas(marcasUnicas);
        setCategorias(categoriasUnicas);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar carros:', error);
        setLoading(false);
      });
  };

  const aplicarFiltros = () => {
    let resultado = [...carros];

    if (filtroMarca) {
      resultado = resultado.filter(carro => carro.marca === filtroMarca);
    }

    if (filtroCategoria) {
      resultado = resultado.filter(carro => carro.categoria === filtroCategoria);
    }

    if (filtroPreco) {
      switch (filtroPreco) {
        case 'ate-50k':
          resultado = resultado.filter(carro => carro.preco <= 50000);
          break;
        case '50k-100k':
          resultado = resultado.filter(carro => carro.preco > 50000 && carro.preco <= 100000);
          break;
        case '100k-200k':
          resultado = resultado.filter(carro => carro.preco > 100000 && carro.preco <= 200000);
          break;
        case 'acima-200k':
          resultado = resultado.filter(carro => carro.preco > 200000);
          break;
        default:
          break;
      }
    }

    setCarrosFiltrados(resultado);
  };

  const limparFiltros = () => {
    setFiltroMarca('');
    setFiltroCategoria('');
    setFiltroPreco('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleVerDetalhes = (carro) => {
    console.log('Abrindo modal para:', carro.marca, carro.modelo);
    setCarroSelecionado(carro);
    setFotoAtiva(0);
    setModalAberto(true);
    document.body.style.overflow = 'hidden';
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCarroSelecionado(null);
    document.body.style.overflow = 'unset';
  };

  const navegarFoto = (direcao) => {
    if (!carroSelecionado?.fotos) return;
    
    const totalFotos = carroSelecionado.fotos.length;
    if (direcao === 'anterior') {
      setFotoAtiva(prev => prev === 0 ? totalFotos - 1 : prev - 1);
    } else {
      setFotoAtiva(prev => prev === totalFotos - 1 ? 0 : prev + 1);
    }
  };

  const abrirFormulario = () => {
    setFormularioAberto(true);
  };

  const fecharFormulario = () => {
    setFormularioAberto(false);
    setDadosFormulario({
      nome: '',
      email: '',
      whatsapp: '',
      horario: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!dadosFormulario.nome || !dadosFormulario.email || !dadosFormulario.whatsapp) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Email e WhatsApp)');
      return;
    }

    // Criar mensagem para WhatsApp
    const mensagem = `Olá! Tenho interesse no ${carroSelecionado.marca} ${carroSelecionado.modelo} ${carroSelecionado.ano}

*Dados para contato:*
Nome: ${dadosFormulario.nome}
Email: ${dadosFormulario.email}
WhatsApp: ${dadosFormulario.whatsapp}
${dadosFormulario.horario ? `Melhor horário: ${dadosFormulario.horario}` : ''}

Preço: ${formatPrice(carroSelecionado.preco)}

Aguardo retorno!`;

    // Abrir WhatsApp com a mensagem
    const whatsappURL = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappURL, '_blank');

    // Fechar formulário e modal
    fecharFormulario();
    fecharModal();
    
    alert('Obrigado! Redirecionando para o WhatsApp...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da Página */}
      <section className="bg-white border-b">
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Nosso Catálogo
            </h1>
            <p className="text-lg text-gray-600 px-4">
              Explore nossa seleção premium de veículos. Qualidade, procedência e as melhores condições de pagamento.
            </p>
            <div className="flex justify-center items-center mt-6 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {carros.length} veículos disponíveis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b">
        <div className="container py-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select 
                value={filtroMarca} 
                onChange={(e) => setFiltroMarca(e.target.value)}
                className="select"
              >
                <option value="">Todas as Marcas</option>
                {marcas.map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>

              <select 
                value={filtroCategoria} 
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="select"
              >
                <option value="">Todas as Categorias</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </option>
                ))}
              </select>

              <select 
                value={filtroPreco} 
                onChange={(e) => setFiltroPreco(e.target.value)}
                className="select"
              >
                <option value="">Todas as Faixas de Preço</option>
                <option value="ate-50k">Até R$ 50.000</option>
                <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                <option value="100k-200k">R$ 100.000 - R$ 200.000</option>
                <option value="acima-200k">Acima de R$ 200.000</option>
              </select>
            </div>
            
            {(filtroMarca || filtroCategoria || filtroPreco) && (
              <button 
                onClick={limparFiltros}
                className="btn bg-gray-500 text-white hover:bg-gray-600 px-4 py-2"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container py-6">
        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Resultados */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Exibindo {carrosFiltrados.length} de {carros.length} veículos
            </p>
          </div>
        )}

        {/* Grade de Carros */}
        {!loading && (
          <div className="grid grid-3 desktop-grid-3 gap-4">
            {carrosFiltrados.length > 0 ? carrosFiltrados.map((carro, index) => (
              <div key={index} className="card overflow-hidden">
                {/* Imagem do Carro */}
                <div className="relative h-56 overflow-hidden">
                  <CarImage
                    src={carro.fotos && carro.fotos.length > 0 ? carro.fotos[0] : ''}
                    alt={`${carro.marca} ${carro.modelo}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badge do Ano */}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {carro.ano}
                  </div>
                  
                  {/* Badge de Categoria */}
                  <div className="absolute top-4 left-4 bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    {carro.categoria?.toUpperCase()}
                  </div>
                </div>

                {/* Informações do Carro */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {carro.marca} {carro.modelo}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {carro.combustivel}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {carro.cambio}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {(carro.quilometragem || carro.km)?.toLocaleString('pt-BR')} km
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {carro.descricao && carro.descricao.length > 80 ? `${carro.descricao.substring(0, 80)}...` : carro.descricao}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-blue-600 car-price">
                      {formatPrice(carro.preco)}
                    </div>
                    <button 
                      onClick={() => handleVerDetalhes(carro)}
                      className="btn btn-primary text-sm px-4 py-2"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-16">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum veículo encontrado</h3>
                <p className="text-gray-500 mb-4">Tente ajustar os filtros para encontrar o carro ideal</p>
                <button 
                  onClick={limparFiltros}
                  className="btn btn-primary px-6 py-2"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-8 mt-8">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-lg text-blue-100 mb-6 px-4">
            Nossa equipe pode ajudá-lo a encontrar o carro perfeito para suas necessidades
          </p>
          <div className="flex flex-col gap-4 justify-center mobile-flex-col desktop-flex-row">
            <a 
              href="/contato"
              className="btn bg-white text-blue-600 hover:bg-gray-100 px-6 py-3"
            >
              Entre em Contato
            </a>
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Modal de Detalhes do Carro */}
      {modalAberto && carroSelecionado && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem'
          }}
          onClick={fecharModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            style={{backgroundColor: 'white', borderRadius: '1rem', maxWidth: '56rem', width: '100%', maxHeight: '90vh', overflowY: 'auto'}}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex justify-between items-center p-6 border-b" style={{padding: '1.5rem', borderBottom: '1px solid #e5e7eb'}}>
              <h2 className="text-2xl font-bold text-gray-800" style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937'}}>
                {carroSelecionado.marca} {carroSelecionado.modelo} {carroSelecionado.ano}
              </h2>
              <button
                onClick={fecharModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                style={{color: '#9ca3af', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer'}}
              >
                ×
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6" style={{padding: '1.5rem'}}>
              {/* Foto Principal */}
              <div className="relative h-64 bg-gray-200 rounded-xl overflow-hidden mb-4" style={{height: '16rem', backgroundColor: '#e5e7eb', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1rem'}}>
                {carroSelecionado.fotos && carroSelecionado.fotos.length > 0 ? (
                  <img 
                    src={carroSelecionado.fotos[fotoAtiva]} 
                    alt={`${carroSelecionado.marca} ${carroSelecionado.modelo}`}
                    className="w-full h-full object-cover"
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20" style={{width: '4rem', height: '4rem', color: '#9ca3af'}}>
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                )}
              </div>

              {/* Informações do Carro */}
              <div className="space-y-4" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {/* Preço */}
                <div className="text-center" style={{textAlign: 'center'}}>
                  <div className="text-3xl font-bold text-blue-600 mb-2" style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem'}}>
                    {formatPrice(carroSelecionado.preco)}
                  </div>
                  <div className="text-gray-600" style={{color: '#4b5563'}}>À vista ou financiado</div>
                </div>

                {/* Especificações */}
                <div className="grid grid-cols-2 gap-4" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <div className="bg-gray-50 p-3 rounded-lg" style={{backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem'}}>
                    <div className="text-sm text-gray-600" style={{fontSize: '0.875rem', color: '#4b5563'}}>Ano</div>
                    <div className="font-semibold" style={{fontWeight: '600'}}>{carroSelecionado.ano}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg" style={{backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem'}}>
                    <div className="text-sm text-gray-600" style={{fontSize: '0.875rem', color: '#4b5563'}}>Quilometragem</div>
                    <div className="font-semibold" style={{fontWeight: '600'}}>
                      {(carroSelecionado.quilometragem || carroSelecionado.km)?.toLocaleString('pt-BR')} km
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg" style={{backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem'}}>
                    <div className="text-sm text-gray-600" style={{fontSize: '0.875rem', color: '#4b5563'}}>Combustível</div>
                    <div className="font-semibold" style={{fontWeight: '600'}}>{carroSelecionado.combustivel}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg" style={{backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem'}}>
                    <div className="text-sm text-gray-600" style={{fontSize: '0.875rem', color: '#4b5563'}}>Câmbio</div>
                    <div className="font-semibold" style={{fontWeight: '600'}}>{carroSelecionado.cambio}</div>
                  </div>
                </div>

                {/* Descrição */}
                {carroSelecionado.descricao && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem'}}>Descrição</h3>
                    <p className="text-gray-600" style={{color: '#4b5563'}}>{carroSelecionado.descricao}</p>
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="flex gap-3 mt-6" style={{display: 'flex', gap: '0.75rem', marginTop: '1.5rem'}}>
                  <button 
                    onClick={abrirFormulario}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold"
                    style={{flex: 1, backgroundColor: '#059669', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer'}}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
                  >
                    💰 Quero Comprar
                  </button>
                  <a
                    href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no ${carroSelecionado.marca} ${carroSelecionado.modelo} ${carroSelecionado.ano} por ${formatPrice(carroSelecionado.preco)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-center"
                    style={{flex: 1, backgroundColor: '#10b981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none', textAlign: 'center', display: 'block'}}
                  >
                    📱 WhatsApp
                  </a>
                </div>

                {/* Informações Adicionais */}
                <div className="bg-blue-50 p-4 rounded-lg" style={{backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '0.5rem'}}>
                  <h4 className="font-semibold text-blue-800 mb-2" style={{fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem'}}>💡 Garantias e Benefícios</h4>
                  <ul className="text-sm text-blue-700 space-y-1" style={{fontSize: '0.875rem', color: '#1d4ed8', listStyle: 'none', padding: 0}}>
                    <li style={{marginBottom: '0.25rem'}}>✅ Garantia de procedência</li>
                    <li style={{marginBottom: '0.25rem'}}>✅ Financiamento facilitado</li>
                    <li style={{marginBottom: '0.25rem'}}>✅ Aceitamos seu usado como entrada</li>
                    <li style={{marginBottom: '0.25rem'}}>✅ Documentação inclusa</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Formulário de Interesse */}
      {formularioAberto && carroSelecionado && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem'
          }}
          onClick={fecharFormulario}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            style={{backgroundColor: 'white', borderRadius: '1rem', maxWidth: '28rem', width: '100%', maxHeight: '90vh', overflowY: 'auto'}}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Formulário */}
            <div className="flex justify-between items-center p-6 border-b" style={{padding: '1.5rem', borderBottom: '1px solid #e5e7eb'}}>
              <h2 className="text-xl font-bold text-gray-800" style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937'}}>
                Interesse em Comprar
              </h2>
              <button
                onClick={fecharFormulario}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                style={{color: '#9ca3af', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer'}}
              >
                ×
              </button>
            </div>

            {/* Informações do Carro */}
            <div className="px-6 py-4 bg-blue-50 border-b" style={{padding: '1rem 1.5rem', backgroundColor: '#eff6ff', borderBottom: '1px solid #e5e7eb'}}>
              <h3 className="font-semibold text-blue-900" style={{fontWeight: '600', color: '#1e3a8a'}}>
                {carroSelecionado.marca} {carroSelecionado.modelo} {carroSelecionado.ano}
              </h3>
              <p className="text-blue-700 text-sm" style={{color: '#1d4ed8', fontSize: '0.875rem'}}>
                {formatPrice(carroSelecionado.preco)}
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={enviarFormulario} className="p-6" style={{padding: '1.5rem'}}>
              <div className="space-y-4" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {/* Nome Completo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem'}}>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={dadosFormulario.nome}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none'}}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem'}}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={dadosFormulario.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none'}}
                    placeholder="Digite seu email"
                    required
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem'}}>
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={dadosFormulario.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none'}}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                {/* Horário para Contato */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem'}}>
                    Melhor Horário para Contato
                  </label>
                  <select
                    name="horario"
                    value={dadosFormulario.horario}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none'}}
                  >
                    <option value="">Selecione um horário</option>
                    <option value="Manhã (8h às 12h)">Manhã (8h às 12h)</option>
                    <option value="Tarde (12h às 18h)">Tarde (12h às 18h)</option>
                    <option value="Noite (18h às 22h)">Noite (18h às 22h)</option>
                    <option value="Qualquer horário">Qualquer horário</option>
                  </select>
                </div>

                {/* Botões */}
                <div className="flex gap-3 pt-4" style={{display: 'flex', gap: '0.75rem', paddingTop: '1rem'}}>
                  <button
                    type="button"
                    onClick={fecharFormulario}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    style={{flex: 1, padding: '0.5rem 1rem', border: '1px solid #d1d5db', color: '#374151', borderRadius: '0.5rem', backgroundColor: 'transparent', cursor: 'pointer'}}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    style={{flex: 1, padding: '0.5rem 1rem', backgroundColor: '#059669', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer'}}
                  >
                    Enviar Interesse
                  </button>
                </div>
              </div>
            </form>

            {/* Nota */}
            <div className="px-6 pb-6" style={{padding: '0 1.5rem 1.5rem'}}>
              <p className="text-xs text-gray-500 text-center" style={{fontSize: '0.75rem', color: '#6b7280', textAlign: 'center'}}>
                * Campos obrigatórios. Seus dados serão enviados via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carros;