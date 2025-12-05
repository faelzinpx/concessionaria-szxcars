import React, { useState } from 'react';

const AdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const popularDados = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/popular-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.mensagem);
      } else {
        setError(data.erro || 'Erro ao popular dados');
      }
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const criarAdmin = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/admin/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(`${data.mensagem} - Email: ${data.email}, Senha: ${data.senha}`);
      } else {
        setError(data.erro || 'Erro ao criar admin');
      }
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Configuração Inicial - SZX CARS
          </h1>

          {message && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">1. Popular Dados Iniciais</h2>
              <p className="text-gray-600 mb-4">
                Adiciona 6 carros de exemplo ao catálogo para demonstração.
              </p>
              <button
                onClick={popularDados}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Carregando...' : 'Popular Catálogo'}
              </button>
            </div>

            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">2. Criar Usuário Admin</h2>
              <p className="text-gray-600 mb-4">
                Cria o usuário administrador para gerenciar o sistema.
              </p>
              <button
                onClick={criarAdmin}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Carregando...' : 'Criar Admin'}
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-500 text-sm">
                Esta página deve ser usada apenas uma vez para configuração inicial.
              </p>
              <a 
                href="/" 
                className="inline-block mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Voltar ao Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;