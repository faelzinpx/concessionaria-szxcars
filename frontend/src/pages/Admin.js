import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [carros, setCarros] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: '',
    preco: '',
    km: '',
    cambio: 'Manual',
    combustivel: 'Flex',
    cor: '',
    portas: '4',
    fotos: [''],
    opcionais: '',
    descricao: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCarros();
  }, [navigate]);

  const fetchCarros = async () => {
    try {
      const response = await fetch('/api/carros');
      const data = await response.json();
      setCarros(data);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const carData = {
      ...formData,
      ano: parseInt(formData.ano),
      preco: parseFloat(formData.preco),
      km: parseInt(formData.km),
      portas: parseInt(formData.portas),
      opcionais: formData.opcionais.split(',').map(item => item.trim()).filter(Boolean)
    };

    try {
      const url = editingCar 
        ? `/api/carros/${editingCar.id}`
        : '/api/carros';
      
      const method = editingCar ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        alert(editingCar ? 'Carro atualizado com sucesso!' : 'Carro cadastrado com sucesso!');
        setShowForm(false);
        setEditingCar(null);
        resetForm();
        fetchCarros();
      }
    } catch (error) {
      alert('Erro ao salvar carro');
      console.error(error);
    }
  };

  const handleEdit = (carro) => {
    setEditingCar(carro);
    setFormData({
      marca: carro.marca || '',
      modelo: carro.modelo || '',
      ano: (carro.ano || '').toString(),
      preco: (carro.preco || '').toString(),
      km: (carro.km || '').toString(),
      cambio: carro.cambio || 'Manual',
      combustivel: carro.combustivel || 'Flex',
      cor: carro.cor || '',
      portas: (carro.portas || '4').toString(),
      fotos: carro.fotos || [''],
      opcionais: Array.isArray(carro.opcionais) ? carro.opcionais.join(', ') : '',
      descricao: carro.descricao || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este carro?')) return;

    try {
      const response = await fetch(`/api/carros/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Carro excluído com sucesso!');
        fetchCarros();
      }
    } catch (error) {
      alert('Erro ao excluir carro');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      marca: '',
      modelo: '',
      ano: '',
      preco: '',
      km: '',
      cambio: 'Manual',
      combustivel: 'Flex',
      cor: '',
      portas: '4',
      fotos: [''],
      opcionais: '',
      descricao: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 admin-panel">
      {/* Header Admin */}
      <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg border-b border-purple-500 border-opacity-30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SZX CARS Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="bg-white text-blue-800 px-6 py-3 rounded-xl font-bold border-2 border-blue-600 hover:bg-blue-100 hover:border-blue-700 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-blue-500/30"
              >
                Ver Site
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/40 border border-red-500/30"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 min-w-max">
        {/* Action Buttons */}
        <div className="mb-8 flex justify-between items-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Painel de Administração</h2>
            <p className="text-purple-200">Gerencie seu estoque de veículos de forma eficiente</p>
            <div className="flex items-center mt-3 space-x-4">
              <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold border border-green-500/30">
                🚗 {carros.length} Carros
              </div>
              <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
                💰 Estoque Ativo
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingCar(null);
              resetForm();
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 text-lg border border-blue-500/20 backdrop-blur-sm"
          >
            {showForm ? 'Fechar Formulário' : 'Adicionar Novo Carro'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-2xl shadow-2xl p-8 mb-8 border border-purple-200 backdrop-blur-lg">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl shadow-lg mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {editingCar ? '✏️ Editar Veículo' : '🚗 Cadastrar Novo Veículo'}
                </h3>
                <p className="text-gray-600">Preencha os dados do veículo com atenção</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={{color: '#1f2937'}} className="block font-semibold mb-2">Marca</label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label style={{color: '#1f2937'}} className="block font-semibold mb-2">Modelo</label>
                  <input
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label style={{color: '#1f2937'}} className="block font-semibold mb-2">Ano</label>
                  <input
                    type="number"
                    name="ano"
                    value={formData.ano}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label style={{color: '#1f2937'}} className="block font-semibold mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Quilometragem</label>
                  <input
                    type="number"
                    name="km"
                    value={formData.km}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Câmbio</label>
                  <select
                    name="cambio"
                    value={formData.cambio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automático">Automático</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Combustível</label>
                  <select
                    name="combustivel"
                    value={formData.combustivel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="Flex">Flex</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Elétrico">Elétrico</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Cor</label>
                  <input
                    type="text"
                    name="cor"
                    value={formData.cor}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">Portas</label>
                  <select
                    name="portas"
                    value={formData.portas}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="2">2 Portas</option>
                    <option value="4">4 Portas</option>
                  </select>
                </div>
                <div>
                  <label style={{color: '#1f2937'}} className="block font-semibold mb-2">Nome da Foto (ex: civic.png)</label>
                  <input
                    type="text"
                    name="fotos"
                    value={formData.fotos[0]}
                    onChange={(e) => setFormData({ ...formData, fotos: [e.target.value] })}
                    placeholder="civic.png"
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label style={{color: '#1f2937'}} className="block font-semibold mb-2">Opcionais (separados por vírgula)</label>
                <textarea
                  name="opcionais"
                  value={formData.opcionais}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Ar condicionado, Direção elétrica, Airbags"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label style={{color: '#1f2937'}} className="block font-semibold mb-2">Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none transition-all"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white px-6 py-4 rounded-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-500/40 flex-1 border border-blue-500/30"
                >
                  {editingCar ? 'Atualizar Carro' : 'Cadastrar Carro'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCar(null);
                    resetForm();
                  }}
                  className="bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl border border-slate-500/30"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cars List */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-300 overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div>
                <h3 className="text-3xl font-bold mb-2" style={{color: '#1f2937'}}>Carros Cadastrados</h3>
                <p style={{color: '#6b7280'}}>Gerencie seu estoque de veículos</p>
                <div className="flex items-center mt-3">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {carros.length} veículos
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                  {carros.length}
                </div>
                <p className="text-gray-500 text-sm">Total</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
            <div className="overflow-x-auto shadow-lg rounded-lg">
              <table className="w-full text-left bg-white rounded-lg overflow-hidden min-w-max">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <tr>
                    <th className="px-3 py-4 text-white font-bold text-xs uppercase tracking-wider text-center">ID</th>
                    <th className="px-4 py-4 text-white font-bold text-xs uppercase tracking-wider">Marca</th>
                    <th className="px-4 py-4 text-white font-bold text-xs uppercase tracking-wider">Modelo</th>
                    <th className="px-3 py-4 text-white font-bold text-xs uppercase tracking-wider text-center">Ano</th>
                    <th className="px-4 py-4 text-white font-bold text-xs uppercase tracking-wider text-right">Preço</th>
                    <th className="px-3 py-4 text-white font-bold text-xs uppercase tracking-wider text-center">KM</th>
                    <th className="px-4 py-4 text-white font-bold text-xs uppercase tracking-wider text-center min-w-[200px]">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {carros.map((carro, index) => (
                    <tr key={carro.id} className={`hover:bg-blue-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="px-3 py-4 font-bold text-center text-blue-700">{carro.id}</td>
                      <td className="px-4 py-4 font-semibold text-gray-900">{carro.marca || 'N/A'}</td>
                      <td className="px-4 py-4 font-medium text-gray-700">{carro.modelo || 'N/A'}</td>
                      <td className="px-3 py-4 text-center text-gray-600">{carro.ano || 'N/A'}</td>
                      <td className="px-4 py-4 font-bold text-right text-green-600">R$ {(carro.preco || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="px-3 py-4 text-center text-gray-600">{(carro.km || 0).toLocaleString('pt-BR')} km</td>
                      <td className="px-4 py-4 min-w-[180px]">
                        <div className="flex gap-1 justify-center items-center">
                          <button
                            onClick={() => handleEdit(carro)}
                            className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white px-2 py-1 rounded-md font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-blue-500/30 border border-blue-500/30 text-xs whitespace-nowrap"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(carro.id)}
                            className="bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-800 hover:to-pink-800 text-white px-2 py-1 rounded-md font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-red-500/30 border border-red-500/30 text-xs whitespace-nowrap"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
