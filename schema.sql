-- Editorial Workflow Management System Database Schema
-- Run this in your Vercel Postgres database

-- Users table for authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'customer', 'manager', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders/Jobs table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., SE0123082025
  customer_id UUID NOT NULL REFERENCES users(id),
  manager_id UUID REFERENCES users(id),
  editor_id UUID REFERENCES users(id),
  
  -- Job details
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('proofreading', 'substantive', 'rewriting')),
  word_count INTEGER NOT NULL,
  price_usd DECIMAL(10,2),
  price_inr DECIMAL(10,2),
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  
  -- Status and workflow
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'awaiting_payment', 'paid', 'assigned', 
    'in_progress', 'changes_requested', 'delivered', 'closed'
  )),
  
  -- File storage
  original_files JSONB, -- Array of file objects with paths and metadata
  edited_files JSONB,   -- Array of editor's revised files
  
  -- Tokens for secure access
  editor_access_token VARCHAR(255) UNIQUE,
  user_download_token VARCHAR(255) UNIQUE,
  download_token_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Delivery and timing
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  actual_delivery TIMESTAMP WITH TIME ZONE,
  
  -- Additional fields
  instructions TEXT,
  document_type VARCHAR(100),
  needs_certificate BOOLEAN DEFAULT FALSE,
  manuscript_title VARCHAR(255),
  author_names VARCHAR(255),
  english_variant VARCHAR(10) CHECK (english_variant IN ('british', 'us')),
  
  -- Payment
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  payment_status VARCHAR(50) DEFAULT 'pending',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages/Threads for job communication
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File uploads tracking
CREATE TABLE file_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size BIGINT NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  upload_type VARCHAR(20) NOT NULL CHECK (upload_type IN ('original', 'edited')),
  uploaded_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log for tracking changes
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_editor_id ON orders(editor_id);
CREATE INDEX idx_orders_manager_id ON orders(manager_id);
CREATE INDEX idx_orders_job_id ON orders(job_id);
CREATE INDEX idx_messages_order_id ON messages(order_id);
CREATE INDEX idx_file_uploads_order_id ON file_uploads(order_id);
CREATE INDEX idx_audit_log_order_id ON audit_log(order_id);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
