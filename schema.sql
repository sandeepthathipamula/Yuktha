-- YUKTHA Project Guidance & Technical Services
-- MySQL Database Schema
-- Safe to execute repeatedly (idempotent)

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
