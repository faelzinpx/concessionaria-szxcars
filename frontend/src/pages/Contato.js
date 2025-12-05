import React, { useState } from 'react';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    mensagem: '',
    assunto: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarTelefone = (telefone) => {
    const regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
    return regex.test(telefone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validações
    if (!formData.nome.trim()) {
      setError('Nome é obrigatório');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('E-mail é obrigatório');
      setLoading(false);
      return;
    }

    if (!validarEmail(formData.email)) {
      setError('E-mail inválido');
      setLoading(false);
      return;
    }

    if (!formData.telefone.trim()) {
      setError('Telefone é obrigatório');
      setLoading(false);
      return;
    }

    if (!validarTelefone(formData.telefone)) {
      setError('Telefone inválido. Use o formato: (11) 99999-9999');
      setLoading(false);
      return;
    }

    if (!formData.mensagem.trim()) {
      setError('Mensagem é obrigatória');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/contatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ nome: '', telefone: '', email: '', mensagem: '', assunto: '' });
      } else {
        throw new Error('Erro ao enviar mensagem');
      }
    } catch (error) {
      setError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-gray-800 text-white py-8">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">
            Fale Conosco
          </h1>
          <p className="text-lg text-blue-100 px-4">
            Estamos prontos para ajudá-lo a encontrar o veículo perfeito. Entre em contato conosco!
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-2 desktop-grid-2 gap-6">
          {/* Formulário de Contato */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Envie sua Mensagem
            </h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-2 gap-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="Digite seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-semibold text-gray-700 mb-2">
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  className="select"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="interesse-veiculo">Interesse em veículo</option>
                  <option value="financiamento">Financiamento</option>
                  <option value="troca">Troca de veículo</option>
                  <option value="test-drive">Agendamento de test-drive</option>
                  <option value="pos-venda">Pós-venda</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="textarea"
                  placeholder="Conte-nos como podemos ajudar..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="loading-spinner mr-2"></div>
                    Enviando...
                  </span>
                ) : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-6">
            {/* Contato Principal */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Informações de Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Endereço</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Rua das Flores, 123 - Centro<br />
                      São Paulo - SP, 01234-567
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-green-100 text-green-600 p-3 rounded-xl mr-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Telefones</h3>
                    <p className="text-gray-600 leading-relaxed">
                      <a href="tel:11999998888" className="hover:text-green-600 transition-colors">(11) 9999-8888</a><br />
                      <a href="tel:1133334444" className="hover:text-green-600 transition-colors">(11) 3333-4444</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-xl mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">E-mails</h3>
                    <p className="text-gray-600 leading-relaxed">
                      <a href="mailto:contato@szxcars.com.br" className="hover:text-purple-600 transition-colors">contato@szxcars.com.br</a><br />
                      <a href="mailto:vendas@szxcars.com.br" className="hover:text-purple-600 transition-colors">vendas@szxcars.com.br</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-orange-100 text-orange-600 p-3 rounded-xl mr-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Horário de Funcionamento</h3>
                    <p className="text-gray-600 leading-relaxed">
                      <strong>Segunda à Sexta:</strong> 8h às 18h<br />
                      <strong>Sábado:</strong> 8h às 16h<br />
                      <strong>Domingo:</strong> Fechado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white text-center rounded-2xl">
              <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
              </svg>
              <h3 className="text-xl font-bold mb-2">Fale pelo WhatsApp</h3>
              <p className="mb-4 text-green-100">
                Atendimento rápido e personalizado
              </p>
              <a 
                href="https://wa.me/5511999999999?text=Olá! Tenho interesse em conhecer os veículos disponíveis."
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-green-600 hover:bg-green-50 px-6 py-3 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                </svg>
                Conversar Agora
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600 px-4">
              Respostas para as dúvidas mais comuns dos nossos clientes
            </p>
          </div>
          
          <div className="grid grid-2 desktop-grid-2 gap-6">
            <div className="card p-6">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Como funciona o financiamento?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Trabalhamos com os principais bancos do mercado para oferecer as melhores condições de financiamento. 
                    Aprovação em até 24 horas com entrada a partir de 20%!
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Vocês aceitam troca?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Sim! Fazemos avaliação gratuita do seu veículo atual e oferecemos as melhores condições para troca. 
                    Nossos especialistas garantem uma avaliação justa e transparente.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Os carros têm garantia?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Todos os nossos veículos passam por rigorosa revisão técnica e vêm com garantia de 3 meses ou 3.000 km. 
                    Além disso, oferecemos planos de garantia estendida.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start">
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">Posso fazer um test-drive?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Claro! Agende seu test-drive e experimente o veículo antes de decidir. 
                    É importante você se sentir seguro e confortável com sua escolha.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;