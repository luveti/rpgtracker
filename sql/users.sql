CREATE TABLE users (
    id UUID PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NUL default CURRENT_TIMESTAMP
    updated_at TIMESTAMP NOT NUL default CURRENT_TIMESTAMP
);