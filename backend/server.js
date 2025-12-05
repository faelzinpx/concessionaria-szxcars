import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import { carrosMock } from "./data/carros-mock.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Verificar variáveis de ambiente essenciais
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret';

console.log('🔍 Aplicação iniciada com dados mockados');
console.log('JWT_SECRET:', JWT_SECRET ? 'Configurado' : 'Não configurado');
console.log('PORT:', process.env.PORT || '5000');
console.log(`📊 ${carrosMock.length} carros carregados para demonstração`);

// Uploads
const uploadDir = process.env.UPLOAD_DIR || "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Simulação de dados de admin e contatos em memória
const adminData = {
  username: "Isaaclucaspfr",
  password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // hash de "teste123"
  email: "admin@concessionaria.com"
};

let contatosRecebidos = [];

// CRUD de carros
app.get("/api/carros", (req, res) => {
  try {
    let carrosFiltrados = [...carrosMock];
    
    // Aplicar filtros se existirem
    if (req.query.marca) {
      carrosFiltrados = carrosFiltrados.filter(carro => 
        carro.marca.toLowerCase().includes(req.query.marca.toLowerCase())
      );
    }
    
    if (req.query.categoria) {
      carrosFiltrados = carrosFiltrados.filter(carro => 
        carro.categoria === req.query.categoria
      );
    }
    
    res.json(carrosFiltrados);
  } catch (error) {
    console.error("Erro ao buscar carros:", error);
    res.status(500).json({ erro: "Erro ao buscar carros" });
  }
});

app.post("/api/carros", upload.array("fotos", 5), (req, res) => {
  try {
    const { marca, modelo, ano, cor, preco, km, descricao, cambio, combustivel, portas, opcionais } = req.body;
    const fotos = req.files ? req.files.map((f) => f.filename) : (req.body.fotos || []);
    
    const novoCarro = {
      id: carrosMock.length + 1,
      marca,
      modelo,
      ano: parseInt(ano),
      cor,
      preco: parseFloat(preco),
      km: parseInt(km),
      descricao: descricao || '',
      fotos,
      combustivel: combustivel || "Flex",
      cambio: cambio || "Manual",
      portas: parseInt(portas) || 4,
      opcionais: opcionais || [],
      disponivel: true,
      categoria: "outros"
    };
    
    carrosMock.push(novoCarro);
    res.json(novoCarro);
  } catch (error) {
    console.error("Erro ao salvar carro:", error);
    res.status(500).json({ erro: "Erro ao salvar carro" });
  }
});

app.put("/api/carros/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = carrosMock.findIndex(carro => carro.id === id);
    
    if (index !== -1) {
      const { marca, modelo, ano, cor, preco, km, descricao, cambio, combustivel, portas, opcionais, fotos } = req.body;
      
      carrosMock[index] = {
        ...carrosMock[index],
        marca,
        modelo,
        ano: parseInt(ano),
        cor,
        preco: parseFloat(preco),
        km: parseInt(km),
        descricao: descricao || '',
        cambio: cambio || "Manual",
        combustivel: combustivel || "Flex",
        portas: parseInt(portas) || 4,
        opcionais: opcionais || [],
        fotos: fotos || carrosMock[index].fotos
      };
      
      res.json(carrosMock[index]);
    } else {
      res.status(404).json({ erro: "Carro não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao atualizar carro:", error);
    res.status(500).json({ erro: "Erro ao atualizar carro" });
  }
});

app.delete("/api/carros/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = carrosMock.findIndex(carro => carro.id === id);
    
    if (index !== -1) {
      carrosMock.splice(index, 1);
      res.json({ mensagem: "Carro deletado" });
    } else {
      res.status(404).json({ erro: "Carro não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao deletar carro:", error);
    res.status(500).json({ erro: "Erro ao deletar carro" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username !== adminData.username) {
      return res.status(401).json({ message: "Usuário ou senha incorretos" });
    }
    
    // Para simplificar, vamos aceitar a senha diretamente
    if (password !== "teste123") {
      return res.status(401).json({ message: "Usuário ou senha incorretos" });
    }
    
    const token = jwt.sign({ username: adminData.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ 
      token,
      user: {
        username: adminData.username,
        email: adminData.email
      }
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no login" });
  }
});

// Contatos
app.post("/api/contatos", (req, res) => {
  try {
    const contato = {
      id: contatosRecebidos.length + 1,
      ...req.body,
      dataEnvio: new Date().toISOString()
    };
    
    contatosRecebidos.push(contato);
    console.log("✉️ Novo contato recebido:", contato);
    
    res.json({ mensagem: "Contato recebido com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
    res.status(500).json({ erro: "Erro ao processar contato" });
  }
});

// Rota para popular dados iniciais (agora apenas confirma que dados já estão carregados)
app.post("/api/popular-dados", (req, res) => {
  try {
    res.json({ 
      mensagem: "Dados já carregados! A concessionária possui carros em estoque.",
      carrosDisponíveis: carrosMock.filter(c => c.disponivel).length,
      totalCarros: carrosMock.length
    });
  } catch (error) {
    console.error("Erro ao popular dados:", error);
    res.status(500).json({ erro: "Erro ao verificar dados" });
  }
});

// Admin - login e criação inicial
app.post("/api/admin/init", (req, res) => {
  try {
    res.json({ 
      mensagem: "Admin já configurado",
      email: adminData.email,
      senha: "admin123",
      instrucoes: "Use estas credenciais para fazer login"
    });
  } catch (error) {
    console.error("Erro ao inicializar admin:", error);
    res.status(500).json({ erro: "Erro ao inicializar admin" });
  }
});

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (email !== adminData.email) {
      return res.status(401).json({ erro: "Admin não encontrado" });
    }
    
    const ok = await bcrypt.compare(senha, adminData.senha);
    if (!ok) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }
    
    const token = jwt.sign({ email: adminData.email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: "Erro no login" });
  }
});

// Servir uploads
app.use("/uploads", express.static(path.resolve(uploadDir)));

// Configuração para servir o frontend React (deve ser APÓS todas as rotas da API)
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('❌ Erro no servidor:', error);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

// Catch-all handler: serve o index.html para todas as rotas não-API (roteamento client-side do React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
