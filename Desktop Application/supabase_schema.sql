-- Supabase Table Setup for 26AS Desktop Tool Execution Metrics

CREATE TABLE IF NOT EXISTS execution_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    total_successful INT DEFAULT 0,
    total_failed INT DEFAULT 0,
    disposed_time_seconds NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE execution_stats ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts and select for execution tracking
CREATE POLICY "Allow public insert for execution stats" ON execution_stats
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select for execution stats" ON execution_stats
    FOR SELECT USING (true);
