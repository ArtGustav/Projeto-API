-- Script para criacao da tabela e dados atuais de produtos
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    descricao TEXT
);

TRUNCATE TABLE produtos RESTART IDENTITY;

INSERT INTO produtos (nome, preco, descricao) VALUES 
('Teclado Mecânico', 250.00, 'Teclado mecânico switch blue com LED RGB.'),
('Mouse Gamer', 120.50, 'Mouse com 3200 DPI e botões laterais programáveis.'),
('Monitor 24" Full HD', 850.00, 'Monitor LED IPS 75Hz com bordas ultrafinas.'),
('Headset Gamer', 180.90, 'Headset com microfone com cancelamento de ruído e som surround 7.1.'),
('Cadeira Gamer', 1250.00, 'Cadeira ergonômica reclinável com almofadas lombar e cervical.'),
('SSD 1TB NVMe', 450.00, 'SSD de altíssima velocidade para leitura e gravação.'),
('Placa de Vídeo RTX 3060', 2100.00, 'Placa de vídeo de 12GB GDDR6 para jogos em alta resolução.'),
('Gabinete ATX', 300.00, 'Gabinete mid-tower com lateral de vidro temperado e 3 fans inclusos.'),
('Fonte 650W', 380.00, 'Fonte de alimentação com certificação 80 Plus Bronze.'),
('Webcam Full HD', 150.00, 'Webcam 1080p com microfone embutido para videoconferências.'),
('Teclado Virtual', 89.90, 'Teclado sem fio virtual para apresentações.'),
('Mouse USB', 45.00, 'Mouse básico USB.'),
('Joguinho Guyer', 30.00, 'Pacote de jogos!'),
('Garrafa'', 10, ''Garrafa de Plastico''); DROP TABLE produtos; --', 10.00, 'sHUASNEGUER');
