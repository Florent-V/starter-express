-- Insertion de plusieurs utilisateurs
INSERT INTO users (username, email) VALUES
('john_doe', 'john.doe@example.com'),
('jane_smith', 'jane.smith@example.com'),
('bob_johnson', 'bob.johnson@example.com'),
('alice_williams', 'alice.williams@example.com'),
('charlie_brown', 'charlie.brown@example.com');

-- Insertion d'un seul utilisateur
INSERT INTO users (username, email) 
VALUES ('emma_davis', 'emma.davis@example.com');

-- Insertion avec une date de création spécifique
INSERT INTO users (username, email, created_at) 
VALUES ('frank_miller', 'frank.miller@example.com', '2023-01-15 10:30:00');