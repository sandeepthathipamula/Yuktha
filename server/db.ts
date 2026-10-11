import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export interface DbConfig {
  configured: boolean;
  pool: mysql.Pool | null;
  error?: string;
}

let poolInstance: mysql.Pool | null = null;
let isInitialized = false;

// Mask credentials in error logs to prevent leaking sensitive information
export function maskDbConnectionString(connectionString?: string): string {
  if (!connectionString) return '[NOT_SET]';
  return connectionString.replace(/:\/\/(.*?):(.*?)@/, '://$1:****@');
}

export function getDbPool(): mysql.Pool {
  if (poolInstance) {
    return poolInstance;
  }

  const databaseUrl = process.env.DATABASE_URL?.trim();
  const host = process.env.DB_HOST?.trim();
  const user = process.env.DB_USER?.trim();
  const password = process.env.DB_PASSWORD ?? '';
  const database = process.env.DB_NAME?.trim();
  const port = Number(process.env.DB_PORT) || 3306;
  const sslParam = process.env.DB_SSL?.trim().toLowerCase();

  const useSsl =
    sslParam === 'true' ||
    (databaseUrl &&
      (databaseUrl.includes('ssl=') ||
        databaseUrl.includes('sslmode=') ||
        databaseUrl.includes('tidbcloud') ||
        databaseUrl.includes('aivencloud') ||
        databaseUrl.includes('render.com')));

  const sslConfig = useSsl ? { rejectUnauthorized: false } : undefined;

  if (databaseUrl && databaseUrl.length > 0) {
    poolInstance = mysql.createPool({
      uri: databaseUrl,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      ssl: sslConfig
    });
    return poolInstance;
  }

  if (host && user && database) {
    poolInstance = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      ssl: sslConfig
    });
    return poolInstance;
  }

  throw new Error('Database configuration missing. Please provide DATABASE_URL or DB_HOST/DB_USER/DB_NAME in .env.');
}

export function isDbConfigured(): boolean {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  const host = process.env.DB_HOST?.trim();
  const user = process.env.DB_USER?.trim();
  const database = process.env.DB_NAME?.trim();

  return Boolean((databaseUrl && databaseUrl.length > 0) || (host && user && database));
}

export async function testConnection(): Promise<{ connected: boolean; message: string }> {
  if (!isDbConfigured()) {
    return {
      connected: false,
      message: 'DATABASE_URL is not set in .env. Waiting for MySQL connection string.'
    };
  }

  try {
    const pool = getDbPool();
    const connection = await pool.getConnection();
    connection.release();
    return {
      connected: true,
      message: 'Successfully connected to MySQL database.'
    };
  } catch (err: any) {
    return {
      connected: false,
      message: `MySQL connection failed: ${err.message || 'Unknown database error'}`
    };
  }
}

export async function initDatabase(): Promise<void> {
  if (isInitialized) return;
  if (!isDbConfigured()) {
    console.log('[MySQL] DATABASE_URL not yet configured in .env. Running in waiting mode.');
    return;
  }

  const pool = getDbPool();

  // Create users table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(32) NOT NULL,
      college VARCHAR(255) NOT NULL,
      role VARCHAR(32) NOT NULL DEFAULT 'student',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_user_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Create proposals table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS proposals (
      id VARCHAR(64) PRIMARY KEY,
      ref_id VARCHAR(32) NOT NULL UNIQUE,
      student_name VARCHAR(255) NOT NULL,
      student_email VARCHAR(255) NOT NULL,
      student_phone VARCHAR(32) NOT NULL,
      college VARCHAR(255) NOT NULL,
      title VARCHAR(500) NOT NULL,
      description TEXT NOT NULL,
      technologies VARCHAR(500) NOT NULL,
      project_type VARCHAR(64) NOT NULL,
      expected_date VARCHAR(64),
      submitted_at VARCHAR(64) NOT NULL,
      status VARCHAR(32) NOT NULL DEFAULT 'New',
      guidance_charges INT NOT NULL DEFAULT 2499,
      review_window VARCHAR(64) DEFAULT 'Within 1 Hour',
      team_update TEXT,
      reference_files JSON,
      assigned_admin VARCHAR(64),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_student_email (student_email),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Create admin_notifications table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS admin_notifications (
      id VARCHAR(64) PRIMARY KEY,
      proposal_id VARCHAR(64) NOT NULL,
      type VARCHAR(64) NOT NULL DEFAULT 'new_proposal',
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_proposal_id (proposal_id),
      INDEX idx_is_read (is_read),
      CONSTRAINT fk_notification_proposal FOREIGN KEY (proposal_id) REFERENCES proposals (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  isInitialized = true;
  console.log('[MySQL] Database tables verified / initialized successfully.');
}
